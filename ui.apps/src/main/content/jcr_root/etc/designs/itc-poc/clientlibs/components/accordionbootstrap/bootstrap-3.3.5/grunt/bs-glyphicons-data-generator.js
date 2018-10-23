/*!
 * Bootstrap Grunt task for Glyphicons data generation
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
"use strict";var fs=require("fs");module.exports=function generateGlyphiconsData(d){var j=fs.readFileSync("less/glyphicons.less","utf8");var k=j.split("\n");var b=/^\.(glyphicon-[a-zA-Z0-9-]+)/;var a="# This file is generated via Grunt task. **Do not edit directly.**\n# See the 'build-glyphicons-data' task in Gruntfile.js.\n\n";var h="docs/_data/glyphicons.yml";for(var e=0,g=k.length;e<g;e++){var f=k[e].match(b);if(f!==null){a+="- "+f[1]+"\n"}}if(!fs.existsSync("docs/_data")){fs.mkdirSync("docs/_data")}try{fs.writeFileSync(h,a)}catch(c){d.fail.warn(c)}d.log.writeln("File "+h.cyan+" created.")};