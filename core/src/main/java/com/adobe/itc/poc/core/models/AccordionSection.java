
package com.adobe.itc.poc.core.models;


import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AccordionSection
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(AccordionSection.class);
  private String uniqueId;
  private String sectionId;
  private boolean expandOnRender;
  private String accordionHeader;
  
  public void activate()
    throws Exception
  {
    Resource accordianRes = getResource().getParent().getParent();
    String[] accPath = accordianRes.getPath().split("/contentParsys/");
    this.uniqueId = accPath[1].replaceAll("/", "-");
    this.sectionId = (getResource().getName() + "-" + this.uniqueId);
    this.sectionId = this.sectionId.replaceAll("\\s", "-");
    this.expandOnRender = ((String)getProperties().get("expanded", "false")).equals("true");
    if (accordianRes != null)
    {
      ValueMap vMap = (ValueMap)accordianRes.adaptTo(ValueMap.class);
      this.accordionHeader = ((String)vMap.get("accordionHeaderTag", "h3"));
      
    }
  }
  
  public String getUniqueId()
  {
    return this.uniqueId;
  }
  
  public String getSectionId()
  {
    return this.sectionId;
  }
  
  public boolean getExpanded()
  {
    return this.expandOnRender;
  }
  
  public String getAccordionHeader()
  {
    return this.accordionHeader;
  }
}