/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
CQ.Ext.override(CQ.Ext.form.TextField, {

    /**
     * @cfg {Boolean} evaluateValidatorsFirst
     * Using this flag, the custom validators ({@link #vtype} and
     * {@link #validator}) get executed before any length checking is
     * done. The default is false, which is Ext's default behavior and
     * causes validation to check lengths first.
     * @member CQ.Ext.form.TextField
     */
    evaluateValidatorsFirst: false,

    // private
    executeCustomValidators: function(value, errors) {
        if(this.vtype){
            var vt = CQ.Ext.form.VTypes;
            if(!vt[this.vtype](value, this)){
                errors.push(this.vtypeText || vt[this.vtype +'Text']);
                return;
            }
        }
        if(CQ.Ext.isFunction(this.validator)){
            var msg = this.validator(value);
            if(msg !== true){
                errors.push(msg);
            }
        }
    },

    // overrides CQ.Ext.form.TextField#validateValue taking the config option
    // evaluateValidatorsFirst into account; basically this is not needed anymore (Ext 3),
    // as Ext's behaviour has changed so that vtypes are now evaluated first; as validator
    // functions are still evaluated at the end of the method, the override is kept for
    // better backward compatibility
    getErrors : function(value){
        // CQ:START
        var errors = [ ];
        if (this.evaluateValidatorsFirst) {
            this.executeCustomValidators(value, errors);
        }

        // var errors = CQ.Ext.form.TextField.superclass.getErrors.apply(this, arguments);
        errors = errors.concat(CQ.Ext.form.TextField.superclass.getErrors.apply(this,
                arguments));
        // CQ:END

        value = CQ.Ext.isDefined(value) ? value : this.processValue(this.getRawValue());

        if (CQ.Ext.isFunction(this.validator)) {
            var msg = this.validator(value);
            if (msg !== true) {
                errors.push(msg);
            }
        }

        if (value.length < 1 || value === this.emptyText) {
            if (this.allowBlank) {
                //if value is blank and allowBlank is true, there cannot be any additional errors
                return errors;
            } else {
                errors.push(this.blankText);
            }
        }

        if (!this.allowBlank && (value.length < 1 || value === this.emptyText)) { // if it's blank
            errors.push(this.blankText);
        }

        if (value.length < this.minLength) {
            errors.push(String.format(this.minLengthText, this.minLength));
        }

        if (value.length > this.maxLength) {
            errors.push(String.format(this.maxLengthText, this.maxLength));
        }

        if (this.vtype) {
            var vt = CQ.Ext.form.VTypes;
            if(!vt[this.vtype](value, this)){
                errors.push(this.vtypeText || vt[this.vtype +'Text']);
            }
        }

       /* if (this.regex && !this.regex.test(value)) {
            errors.push(this.regexText);
        } */
        if (this.regex && this.regex.test && !this.regex.test(value)) { 
   			 errors.push(this.regexText); 
		}

        return errors;
    },

    /**
     * Returns the position of the caret.
     * @return {Number} The position of the caret
     * @method getCaretPosition
     * @member CQ.Ext.form.TextField
     */
    getCaretPosition: function() {
        var v = this.getRawValue();
        if (v.length == 0) return 0;
        var d = this.el.dom;
        if (document.selection != undefined) {
            // ie
            d.focus();
            var range = document.selection.createRange();
            range.moveStart ("character", -v.length);
            return range.text.length;
        }
        else if (d.selectionStart != undefined) {
            // ff
            return d.selectionStart;
        }
        else {
            return v.length;
        }
    },

    /**
     * Sets the caret to the given position.
     * @param {Number} pos The position
     * @method setCaretPosition
     * @member CQ.Ext.form.TextField
     */
    setCaretPosition: function(pos) {
        var d = this.el.dom;
        if (document.selection != undefined) {
            // ie
            var v = this.getRawValue();
            d.focus ();
            var range = document.selection.createRange();
            range.moveStart ("character", -v.length);
            range.moveStart ('character', pos);
            range.moveEnd ('character', 0);
        }
        else if (d.selectionStart != undefined) {
            // ff
            d.selectionStart = pos;
            d.selectionEnd = pos;
            d.focus ();
        }
        else {
            d.focus();
        }
    },

    /**
     * Gets the term at the current caret position.
     * @return {String} The term at the caret position
     * @method getTermAtCaret
     * @member CQ.Ext.form.TextField
     */
    getTermAtCaret: function() {
        return this.getTermAt(this.getCaretPosition());
    },

    /**
     * Gets the term at the given index.
     * @param {Number} pos The index
     * @return {String} The term at the given index
     * @method getTermAt
     * @member CQ.Ext.form.TextField
     */
    getTermAt: function(pos) {
        var v = this.getRawValue();
        if (v.charAt(pos) == " ") {
            pos -= 1;
        }
        var start = v.lastIndexOf(" ", pos) + 1;
        var end = v.indexOf(" ", pos);
        if (end == -1) {
            return v.substring(start);
        }
        else {
            return v.substring(start, end);
        }
     },

    // private
    preFocus : function(){
        var el = this.el,
            isEmpty;
        if(this.emptyText){
            if(el.dom.value == this.emptyText){
                this.setRawValue('');
                isEmpty = true;
            }
            el.removeClass(this.emptyClass);
        }
        if(this.selectOnFocus || isEmpty){
            if (el.dom.select.defer != undefined) {
                el.dom.select.defer(10, el.dom);
            }
        }
    }

});
