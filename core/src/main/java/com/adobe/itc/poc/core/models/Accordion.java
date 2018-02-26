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
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Accordion
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(Accordion.class);
  private String uniqueId;
  private String singleRestricted;
  
  public void activate()
    throws Exception
  {
    String[] accPath = getResource().getPath().split("/contentParsys/");
    this.uniqueId = accPath[1].replaceAll("/", "-");
    this.uniqueId = this.uniqueId.replaceAll("\\s", "-");
    this.singleRestricted = (((String)getProperties().get("restrictSingle", "")).equals("true") ? " single" : "");
  }
  
  public String getId()
  {
    return this.uniqueId;
  }
  
  public String getSingleRestricted()
  {
    return this.singleRestricted;
  }
}

