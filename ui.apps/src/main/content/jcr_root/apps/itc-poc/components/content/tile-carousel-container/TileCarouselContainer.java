package apps.itc_poc.components.content.tile_carousel_container;

import com.adobe.cq.sightly.WCMUsePojo;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.Arrays;

import java.io.IOException;
import java.io.InputStream;
import java.lang.Exception;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.io.IOUtils;

import org.apache.sling.commons.json.JSONObject; 
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;

import javax.jcr.Value;
import javax.jcr.Node;

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
