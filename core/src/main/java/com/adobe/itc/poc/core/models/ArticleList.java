
package com.adobe.itc.poc.core.models;

import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArticleList
  extends WCMUsePojo
{
  private static Logger log = LoggerFactory.getLogger(ArticleList.class);
  private String articlesPath;
  private String allArticlesPagePath;
  public boolean target;
  public boolean allArticleTarget;
  public String pagePath = "";
  
  public void activate()
    throws Exception
  {
    this.articlesPath = ((String)getProperties().get("articlesPath", ""));
    this.allArticlesPagePath = ((String)getProperties().get("allArticlesPagePath", ""));
    try
    {
      log.error("ArticleList component starts here ");
      if ((this.articlesPath.contains(".html")) || (this.articlesPath.contains("http:")) || (this.articlesPath.contains("https:")) || (!this.articlesPath.contains("/content"))) {
        this.target = true;
      }
      if ((this.allArticlesPagePath.contains(".html")) || (this.allArticlesPagePath.contains("http:")) || (this.allArticlesPagePath.contains("https:")) || (!this.allArticlesPagePath.contains("/content"))) {
        this.allArticleTarget = true;
      }
      log.error("articlesPath " + this.articlesPath + " target value " + this.target);
      log.error("allArticlesPagePath " + this.allArticlesPagePath + " target value " + this.allArticleTarget);
    }
    catch (Exception e)
    {
      e = 
      
        e;log.debug(e.getMessage());
    }
    finally {}
  }
}

