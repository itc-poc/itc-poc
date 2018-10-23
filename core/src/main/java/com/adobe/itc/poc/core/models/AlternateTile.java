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
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AlternateTile
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(AlternateTile.class);
  private String pathfield;
  public boolean target;
  public String pagePath = "";
  
  public void activate()
    throws Exception
  {
    this.pathfield = ((String)getProperties().get("tileURL", ""));
    try
    {
      log.info("Tile component starts here ");
      if ((this.pathfield.contains(".html")) || (this.pathfield.contains("http:")) || (this.pathfield.contains("https:"))) {
        this.target = true;
      }
      log.info("pathfield " + this.pathfield + " target value " + this.target);
    }
    catch (Exception e)
    {
      e = e;
      log.debug(e.getMessage());
    }
    finally {}
  }
}
