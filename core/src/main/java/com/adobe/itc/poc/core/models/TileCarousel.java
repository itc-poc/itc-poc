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

public class TileCarousel extends WCMUsePojo {
	
	private static Logger log = LoggerFactory.getLogger(TileCarousel.class);
	  private List<Map<String, String>> tileConfigList = new ArrayList();
	  
	  public void activate()
	    throws Exception
	  {
	    log.info("Inside Activate Method");
	    Node currentNode = (Node)getRequest().getResource().adaptTo(Node.class);
	    if (currentNode != null)
	    {
	      log.info("CurrentNode is not null" + currentNode);
	      setTileConfigList(currentNode);
	    }
	  }
	  
	  private void setTileConfigList(Node currentNode)
	  {
	    log.info("Inside setTileConfigList");
	    
	    Value[] tileConfigValues = null;
	    Value tileConfigValue = null;
	    try
	    {
	      if ((currentNode.hasProperty("tileConfig")) && (currentNode.getProperty("tileConfig").isMultiple()))
	      {
	        tileConfigValues = currentNode.getProperty("tileConfig").getValues();
	        for (Value tileConfig : tileConfigValues)
	        {
	          String tileConfigString = tileConfig.toString().isEmpty() ? "" : tileConfig.toString();
	          if (!tileConfigString.isEmpty()) {
	            addTileConfigs(tileConfigString);
	          }
	        }
	      }
	      else if ((currentNode.hasProperty("tileConfig")) && (!currentNode.getProperty("tileConfig").isMultiple()))
	      {
	        tileConfigValue = currentNode.getProperty("tileConfig").getValue();
	        String tileConfigString = tileConfigValue.toString().isEmpty() ? "" : tileConfigValue.toString();
	        if (!tileConfigString.isEmpty()) {
	          addTileConfigs(tileConfigString);
	        }
	      }
	      log.info("setTileConfigList SIZE -->" + this.tileConfigList.size());
	    }
	    catch (Exception e)
	    {
	      log.error("Error in " + e);
	    }
	  }
	  
	  public void addTileConfigs(String tileConfigString)
	    throws JSONException
	  {
	    log.info("Inside addTileConfigs");
	    
	    Map<String, String> tileConfigMap = new HashMap();
	    JSONObject jsonObj = new JSONObject(tileConfigString);
	    
	    String tileHeading = jsonObj.getString("tileHeading");
	    String tileBody = jsonObj.getString("tileBody");
	    String tileIcon = jsonObj.getString("tileIcon");
	    String iconColor = jsonObj.has("iconColor") ? jsonObj.getString("iconColor") : "FFFFFF";
	    String iconBackgroundColor = jsonObj.has("iconBackgroundColor") ? jsonObj.getString("iconBackgroundColor") : "36849F";
	    if ((iconColor.equals("")) || (iconColor == null)) {
	      iconColor = "FFFFFF";
	    }
	    if ((iconBackgroundColor.equals("")) || (iconBackgroundColor == null)) {
	      iconBackgroundColor = "36849F";
	    }
	    if (iconColor.equals(iconBackgroundColor))
	    {
	      iconBackgroundColor = "36849F";
	      iconColor = "FFFFFF";
	    }
	    tileConfigMap.put("tileHeading", tileHeading);
	    tileConfigMap.put("tileBody", tileBody);
	    tileConfigMap.put("tileIcon", tileIcon);
	    tileConfigMap.put("iconColor", iconColor);
	    tileConfigMap.put("iconBackgroundColor", iconBackgroundColor);
	    
	    this.tileConfigList.add(tileConfigMap);
	  }
	  
	  public List<Map<String, String>> getTileConfigList()
	  {
	    return this.tileConfigList;
	  }

}
