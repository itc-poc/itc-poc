"use strict";

/**
 * Title foundation component JS backing script
 */
use(function () {
    
    // TODO: change currentStyle to wcm.currentStyle
    console.log("shams");
    var CONST = {
        PROP_TITLE: "jcr:title",
        PROP_PAGE_TITLE: "pageTitle",
        PROP_TYPE: "type",
        PROP_FONT: "titleSize",
        PROP_DEFAULT_TYPE: "defaultType"
    }
    
    var title = {};
    
    // The actual title content
    title.text = granite.resource.properties[CONST.PROP_TITLE]
            || wcm.currentPage.properties[CONST.PROP_PAGE_TITLE]
            || wcm.currentPage.properties[CONST.PROP_TITLE]
            || wcm.currentPage.name;
    
    // The HTML element name
    title.element = granite.resource.properties[CONST.PROP_TYPE]
            || currentStyle.get(CONST.PROP_DEFAULT_TYPE, "");

    title.fontSize = granite.resource.properties[CONST.PROP_FONT]
            || "heading-4";
    
    // Adding the constants to the exposed API
    title.CONST = CONST;
    
    return title;
    
});