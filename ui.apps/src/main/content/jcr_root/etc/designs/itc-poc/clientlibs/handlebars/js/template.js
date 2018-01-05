if (!window.ItcpocSearch) {
    window.ItcpocSearch = {};
}
/**
 * Template class
 * To create and cached compile templates.
 * This function will compile the handlebar templates into
 * HTML and will append to the body.

 */
ItcpocSearch.templates = (function($) {

    var tmpl = {};

    tmpl.config = {
	   	path: '/etc/designs/itc-poc/handlebars'
    };

    tmpl.cache = {};

    /**
     * Initialization
     * NOTE: Keep this, as it can be used for testing
     * @param {type} options - allow config to be replaced
     * @returns {undefined}
     */
    tmpl.init = function(options) {
        if (typeof options === 'object') {
            this.config = options;
		}
    };

    /**
     * Get (and cache) compiled handlebar source
     * @param {type} fileName - the file name
     */
    tmpl.get = function(fileName) {
		if (!this.cache[fileName]) {
			this.cache[fileName] = $.get(this.config.path + fileName).then(function(src) {
                return Handlebars.compile(src);
            });
		}

		return this.cache[fileName];
    };

    /**
     * Execute template, optionally with data
     * @param {type} fileName
     * @param {type} data - optional data
     */
    tmpl.execute = function(fileName, data) {
        return this.get(fileName).then(function(src) {
            return (data ? src(data) : src({}));
        });
    };

    return tmpl;
}(jQuery));

/* Sample - How to call this function */
//ItcpocSearch.templates.execute(pathtpl, JSON)