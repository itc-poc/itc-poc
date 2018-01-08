/**
* @extends CQ.form.CompositeField
* The footerLinkItem is responsible for three items:
 * linkText (String), linkPath (String), and linkHeader (Boolean)
*/
CQ.form.linkListItem = CQ.Ext.extend(CQ.form.CompositeField, {
        bodyStyle: "background-color: #EBEBEB;",
        layout:'hbox',
        width: 850,
        height: 24,
        labelWidth:60,
       
        /**
         * @private
         * @type CQ.Ext.form.BrowseField
         */
 
        linkPathRoot:"/content/itc-poc",
 
        constructor:function(d){
            var that = this;
            //if(d.text!==null){this.text=d.text;}
            var c = {};
           
            CQ.Util.applyDefaults(d,c);
 
            CQ.form.linkListItem.superclass.constructor.call(this,d);
           
            /**
             * Text field to hold text of link each link.
             */
           
            this.linkText=new CQ.Ext.form.TextField({
                name:this.name + "/linkText",
                labelWidth:10,
                height: 24,
                width: 140
                //width: 150
 
            });
 
            /**
             * Holds the URL of each link.
             */
           
            this.linkPath = new CQ.form.BrowseField({      
                name:this.name + "/linkPath",
                //width: 200,
                width: 180,
                height: 24,
                style:'margin-top: 1px;',
                value:this.linkPathRoot
            });
 
            /**
             * Hidden textfield that holds the text equivalent (true or false) of linkIsHeaderCheckBox's value.
             * Had to use this because ext checkboxes are null if unchecked, breaking the CQ String[] that holds data.
             */
            
           /* this.linkIsHeader = new CQ.Ext.form.TextField({      
                name:this.name + "/linkIsHeader",
                width: 'auto',
                height: 24,
                hidden:true,
                value:'false'
            }); */
 
            /**
             * Checkbox whose value is mirrored in string form by hidden field linkIsHeader.
             */
       
          /*  this.linkIsHeaderCheckBox = new CQ.Ext.form.Checkbox({
                inputValue: 'true',
                hideLabel: false,
                width: 50,
                height: 24,
                style:'margin-left: 15px;',
                isHeaderTextField : this.linkIsHeader
            });
 
            this.linkIsHeaderCheckBox.on('check', function() {                                  //When checkbox is checked...
                that.linkIsHeader.setValue(that.linkIsHeaderCheckBox.getValue());               //textbox value is set to match
            });
 
            this.linkIsHeader.on('change', function() {                                         //When re-ordering occurs, change event is triggered by MultiField.js...
                that.linkIsHeaderCheckBox.setValue(that.linkIsHeader.getValue());               //which resets the checkbox based on the new textfield value.
            });
 */
            var that = this;
            this.ownerCt.ownerCt.addListener('activate', function () {
                that.linkListItem.setWidth('500px').setWidth('500');
                that.linkListItem.doLayout();
            });
 
            this.add(this.linkText);
            this.add(this.linkPath);
        //    this.add(this.linkIsHeader);
        //    this.add({xtype: 'box', style:'margin-top: 3px;margin-left:10px;',autoEl: {cn: 'Header: '}});
        //    this.add(this.linkIsHeaderCheckBox);
        },
       
        // overriding CQ.form.CompositeField#processRecord
        processRecord:function(d,c){
            this.linkText.setValue(d.get(this.linkText.getName()));
            this.linkPath.setValue(d.get(this.linkPath.getName()));
        //    this.linkIsHeader.setValue(d.get(this.linkIsHeader.getName()));                 //Note that linkIsHeader and...
         //   this.linkIsHeaderCheckBox.setValue(d.get(this.linkIsHeader.getName()));         //linkIsHeaderCheckBox are both set to the value of the textField.
        },
 
        // overriding CQ.form.CompositeField#getValue
        getValue:function(){
            var b = new Array(
                this.linkText.getValue(),
                this.linkPath.getValue()
            //    this.linkIsHeader.getValue()
            );
            return b;
        },
 
        // overriding CQ.form.CompositeField#setValue
        setValue:function(b) {
            if(b){
                this.linkText.setValue(b.linkText);
                this.linkPath.setValue(b.linkPath);
            //    this.linkIsHeader.setValue(b.linkIsHeader);                                 //Note that linkIsHeader and...                    
             //   this.linkIsHeaderCheckBox.setValue(b.linkIsHeader);                         //linkIsHeaderCheckBox are both set to the value of the textField.
            }                            
        }
    });
 
 
CQ.Ext.reg("linkListItem", CQ.form.linkListItem);