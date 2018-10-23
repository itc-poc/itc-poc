// start:
// accordion-body has inline height: 0px;
// accordion-inner has visibility: hidden;
//
// expanded/collapsed:
// accordion-body animates in height between 0px and saved "ideal" height
// accordion-inner has overflow: hidden, ALSO animates in height between 0px and saved "ideal" height
//
// when animating to open, at completion, change max height of both elements to auto, re-read "ideal" height on collapse.
// this allows for dynamic height changes.
// 
// when starting to animate open, read the height() of accordion-inner to get its "ideal" height, save it

$(document).ready(function() {

// Implementation of Newton's method
var functionInverse = function(f, x) {
    var guess = x;
    for (var i = 0; i < 8; i++) {
        var result = f(guess);
        var slope = (f(guess + 0.001) - result) / 0.001;
        if (slope == 0) { return guess; }
        guess -= (result - x) / slope;
    }
    return guess;
};

var animationDuration = 350; // ms
var animationFunction = function(x) { // x is 0 to 1 (completion portion), return is 0 to 1 (portion of height)
    var coefficients = [0.25, 0.1, 0.25, 1.0]; // "ease"

    // http://matthewlein.com/ceaser/
    // http://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
    var cubicBezierParametric = function(u0, u1, u2, u3, t) {
        return Math.pow(1 - t, 3) * u0 +
               3 * t * Math.pow(1 - t, 2) * u1 +
               3 * Math.pow(t, 2) * (1 - t) * u2 +
               Math.pow(t, 3) * u3;
    };

    var getTforX = function(x) {
        return functionInverse(function(arg) {
            return cubicBezierParametric(0, coefficients[0], coefficients[2], 1, arg);
        }, x);
    };

    var t = getTforX(x);
    var y = cubicBezierParametric(0, coefficients[1], coefficients[3], 1, t);

    return y;
};

var accordionInitialize = function() {

setTimeout(accordionInitialize, 250);

$('.accordion-component').each(function() {

    var $component = $(this);

    if ($component.data('initialized') !== true && $component.data('delay-initialize') !== true) {

        $component.data('initialized', true);

        var inAnyAnimation = false;
        var startAnimation = function() {
            if (!inAnyAnimation) {
                inAnyAnimation = true;
                setTimeout(processAnimation, 16);
            }
        };

        var resetTimeToFinish = function($group) {
            var now = new Date().getTime();

            var time = 1 - Math.max(($group.data('timeToFinish') || 0) - now, 0) / animationDuration;
            var height = animationFunction(time);
            var inv = functionInverse(function(arg) {
                return animationFunction(arg);
            }, 1 - height);
            $group.data('timeToFinish', now + (1 - inv) * animationDuration);
            $group.data('animationFinished', false);

            startAnimation();
        };

        var collapse = function($group) {
            if ($group.data('state') != 'collapsed') {
                $group.data('state', 'collapsed');
                resetTimeToFinish($group);
            }
        };

        var expand = function($group) {
            if ($group.data('state') != 'expanded') {
                if (!$component.hasClass('multipleExpand')) {
                    if ($component.hasClass('unity')) {
                        $('.accordion-component .accordion-group').each(function() {
                            if (!$group.is($(this))) {
                                $(this).trigger('collapse');
                            }
                        });
                    } else {
                        $component.find('.accordion-group').each(function() {
                            if (!$group.is($(this))) {
                                $(this).trigger('collapse');
                            }
                        });
                    }
                }

                var tempHeight = $group.find('.accordion-inner').css('height');
                $group.find('.accordion-inner').css('visibility', 'none');
                $group.find('.accordion-inner').css('height', '');
                $group.data('ideal-height', $group.find('.accordion-inner').outerHeight());
                $group.find('.accordion-inner').css('visibility', '');
                $group.find('.accordion-inner').css('height', tempHeight);
                $group.data('state', 'expanded');
                resetTimeToFinish($group);
            }
        };

        // Initialize
        $component.find('.accordion-group').each(function() {
            $(this).find('.accordion-inner').css('height', 0);
            $(this).data('state', 'collapsed');
            $(this).on('collapse', function() { collapse($(this)); });
            $(this).on('expand', function() { expand($(this)); });
        });

        if (!$component.hasClass('collapsedonload')) {
            $component.find('.accordion-body').first().css('height', 'auto');
            $component.find('.accordion-inner').first().css('height', 'auto');
            $component.find('.accordion-inner').first().css('visibility', '');
            $component.find('.accordion-heading').first().addClass('accordion-heading-active');
            $component.find('.accordion-group').first().data('state', 'expanded');
        }

        $component.find('.accordion-toggle').on('click', function() {
            var $group = $(this).closest('.accordion-group');
            if ($group.data('state') == 'expanded') {
                $group.trigger('collapse');
            } else {
                $group.trigger('expand');
            }
        });

        var applyHash = function() {
            var id = '';
            var ordinal = 0;
            var found = false;
            var result1 = window.location.hash.match(/accordion=(\d+)/);
            var result2 = window.location.hash.match(/accordion=accordion(\w+)-(\w+)/);
            if (result1) {
                ordinal = parseInt(result1[1], 10);
                if (ordinal > 0 && ordinal <= $component.find('.accordion-group').length) {
                    found = true;
                    
                }
            } else if (result2) {
                ordinal = parseInt(result2[2], 10);
                id = result2[1];
                if (ordinal > 0 && ordinal <= $component.find('.accordion-group').length && $component.data('unique-id') == id) {
                    found = true;
                }
            }
            if (found) {
                $component.find('.accordion-group').eq(ordinal - 1).trigger('expand');
            }
        };
        $(window).on('hashchange', applyHash);
        setTimeout(applyHash, 1);

        var processAnimation = function() {
            var anyAnimationIncomplete = false;
            var now = new Date().getTime();

            $component.find('.accordion-group').each(function() {
                var $group = $(this);

                if ($group.data('timeToFinish') > now) {
                    anyAnimationIncomplete = true;

                    var portion = 1 - ($group.data('timeToFinish') - now) / animationDuration;
                    var portionResult = animationFunction(portion);
                    if ($group.data('state') == 'collapsed') {
                        portion = 1 - portion;
                        portionResult = 1 - portionResult;
                    }

                    var height = portionResult * $group.data('ideal-height');
                    $group.find('.accordion-body').css('height', height);
                    $group.find('.accordion-inner').css('height', height);
                    $group.find('.accordion-inner').css('visibility', '');

                    var colorCollapsedBackground = [221, 221, 221];
                    var colorCollapsedText = [17, 28, 36];
                    var colorExpandedBackground = [0, 153, 204];
                    var colorExpandedText = [255, 255, 255];
                    if ($group.hasClass('grey-accordion-header')) {
                        colorExpandedBackground = colorCollapsedBackground;
                        colorExpandedText = colorCollapsedText;
                    }

                    $group.find('.accordion-toggle')[0].style.setProperty('background-color', 'rgb(' +
                        Math.floor(colorCollapsedBackground[0] + (colorExpandedBackground[0] - colorCollapsedBackground[0]) * portion) + ', ' +
                        Math.floor(colorCollapsedBackground[1] + (colorExpandedBackground[1] - colorCollapsedBackground[1]) * portion) + ', ' +
                        Math.floor(colorCollapsedBackground[2] + (colorExpandedBackground[2] - colorCollapsedBackground[2]) * portion) + ')', 'important'); // CSS is "important!" ... - http://stackoverflow.com/a/25100304
                    $group.find('.accordion-toggle').css('color', 'rgb(' +
                        Math.floor(colorCollapsedText[0] + (colorExpandedText[0] - colorCollapsedText[0]) * portion) + ', ' +
                        Math.floor(colorCollapsedText[1] + (colorExpandedText[1] - colorCollapsedText[1]) * portion) + ', ' +
                        Math.floor(colorCollapsedText[1] + (colorExpandedText[1] - colorCollapsedText[1]) * portion) + ')');
                    $group.find('.accordion-heading').addClass('accordion-heading-active');
                } else {
                    if ($group.data('animationFinished') !== true) {
                        if ($group.data('state') == 'collapsed') {
                            $group.find('.accordion-body').css('height', 0);
                            $group.find('.accordion-inner').css('height', 0);
                            $group.find('.accordion-inner').css('visibility', 'hidden');

                            $group.find('.accordion-toggle').css('background-color', '');
                            $group.find('.accordion-toggle').css('color', '');
                            $group.find('.accordion-heading').removeClass('accordion-heading-active');
                        } else {
                            $group.find('.accordion-body').css('height', 'auto');
                            $group.find('.accordion-inner').css('height', 'auto');
                            $group.find('.accordion-inner').css('visibility', '');

                            $group.find('.accordion-toggle').css('background-color', '');
                            $group.find('.accordion-toggle').css('color', '');
                            $group.find('.accordion-heading').addClass('accordion-heading-active');

                            // if off-screen, scroll to newly-expanded element
                            if ($group.find('.accordion-body').offset().top < $(window).scrollTop()) {
                                $(window).scrollTop($group.find('.accordion-body').offset().top - 200);
                            }
                        }
                        $group.data('animationFinished', true);
                    }
                }
            });

            if (anyAnimationIncomplete) {
                setTimeout(processAnimation, 16);
            } else {
                inAnyAnimation = false;
            }
        };
    }
});

};

accordionInitialize();

});