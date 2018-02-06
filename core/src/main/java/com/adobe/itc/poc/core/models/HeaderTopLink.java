package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.designer.Design;
import java.util.ArrayList;
import java.util.List;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;

public class HeaderTopLink
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(HeaderTopLink.class);
  public String[] socialLinkAndIcon;
  public List<String> tileHeading = new ArrayList();
  public List<String> tileURL = new ArrayList();
  public List<String> tileIcon = new ArrayList();
  public void activate()
    throws Exception
  {
    try
    {
      Design currentDesign = (Design)get("currDesign", Design.class);
      String path = currentDesign.getPath()+"/jcr:content/template-main/topnav";
      Resource res = getResourceResolver().getResource(path);
      this.socialLinkAndIcon = ((String[])((ValueMap)res.adaptTo(ValueMap.class)).get("tileConfig", String[].class));
      log.info("string json  " + this.socialLinkAndIcon);
      for (int i = 0; i < this.socialLinkAndIcon.length; i++)
      {
        JSONObject jsonObj = new JSONObject(this.socialLinkAndIcon[i]);
        this.tileHeading.add(jsonObj.getString("tileHeading"));
        this.tileURL.add(jsonObj.getString("tileURL"));
        this.tileIcon.add(jsonObj.getString("tileIcon"));
      }
    }
    catch (Exception e)
    {
      log.info(e.getMessage());
    }
  }
}
