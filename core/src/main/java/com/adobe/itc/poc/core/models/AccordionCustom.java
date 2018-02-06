package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.Value;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AccordionCustom extends WCMUsePojo {
	
	private static Logger log = LoggerFactory.getLogger(AccordionCustom.class);
	  private List<Map<String, String>> accordionCustomConfigList = new ArrayList();
	  
	  public void activate()
	    throws Exception
	  {
	    log.info("Inside Activate Method");
	    Node currentNode = (Node)getRequest().getResource().adaptTo(Node.class);
	    if (currentNode != null)
	    {
	      log.info("CurrentNode is not null" + currentNode);
	      setAccordionCustomConfigList(currentNode);
	    }
	  }
	  
	  private void setAccordionCustomConfigList(Node currentNode)
	  {
	    log.info("Inside setAccordionCustomConfigList");
	    
	    Value[] accordionCustomConfigValues = null;
	    Value accordionCustomConfigValue = null;
	    try
	    {
	      if ((currentNode.hasProperty("tileConfig")) && (currentNode.getProperty("tileConfig").isMultiple()))
	      {
	    	  accordionCustomConfigValues = currentNode.getProperty("tileConfig").getValues();
	        for (Value accordionCustomConfig : accordionCustomConfigValues)
	        {
	          String accordionCustomConfigString = accordionCustomConfig.toString().isEmpty() ? "" : accordionCustomConfig.toString();
	          if (!accordionCustomConfigString.isEmpty()) {
	            addAccordionCustomConfigs(accordionCustomConfigString);
	          }
	        }
	      }
	      else if ((currentNode.hasProperty("tileConfig")) && (!currentNode.getProperty("tileConfig").isMultiple()))
	      {
	    	  accordionCustomConfigValue = currentNode.getProperty("tileConfig").getValue();
	        String accordionCustomConfigString = accordionCustomConfigValue.toString().isEmpty() ? "" : accordionCustomConfigValue.toString();
	        if (!accordionCustomConfigString.isEmpty()) {
	          addAccordionCustomConfigs(accordionCustomConfigString);
	        }
	      }
	      log.info("setTileConfigList SIZE -->" + this.accordionCustomConfigList.size());
	    }
	    catch (Exception e)
	    {
	      log.error("Error in " + e);
	    }
	  }
	  
	  public void addAccordionCustomConfigs(String accordionCustomConfigString)
	    throws JSONException
	  {
	    log.info("Inside addAccordionCustomConfigs");
	    
	    Map<String, String> accordionCustomConfigMap = new HashMap();
	    JSONObject jsonObj = new JSONObject(accordionCustomConfigString);
	    
	    String accordionCustomHeading = jsonObj.getString("tileHeading");
	    String accordionCustomUrl = jsonObj.getString("tileURL");
	    String accordionCustomid = jsonObj.getString("accCount");
	    String accordionCustomIcon = jsonObj.getString("tileIcon");
	    //String iconColor = jsonObj.has("iconColor") ? jsonObj.getString("iconColor") : "FFFFFF";
	    //String iconBackgroundColor = jsonObj.has("iconBackgroundColor") ? jsonObj.getString("iconBackgroundColor") : "36849F";
	    //if ((iconColor.equals("")) || (iconColor == null)) {
	      //iconColor = "FFFFFF";
	    //}
	    if ((accordionCustomUrl.equals("")) || (accordionCustomUrl == null)) {
	    	accordionCustomUrl = "#";
	    }
	   // if (iconColor.equals(iconBackgroundColor))
	   // {
	    //  iconBackgroundColor = "36849F";
	     // iconColor = "FFFFFF";
	  //  }
	   // if ((iconBackgroundColor.equals("")) || (iconBackgroundColor == null)) {
		   //   iconBackgroundColor = "36849F";
		  //  }
	    accordionCustomConfigMap.put("accordionCustomHeading", accordionCustomHeading);
	    accordionCustomConfigMap.put("accordionCustomid", accordionCustomid);
	    accordionCustomConfigMap.put("accordionCustomUrl", accordionCustomUrl);
	    accordionCustomConfigMap.put("accordionCustomIcon", accordionCustomIcon);
	    //accordionCustomConfigMap.put("iconColor", iconColor);
	   // accordionCustomConfigMap.put("iconBackgroundColor", iconBackgroundColor);
	    
	    this.accordionCustomConfigList.add(accordionCustomConfigMap);
	  }
	  
	  public List<Map<String, String>> getAccordionCustomConfigList()
	  {
	    return this.accordionCustomConfigList;
	  }

}
