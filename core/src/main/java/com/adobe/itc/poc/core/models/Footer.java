package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import com.adobe.dam.print.ids.PrintFormat;
import com.day.cq.wcm.api.designer.Design;
import com.day.cq.wcm.api.designer.Style;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Footer
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(Footer.class);
  Style siteCongifStyle;
  public String logoURL;
  public String logoImage;
  public String logoAltText;
  public String footerFontcolor;
  public String footerFontsize;
  public String footerBgColor;
  public String footerNavText;
  public String policyLinkText;
  public String policyLinkURL;
  public String tncLinkText;
  public String tncLinkURL;
  public String copyRightText;
  
  public void activate()
    throws Exception
  {
    try
    {
      Design currentDesign = (Design)get("currDesign", Design.class);
      this.siteCongifStyle = currentDesign.getStyle("siteconfig");
      this.logoImage = ((String)this.siteCongifStyle.get("logoImage", String.class));
      this.logoURL = ((String)this.siteCongifStyle.get("logoURL", String.class));
      this.logoAltText = ((String)this.siteCongifStyle.get("logoAltText", String.class));
      this.footerFontcolor = ((String)this.siteCongifStyle.get("footerFontcolor", String.class));
      this.footerFontsize = ((String)this.siteCongifStyle.get("footerFontsize", String.class));
      this.footerBgColor = ((String)this.siteCongifStyle.get("footerBgColor", String.class));
      this.footerNavText = ((String)this.siteCongifStyle.get("footerNavText", String.class));
      this.policyLinkText = ((String)this.siteCongifStyle.get("policyLinkText", String.class));
      this.policyLinkURL = ((String)this.siteCongifStyle.get("policyLinkURL", String.class));
      this.tncLinkText = ((String)this.siteCongifStyle.get("tncLinkText", String.class));
      this.tncLinkURL = ((String)this.siteCongifStyle.get("tncLinkURL", String.class));
      this.copyRightText = ((String)this.siteCongifStyle.get("copyRightText", String.class));
    }
    catch (Exception e)
    {
      log.info(e.getMessage());
    }
  }
}

