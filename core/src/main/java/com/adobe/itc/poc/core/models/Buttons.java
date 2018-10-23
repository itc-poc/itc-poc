/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import javax.jcr.Node;
import javax.jcr.Property;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Buttons
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(Buttons.class);
  private String backgroundColor;
  private String borderColor;
  private String fontColor;
  private String backgroundColorHover;
  private String borderColorHover;
  private String fontColorHover;
  
  public void activate()
    throws Exception
  {
    try
    {
      log.info("Inside acitvate method ");
      
      Node currentNode = (Node)getRequest().getResource().adaptTo(Node.class);
      if (currentNode.hasProperty("backgroundColor"))
      {
        this.backgroundColor = currentNode.getProperty("backgroundColor").getValue().toString();
        if ((this.backgroundColor == null) || (this.backgroundColor.equals(""))) {
          this.backgroundColor = "0099CC";
        }
      }
      if (currentNode.hasProperty("borderColor"))
      {
        this.borderColor = currentNode.getProperty("borderColor").getValue().toString();
        if ((this.borderColor == null) || (this.borderColor.equals(""))) {
          this.borderColor = "0099CC";
        }
      }
      if (currentNode.hasProperty("fontColor"))
      {
        this.fontColor = currentNode.getProperty("fontColor").getValue().toString();
        if ((this.fontColor == null) || (this.fontColor.equals(""))) {
          this.fontColor = "FFFFFF";
        }
      }
      if (currentNode.hasProperty("backgroundColorHover"))
      {
        this.backgroundColorHover = currentNode.getProperty("backgroundColorHover").getValue().toString();
        if ((this.backgroundColorHover == null) || (this.backgroundColorHover.equals(""))) {
          this.backgroundColorHover = "FFFFFF";
        }
      }
      if (currentNode.hasProperty("borderColorHover"))
      {
        this.borderColorHover = currentNode.getProperty("borderColorHover").getValue().toString();
        if ((this.borderColorHover == null) || (this.borderColorHover.equals(""))) {
          this.borderColorHover = "0099CC";
        }
      }
      if (currentNode.hasProperty("fontColorHover"))
      {
        this.fontColorHover = currentNode.getProperty("fontColorHover").getValue().toString();
        if ((this.fontColorHover == null) || (this.fontColorHover.equals(""))) {
          this.fontColorHover = "000000";
        }
      }
      log.info("Values Generated For ButtoncurrentNode-->" + currentNode);
    }
    catch (NullPointerException e)
    {
      log.error("Null Pointer Exception-->" + e.getMessage());
    }
    catch (Exception e)
    {
      log.error("Exception-->" + e.getMessage());
    }
  }
  
  public String getBackgroundColor()
  {
    return this.backgroundColor;
  }
  
  public void setBackgroundColor(String color)
  {
    this.backgroundColor = color;
  }
  
  public String getBorderColor()
  {
    return this.borderColor;
  }
  
  public void setBorderColor(String borderColor)
  {
    this.borderColor = borderColor;
  }
  
  public String getFontColor()
  {
    return this.fontColor;
  }
  
  public void setFontColor(String fontColor)
  {
    this.fontColor = fontColor;
  }
  
  public String getBackgroundColorHover()
  {
    return this.backgroundColorHover;
  }
  
  public void setBackgroundColorHover(String backgroundColorHover)
  {
    this.backgroundColorHover = backgroundColorHover;
  }
  
  public String getBorderColorHover()
  {
    return this.borderColorHover;
  }
  
  public void setBorderColorHover(String borderColorHover)
  {
    this.borderColorHover = borderColorHover;
  }
  
  public String getFontColorHover()
  {
    return this.fontColorHover;
  }
  
  public void setFontColorHover(String fontColorHover)
  {
    this.fontColorHover = fontColorHover;
  }
}
