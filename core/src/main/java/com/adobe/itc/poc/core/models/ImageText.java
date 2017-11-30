package com.adobe.itc.poc.core.models;


import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ImageText
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(ImageText.class);
  private String pathfield;
  public boolean target;
  public String pagePath = "";
  
  public void activate()
    throws Exception
  {
    this.pathfield = ((String)getProperties().get("linkURL", ""));
    try
    {
      log.info("ImageText component starts here ");
      if ((this.pathfield.contains("http:")) || (this.pathfield.contains("https:")) || (!this.pathfield.contains("/content"))) {
        this.target = true;
      }
      log.info("ImageText_pathfield " + this.pathfield + " target value " + this.target);
    }
    catch (Exception e)
    {
      e = 
      
        e;log.debug(e.getMessage());
    }
    finally {}
  }
}
