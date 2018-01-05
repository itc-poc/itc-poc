
package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Hero
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(Hero.class);
  private String pathfield;
  public boolean target;
  public String pagePath = "";
  
  public void activate()
    throws Exception
  {
    this.pathfield = ((String)getProperties().get("collegeLink", ""));
    try
    {
      log.info("Hero component starts here ");
      if ((!this.pathfield.contains("#")) && ((this.pathfield.contains("http:")) || (this.pathfield.contains("https:")) || (!this.pathfield.contains("/content")))) {
        this.target = true;
      }
      log.info("pathfield " + this.pathfield + " target value " + this.target);
    }
    catch (Exception e)
    {
      e = 
      
        e;log.debug(e.getMessage());
    }
    finally {}
  }
}