CQ.Ext.ns("Custom.ITC");
Custom.ITC.MultiFieldPanel = CQ.Ext.extend(CQ.Ext.Panel, {
    panelValue: "",
    constructor: function(a) {
        a = a || {};
        if (!a.layout) {
            a.layout = "form";
            a.padding = "10px"
        }
        Custom.ITC.MultiFieldPanel.superclass.constructor.call(this, a)
    },
    initComponent: function() {
        Custom.ITC.MultiFieldPanel.superclass.initComponent.call(this);
        var a = this.findParentByType("multifield"),
            b = this.findParentByType("dialog");
        if (Custom.ITC.MultiFieldPanel.xtype == this.xtype) {
            this.panelValue = new CQ.Ext.form.Hidden({
                name: this.name
            });
            this.add(this.panelValue);
            b.on("beforesubmit", function() {
                var d = this.getValue();
                if (d) {
                    this.panelValue.setValue(d)
                }
            }, this)
        }
        b.on("loadcontent", function() {
            if (_.isEmpty(a.dropTargets)) {
                a.dropTargets = []
            }
            a.dropTargets = a.dropTargets.concat(this.getDropTargets());
            _.each(a.dropTargets, function(e) {
                if (!e.highlight) {
                    return
                }
                var d = parseInt(b.el.getStyle("z-index"), 10);
                if (!isNaN(d)) {
                    e.highlight.zIndex = d + 1
                }
            })
        }, this);
        if (b.acsInit) {
            return
        }
        var c = a.findParentByType("tabpanel");
        if (c) {
            c.on("tabchange", function(d) {
                d.doLayout()
            })
        }
        b.on("hide", function() {
            var d = CQ.utils.WCM.getEditables()[this.path];
            delete d.dialogs[CQ.wcm.EditBase.EDIT];
            delete CQ.WCM.getDialogs()["editdialog-" + this.path]
        }, b);
        b.acsInit = true
    },
    afterRender: function() {
        Custom.ITC.MultiFieldPanel.superclass.afterRender.call(this);
        this.items.each(function() {
            if (!this.contentBasedOptionsURL || this.contentBasedOptionsURL.indexOf(CQ.form.Selection.PATH_PLACEHOLDER) < 0) {
                return
            }
            this.processPath(this.findParentByType("dialog").path)
        })
    },
    getValue: function() {
        var a = {};
        this.items.each(function(b) {
            if (b.xtype === "label" || b.xtype === "hidden" || !b.hasOwnProperty("key")) {
                return
            }
            a[b.key] = b.getValue()
        });
        return $.isEmptyObject(a) ? "" : JSON.stringify(a)
    },
    setValue: function(b) {
        this.panelValue.setValue(b);
        var a = JSON.parse(b);
        this.items.each(function(c) {
            if (c.xtype === "label" || c.xtype === "hidden" || !c.hasOwnProperty("key")) {
                return
            }
            c.setValue(a[c.key]);
            c.fireEvent("loadcontent", this)
        })
    },
    getDropTargets: function() {
        var a = [],
            b;
        this.items.each(function() {
            if (!this.getDropTargets) {
                return
            }
            b = this.getDropTargets();
            if (_.isEmpty(b)) {
                return
            }
            a = a.concat(b)
        });
        return a
    },
    validate: function() {
        var a = true;
        this.items.each(function(b) {
            if (!b.hasOwnProperty("key")) {
                return
            }
            if (!b.isVisible()) {
                b.allowBlank = true;
                return
            }
            if (!b.validate()) {
                a = false
            }
        });
        return a
    },
    getName: function() {
        return this.name
    }
});
CQ.Ext.reg("itcmultifieldpanel", Custom.ITC.MultiFieldPanel);
CQ.Ext.override(CQ.form.MultiField.Item, {
    reorder: function(d) {
        if (d.field && (d.field.xtype === "itcmultifieldpanel" || d.field.xtype === "imagemultifieldpanel" || d.field.xtype === "selection")) {
            var e = this.ownerCt,
                b = e.items.indexOf(d),
                a = e.items.indexOf(this);
            if (b < a) {
                e.insert(e.items.indexOf(d), this);
                this.getEl().insertBefore(d.getEl())
            } else {
                e.insert(e.items.indexOf(this), d);
                this.getEl().insertAfter(d.getEl())
            }
            e.doLayout()
        } else {
            d.field.setValue(this.field.getValue());
            this.field.setValue(d.field.getValue())
        }
    }
});