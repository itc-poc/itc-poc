package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.Session;
import javax.jcr.Value;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Tabs
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(Tabs.class);
  private Session session;
  private List<Map<String, String>> tabConfigList = new ArrayList();
  
  public void activate()
    throws Exception
  {
    log.info("Inside Activate Method");
    Node currentNode = (Node)getRequest().getResource().adaptTo(Node.class);
    if (currentNode != null)
    {
      log.info("CurrentNode is not null" + currentNode);
      setTabConfigList(currentNode);
    }
  }
  
  private void setTabConfigList(Node currentNode)
  {
    log.info("Inside setTabConfigList");
    
    Value[] tabConfigValues = null;
    Value tabConfigValue = null;
    try
    {
      if ((currentNode.hasProperty("tabConfig")) && (currentNode.getProperty("tabConfig").isMultiple()))
      {
        tabConfigValues = currentNode.getProperty("tabConfig").getValues();
        for (Value tabConfig : tabConfigValues)
        {
          String tabConfigString = tabConfig.toString().isEmpty() ? "" : tabConfig.toString();
          if (!tabConfigString.isEmpty()) {
            addTabConfigs(tabConfigString);
          }
        }
        deleteExtraNodes(tabConfigValues, currentNode);
      }
      else if ((currentNode.hasProperty("tabConfig")) && (!currentNode.getProperty("tabConfig").isMultiple()))
      {
        tabConfigValue = currentNode.getProperty("tabConfig").getValue();
        String tabConfigString = tabConfigValue.toString().isEmpty() ? "" : tabConfigValue.toString();
        if (!tabConfigString.isEmpty()) {
          addTabConfigs(tabConfigString);
        }
        deleteExtraNodes(tabConfigValue, currentNode);
      }
      log.info("setTabConfigList SIZE -->" + this.tabConfigList.size());
      if ((tabConfigValue == null) && (tabConfigValues == null)) {
        deleteAllNodes(currentNode);
      }
    }
    catch (Exception e)
    {
      log.error("Error in " + e);
    }
  }
  
  private void deleteAllNodes(Node currentNode)
  {
    try
    {
      this.session = currentNode.getSession();
      
      log.info("inside deleteExtraNodes 2");
      
      NodeIterator childNodes = currentNode.getNodes();
      log.info("current node is: " + currentNode.getName());
      while (childNodes.hasNext())
      {
        log.info("inside while loop");
        Node childNode = childNodes.nextNode();
        childNode.remove();
      }
      this.session.save();
    }
    catch (Exception e)
    {
      log.info("error is: " + e);
    }
  }
  
  private void deleteExtraNodes(Value[] tabConfigValues, Node currentNode)
  {
    try
    {
      this.session = currentNode.getSession();
      
      log.info("inside deleteExtraNodes 2");
      
      NodeIterator childNodes = currentNode.getNodes();
      
      log.info("current node is: " + currentNode.getName());
      while (childNodes.hasNext())
      {
        log.info("inside while loop");
        Node childNode = childNodes.nextNode();
        String nodeName = childNode.getName();
        
        log.info("node name ->" + nodeName);
        
        boolean tabFind = false;
        for (Value tabConfigValue : tabConfigValues)
        {
          log.info("tab_config_value ->" + tabConfigValue.toString());
          if (tabConfigValue.toString().contains(nodeName))
          {
            tabFind = true;
            break;
          }
        }
        if (!tabFind)
        {
          log.info(nodeName + " removed");
          childNode.remove();
        }
      }
      this.session.save();
    }
    catch (Exception e)
    {
      log.error("Error in removing the extra node " + e);
    }
  }
  
  private void deleteExtraNodes(Value tabConfigValue, Node currentNode)
  {
    try
    {
      this.session = currentNode.getSession();
      
      log.info("inside deleteExtraNodes 2");
      
      NodeIterator childNodes = currentNode.getNodes();
      
      log.info("current node is: " + currentNode.getName());
      while (childNodes.hasNext())
      {
        boolean tabFind = false;
        log.info("inside while loop");
        Node childNode = childNodes.nextNode();
        String nodeName = childNode.getName();
        
        log.info("node name ->" + nodeName);
        
        log.info("tab_config_value ->" + tabConfigValue.toString());
        if (tabConfigValue.toString().contains(nodeName)) {
          tabFind = true;
        }
        if (!tabFind)
        {
          log.info(nodeName + " removed");
          childNode.remove();
        }
      }
      this.session.save();
    }
    catch (Exception e)
    {
      log.error("Error in removing the extra node " + e);
    }
  }
  
  public void addTabConfigs(String tabConfigString)
    throws JSONException
  {
    log.info("Inside addTabConfigs");
    
    Map<String, String> tabConfigMap = new HashMap();
    JSONObject jsonObj = new JSONObject(tabConfigString);
    
    String tabTitleText = jsonObj.getString("tabTitleText");
    String tabCount = jsonObj.getString("tabCount");
    
    tabConfigMap.put("tabTitleText", tabTitleText);
    tabConfigMap.put("tabCount", tabCount);
    
    this.tabConfigList.add(tabConfigMap);
  }
  
  public List<Map<String, String>> getTabConfigList()
  {
    return this.tabConfigList;
  }
}
