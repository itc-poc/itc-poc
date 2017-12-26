package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import java.util.ArrayList;
import java.util.List;
import com.day.cq.wcm.foundation.Image;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import com.day.cq.wcm.api.WCMMode;
import java.util.Iterator;
import java.lang.Exception;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProgramSpotlightCarousel extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(ProgramSpotlightCarousel.class);
  public String displayType;
  public String[] pgmConfig;
  public List<ProgramConfig> getProgramConfigList;
  public String fullWidthMobile;
  int sildePosition;
  int noOfTilePerSlide;
  
  public ProgramSpotlightCarousel()
  {
    this.displayType = "";
    
    this.getProgramConfigList = new ArrayList();
    
    this.sildePosition = -1;
  }
  
  public int getNumberOfSilde()
  {
    log.info("getNumberOfSilde");
    
    if(getProperties().get("noOfTilePerSlide", String.class) != null){
    	
    	noOfTilePerSlide = Integer.parseInt((String)getProperties().get("noOfTilePerSlide", String.class));
    
    //return noOfTilePerSlide;
    
    
    log.info("noOfTilePerSlide=" + noOfTilePerSlide);
    int totalSlide = this.getProgramConfigList.size();
    
    log.info("totalSlide=" + totalSlide);
    
    int numberOfSlide = totalSlide / noOfTilePerSlide;
    if (totalSlide % noOfTilePerSlide != 0) {
      numberOfSlide += 1;
    }
    return numberOfSlide;
    }
    return 0;
  }
  
  public int getSildePosition()
  {
    log.info("getSildePosition");
    this.sildePosition += 1;
    return this.sildePosition;
  }
  
  public void activate()
    throws Exception
  {
    this.pgmConfig = ((String[])getProperties().get("programConfig", String[].class));
    this.displayType = ((String)getProperties().get("displayType", String.class));
    this.fullWidthMobile = (((String)getProperties().get("fullWidthMobile", "")).equals("true") ? "clsFullWidth" : "");
    try
    {
      log.info("ProgramSpotlightCarousel starts here ");
      if (this.getProgramConfigList.isEmpty())
      {
        String fieldOfStudy = "";
        ArrayList<String> stringArray = new ArrayList();
        for (int i = 0; i < this.pgmConfig.length; i++)
        {
          JSONObject jsonObj = new JSONObject(this.pgmConfig[i]);
          if ("Y".equals(this.displayType)) {
            fieldOfStudy = jsonObj.getString("fieldOfStudy");
          }
          String isActive = "false";
          stringArray = jsonStringToArray(jsonObj.getString("isActivePgm"));
          if (!stringArray.isEmpty()) {
            isActive = (String)stringArray.get(0);
          }
          this.getProgramConfigList.add(new ProgramConfig(jsonObj.getString("pImage"), jsonObj.getString("programLink"), jsonObj.getString("programName"), fieldOfStudy, isActive, jsonObj.getString("tileView"), jsonObj.getString("tileBGColor")));
        }
      }
      log.info("ProgramSpotlightCarousel Ends here ");
    }
    catch (Exception e)
    {
      log.info(e.getMessage());
    }
    finally
    {
      log.info("ProgramSpotlightCarousel FInally here ");
    }
  }
  
  public ArrayList<String> jsonStringToArray(String jsonString)
    throws JSONException
  {
    ArrayList<String> stringArray = new ArrayList();
    
    JSONArray jsonArray = new JSONArray(jsonString);
    for (int i = 0; i < jsonArray.length(); i++) {
      stringArray.add(jsonArray.getString(i));
    }
    return stringArray;
  }
  
  public class ProgramConfig
  {
    private String imagePath;
    private String link;
    private String linkText;
    private String fieldOfStudy;
    private String isActive;
    private String tileView;
    private String tileBGColor;
    
    public ProgramConfig(String imagePath, String link, String linkText, String fieldOfStudy, String isActive, String tileView, String tileBGColor)
    {
      this.imagePath = imagePath;
      this.link = link;
      this.linkText = linkText;
      this.fieldOfStudy = fieldOfStudy;
      this.isActive = isActive;
      this.tileView = tileView;
      if (("".equals(this.tileView)) || (this.tileView == null)) {
        this.tileView = "imageView";
      }
      this.tileBGColor = tileBGColor;
    }
    
    public String isActive()
    {
      return this.isActive;
    }
    
    public void setActive(String isActive)
    {
      this.isActive = isActive;
    }
    
    public String getImagePath()
    {
      return this.imagePath;
    }
    
    public void setImagePath(String imagePath)
    {
      this.imagePath = imagePath;
    }
    
    public String getLink()
    {
      return this.link;
    }
    
    public void setLink(String link)
    {
      this.link = link;
    }
    
    public String getLinkText()
    {
      return this.linkText;
    }
    
    public void setLinkText(String linkText)
    {
      this.linkText = linkText;
    }
    
    public String getFieldOfStudy()
    {
      return this.fieldOfStudy;
    }
    
    public void setFieldOfStudy(String fieldOfStudy)
    {
      this.fieldOfStudy = fieldOfStudy;
    }
    
    public String getTileView()
    {
      return this.tileView;
    }
    
    public void setTileView(String tileView)
    {
      this.tileView = tileView;
    }
    
    public String getTileBGColor()
    {
      return this.tileBGColor;
    }
    
    public void setTileBGColor(String tileBGColor)
    {
      this.tileBGColor = tileBGColor;
    }
  }
}
