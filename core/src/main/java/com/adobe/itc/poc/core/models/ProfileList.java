
package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProfileList
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(ProfileList.class);
  private String profilePath;
  private String allProfilePagePath;
  public boolean target;
  public boolean allProfileTarget;
  public String pagePath = "";
  
  public void activate()
    throws Exception
  {
    this.profilePath = ((String)getProperties().get("profilesPath", ""));
    this.allProfilePagePath = ((String)getProperties().get("allProfilesPagePath", ""));
    try
    {
      log.info("Tile component starts here ");
      if ((this.profilePath.contains(".html")) || (this.profilePath.contains("http:")) || (this.profilePath.contains("https:")) || (!this.profilePath.contains("/content"))) {
        this.target = true;
      }
      if ((this.allProfilePagePath.contains(".html")) || (this.allProfilePagePath.contains("http:")) || (this.allProfilePagePath.contains("https:")) || (!this.allProfilePagePath.contains("/content"))) {
        this.allProfileTarget = true;
      }
      log.info("profilePath " + this.profilePath + " target value " + this.target);
      log.info("allProfilePagePath " + this.allProfilePagePath + " target value " + this.allProfileTarget);
    }
    catch (Exception e)
    {
      e = 
      
        e;log.debug(e.getMessage());
    }
    finally {}
  }
}
