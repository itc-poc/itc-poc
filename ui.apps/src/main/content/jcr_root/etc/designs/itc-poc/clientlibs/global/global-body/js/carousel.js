+ function(c) {
    var d = function(g, f) {
        this.$element = c(g);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = f;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on("keydown.bs.carousel", c.proxy(this.keydown, this));
        this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", c.proxy(this.pause, this)).on("mouseleave.bs.carousel", c.proxy(this.cycle, this))
    };
    d.VERSION = "3.3.5";
    d.TRANSITION_DURATION = 600;
    d.DEFAULTS = {
        interval: 5000,
        pause: "hover",
        wrap: true,
        keyboard: true
    };
    d.prototype.keydown = function(f) {
        if (/input|textarea/i.test(f.target.tagName)) {
            return
        }
        switch (f.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        f.preventDefault()
    };
    d.prototype.cycle = function(f) {
        f || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval(c.proxy(this.next, this), this.options.interval));
        return this
    };
    d.prototype.getItemIndex = function(f) {
        this.$items = f.parent().children(".item");
        return this.$items.index(f || this.$active)
    };
    d.prototype.getItemForDirection = function(j, i) {
        var f = this.getItemIndex(i);
        var g = (j == "prev" && f === 0) || (j == "next" && f == (this.$items.length - 1));
        if (g && !this.options.wrap) {
            return i
        }
        var k = j == "prev" ? -1 : 1;
        var h = (f + k) % this.$items.length;
        return this.$items.eq(h)
    };
    d.prototype.to = function(h) {
        var g = this;
        var f = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (h > (this.$items.length - 1) || h < 0) {
            return
        }
        if (this.sliding) {
            return this.$element.one("slid.bs.carousel", function() {
                g.to(h)
            })
        }
        if (f == h) {
            return this.pause().cycle()
        }
        return this.slide(h > f ? "next" : "prev", this.$items.eq(h))
    };
    d.prototype.pause = function(f) {
        f || (this.paused = true);
        if (this.$element.find(".next, .prev").length && c.support.transition) {
            this.$element.trigger(c.support.transition.end);
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval);
        return this
    };
    d.prototype.next = function() {
        if (this.sliding) {
            return
        }
        return this.slide("next")
    };
    d.prototype.prev = function() {
        if (this.sliding) {
            return
        }
        return this.slide("prev")
    };
    d.prototype.slide = function(m, i) {
        var p = this.$element.find(".item.active");
        var g = i || this.getItemForDirection(m, p);
        var k = this.interval;
        var n = m == "next" ? "left" : "right";
        var j = this;
        if (g.hasClass("active")) {
            return (this.sliding = false)
        }
        var l = g[0];
        var f = c.Event("slide.bs.carousel", {
            relatedTarget: l,
            direction: n
        });
        this.$element.trigger(f);
        if (f.isDefaultPrevented()) {
            return
        }
        this.sliding = true;
        k && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            var h = c(this.$indicators.children()[this.getItemIndex(g)]);
            h && h.addClass("active")
        }
        var o = c.Event("slid.bs.carousel", {
            relatedTarget: l,
            direction: n
        });
        if (c.support.transition && this.$element.hasClass("slide")) {
            g.addClass(m);
            if (typeof g == 'object' && g.length) {
                g[0].offsetWidth;
            }
            p.addClass(n);
            g.addClass(n);
            p.one("bsTransitionEnd", function() {
                g.removeClass([m, n].join(" ")).addClass("active");
                p.removeClass(["active", n].join(" "));
                j.sliding = false;
                setTimeout(function() {
                    j.$element.trigger(o)
                }, 0)
            }).emulateTransitionEnd(d.TRANSITION_DURATION)
        } else {
            p.removeClass("active");
            g.addClass("active");
            this.sliding = false;
            this.$element.trigger(o)
        }
        k && this.cycle();
        return this
    };

    function b(f) {
        return this.each(function() {
            var j = c(this);
            var i = j.data("bs.carousel");
            var g = c.extend({}, d.DEFAULTS, j.data(), typeof f == "object" && f);
            var h = typeof f == "string" ? f : g.slide;
            if (!i) {
                j.data("bs.carousel", (i = new d(this, g)))
            }
            if (typeof f == "number") {
                i.to(f)
            } else {
                if (h) {
                    i[h]()
                } else {
                    if (g.interval) {
                        i.pause().cycle()
                    }
                }
            }
        })
    }
    var a = c.fn.carousel;
    c.fn.carousel = b;
    c.fn.carousel.Constructor = d;
    c.fn.carousel.noConflict = function() {
        c.fn.carousel = a;
        return this
    };
    var e = function(k) {
        var g;
        var j = c(this);
        var f = c(j.attr("data-target") || (g = j.attr("href")) && g.replace(/.*(?=#[^\s]+$)/, ""));
        if (!f.hasClass("carousel")) {
            return
        }
        var h = c.extend({}, f.data(), j.data());
        var i = j.attr("data-slide-to");
        if (i) {
            h.interval = false
        }
        b.call(f, h);
        if (i) {
            f.data("bs.carousel").to(i)
        }
        k.preventDefault()
    };
    c(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e);
    c(window).on("load", function() {
        c('[data-ride="carousel"]').each(function() {
            var f = c(this);
            b.call(f, f.data())
        })
    })
}(jQuery);