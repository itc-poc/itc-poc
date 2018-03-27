package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.lang.Exception;


public class TileCarouselContainer extends WCMUsePojo {
	 

		private static Logger log = LoggerFactory.getLogger( TileCarouselContainer.class );  
		public String  noOfRows = ""; 
    	public String  noOfColumns = ""; 
    	public String  mobileView = ""; 
    	public List<String> rowArray =new ArrayList<String>();
    	public List<String> rowClassArray =new ArrayList<String>();
    	public List<String> columnArray =new ArrayList<String>();
    	public List<String> totalIteamArray =new ArrayList<String>();

		@Override
		public void activate() throws Exception {
			log.debug("Promgram finder wcmuse active ");
            noOfRows = getProperties().get("noOfRows", String.class);
            noOfColumns = getProperties().get("noOfColumns", String.class);
            mobileView = getProperties().get("mobileView", String.class);
			int loopRow =Integer.parseInt(noOfRows);

            int loopcolumn =Integer.parseInt(noOfColumns);


            int looptotal = loopcolumn*loopRow;
			int r = 0;
            for (int i = 1; i <= looptotal; i++){
                totalIteamArray.add("carouselItem"+i);

                if(i%loopcolumn ==1)
                { r++;
					rowClassArray.add("tccRow"+r);
                }
                else{
					rowClassArray.add("noRow");
                }
            }

		}
}
