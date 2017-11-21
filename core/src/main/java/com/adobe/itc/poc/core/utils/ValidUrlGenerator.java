package com.adobe.itc.poc.core.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;

public class ValidUrlGenerator extends WCMUsePojo {
    private static final Logger LOG = LoggerFactory.getLogger( ValidUrlGenerator.class );
	private String completePath;

	public void activate() throws Exception {
        String path = get("path",String.class);
        String type = get("type",String.class);
		if(type == null){
			type="";
		}
        if(path == null){
			path="";
		}
        if(!type.equals("")){
        	if(type.equals("CHAT")){
        		completePath="javascript:void(0)";

        	}
        	if(type.equals("PHONE")){
        		completePath="tel:"+path;
        	}
        	
        }
        else{
            if( !path.isEmpty() ) {
            	//added changes for external link
				if( path.contains(".html") || path.contains("www")|| path.contains("http:")|| path.contains("https:")) {
					completePath = path;
				}

				else {
					if ( path.contains("/content/uopx") || path.contains("/content/altcloud") ) {
						completePath = path+".html";
					} else {
						completePath = path;
					}
				}
			}
			
            if( path.isEmpty() ) {
                completePath = "#";
            }
        }
	}

	public String getCompletePath() {
		return completePath;
	}
}