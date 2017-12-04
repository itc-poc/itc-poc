package apps.itc-poc.components.structure.topnav;
//package com.adobe.itc.poc.core.models;

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

public class MainTopNavigation extends WCMUsePojo {
	
	private static Logger log = LoggerFactory.getLogger(MainTopNavigation.class);
	  private List<Map<String, String>> navBarConfigList = new ArrayList();
	  
	  public void activate()
	    throws Exception
	  {
	    log.info("Inside Activate Method");
	    Node currentNode = (Node)getRequest().getResource().adaptTo(Node.class);
	    if (currentNode != null)
	    {
	      log.info("CurrentNode is not null" + currentNode);
	      setNavigationConfigList(currentNode);
	    }
	  }
	  
	  private void setNavigationConfigList(Node currentNode)
	  {
	    log.info("Inside setNavigationConfigList");
	    
	    Value[] navBarConfigValues = null;
	    Value navConfigValue = null;
	    try
	    {
	      if ((currentNode.hasProperty("mainNavConfig")) && (currentNode.getProperty("mainNavConfig").isMultiple()))
	      {
	        navBarConfigValues = currentNode.getProperty("mainNavConfig").getValues();
	        for (Value navConfig : navBarConfigValues)
	        {
	          String navConfigString =navConfig.toString().isEmpty() ? "" :navConfig.toString();
	          if (!navConfigString.isEmpty()) {
	            addNavBarConfigs(navConfigString);
	          }
	        }
	      }
	      else if ((currentNode.hasProperty("mainNavConfig")) && (!currentNode.getProperty("mainNavConfig").isMultiple()))
	      {
	        navConfigValue = currentNode.getProperty("mainNavConfig").getValue();
	        String navConfigString = navConfigValue.toString().isEmpty() ? "" : navConfigValue.toString();
	        if (!navConfigString.isEmpty()) {
	          addNavBarConfigs(navConfigString);
	        }
	      }
	      log.info("setNavigationConfigList SIZE -->" + this.navBarConfigList.size());
	    }
	    catch (Exception e)
	    {
	      log.error("Error in " + e);
	    }
	  }
	  
	  public void addNavBarConfigs(String navConfigString)
	    throws JSONException
	  {
	    log.info("Inside addNavBarConfigs");
	    
	    Map<String, String> navConfigMap = new HashMap();
	    JSONObject jsonObj = new JSONObject(navConfigString);
	    
	    String mainMenu = jsonObj.getString("mainMenu");
	    String itemHasDropdown = jsonObj.getString("itemHasDropdown");
	    String subMenuList = jsonObj.getString("subMenuList");
	    String mainMenuURL = jsonObj.getString("mainMenuURL");
	    
	    navConfigMap.put("mainMenu", mainMenu);
	    navConfigMap.put("itemHasDropdown", itemHasDropdown);
	    navConfigMap.put("subMenuList", subMenuList);
	    navConfigMap.put("mainMenuURL", mainMenuURL);
	    
	    this.navBarConfigList.add(navConfigMap);
	  }
	  
	  public List<Map<String, String>> getnavBarConfigList()
	  {
	    return this.navBarConfigList;
	  }

}
