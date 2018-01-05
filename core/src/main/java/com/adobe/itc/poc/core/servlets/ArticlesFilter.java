package com.adobe.itc.poc.core.servlets;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.PageManagerFactory;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.commons.json.jcr.JsonItemWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate=true, metatype=true)
@Service({Servlet.class})
@Properties({@org.apache.felix.scr.annotations.Property(name="sling.servlet.paths", value={"/bin/articles/filter"}), @org.apache.felix.scr.annotations.Property(name="sling.servlet.methods", value={"GET", "POST"})})
public class ArticlesFilter
  extends SlingAllMethodsServlet
{
  private static final long serialVersionUID = 1L;
  private static final Logger LOG = LoggerFactory.getLogger(ArticlesFilter.class);
  private String articlesPath = "";
  private String keyword = "";
  private int noOfArticles = 6;
  @Reference
  PageManagerFactory pageManagerFactory;
  
  protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
    throws ServletException, IOException
  {
    TreeMap<Date, JSONObject> tMap = new TreeMap();
    TreeMap<Date, JSONObject> finalTMap = new TreeMap(Collections.reverseOrder());
    JSONArray jsonArray = new JSONArray();
    ResourceResolver resourceResolver = request.getResourceResolver();
    try
    {
      this.keyword = request.getParameter("keyword");
      LOG.info("keyword-->" + this.keyword);
      if (request.getParameter("searchPath") != null)
      {
        LOG.info("if block articlespath");
        this.articlesPath = request.getParameter("searchPath");
      }
      else
      {
        LOG.info("else block articlespath");
        this.articlesPath = "/content/itc-poc/blog";
      }
      LOG.info("articlesPath-->" + this.articlesPath);
      
      PageManager pageManager = this.pageManagerFactory.getPageManager(resourceResolver);
      Page articlesPage = pageManager.getPage(this.articlesPath);
      LOG.info("articlesPage-->" + articlesPage);
      if (articlesPage != null)
      {
        LOG.info("articlesPage-->" + articlesPage.getPath());
        tMap = getPageDetails(articlesPage, resourceResolver);
        finalTMap.putAll(tMap);
      }
      Iterator<Page> pageItr = articlesPage.listChildren(new PageFilter(), true);
      while (pageItr.hasNext())
      {
        Page articlePage = (Page)pageItr.next();
        LOG.info("articlePage-->" + articlePage.getPath());
        tMap = getPageDetails(articlePage, resourceResolver);
        finalTMap.putAll(tMap);
      }
      if (null != request.getParameter("noOfArticles"))
      {
        this.noOfArticles = Integer.parseInt(request.getParameter("noOfArticles"));
        LOG.info("noOfArticle-->" + this.noOfArticles);
      }
      Set set = finalTMap.entrySet();
      Iterator iterator = set.iterator();
      
      LOG.info("totalArticles Found-->-->" + set.size());
      
      int count = 0;
      while (iterator.hasNext())
      {
        Map.Entry mentry = (Map.Entry)iterator.next();
        if (count < this.noOfArticles)
        {
          jsonArray.put(mentry.getValue());
          count++;
          LOG.info("===========>> & count is: ", Integer.valueOf(count));
        }
      }
      response.setCharacterEncoding("UTF-8");
      response.setContentType("application/json");
      response.setStatus(200);
      response.getWriter().write(jsonArray.toString());
      jsonArray = null;
    }
    catch (Exception e)
    {
      LOG.info("===========>> error  :: {}", e.getMessage());
    }
    finally
    {
      if (resourceResolver.isLive()) {
        resourceResolver.close();
      }
    }
  }
  
  private TreeMap<Date, JSONObject> getPageDetails(Page articlePage, ResourceResolver resourceResolver)
  {
    TreeMap<Date, JSONObject> tmap = new TreeMap();
    if (articlePage != null) {
      try
      {
        LOG.info("===========>> rsource path :: {}", articlePage.getPath());
        JSONObject jsonObject = new JSONObject();
        Date date = null;
        SimpleDateFormat formatter = new SimpleDateFormat("yyy-MM-dd'T'HH:mm:ss.SSSX");
        String finalPath = articlePage.getPath() + "/" + "jcr:content";
        Resource res = resourceResolver.getResource(finalPath);
        Node node = (Node)res.adaptTo(Node.class);
        if ((node.hasProperty("jcr:created")) && 
          (!node.getProperty("jcr:created").isMultiple()))
        {
          LOG.info("===========>> created is not Multiple  :: {}", node
            .getProperty("jcr:created").getValue());
          try
          {
            String dateStr = node.getProperty("jcr:created").getValue().toString();
            date = formatter.parse(dateStr);
            LOG.info("===========>> created date in string format: " + formatter.parse(dateStr));
          }
          catch (ParseException ex)
          {
            LOG.info("===========>> Exception", ex);
          }
        }
        if ((!this.keyword.isEmpty()) && (this.keyword != null))
        {
         // String finalString = finalPath + "/__search/dimensions";
         // Resource keyres = resourceResolver.getResource(finalString);
          Resource keyres = resourceResolver.getResource(finalPath);
          Node keywordsNode = (Node)keyres.adaptTo(Node.class);
          LOG.info("===========>> keyword  :: {}", this.keyword);
          LOG.info("===========>> content node  :: {}", articlePage.getPath());
          if (keywordsNode.hasProperty("keywords"))
          {
            LOG.info("===========>> property   :: {}", 
              Boolean.valueOf(keywordsNode.getProperty("keywords").isMultiple()));
            if (keywordsNode.getProperty("keywords").isMultiple())
            {
              LOG.info("===========>> in multiple node path  :: {}", keywordsNode.getPath());
              Value[] values = keywordsNode.getProperty("keywords").getValues();
              for (Value val : values) {
                if ((val.getString().trim().equals(this.keyword)) || 
                  (val.getString().trim().contains(this.keyword + "=")))
                {
                  LOG.info("===========>> Page  :: {}", articlePage.getPath());
                  jsonObject = getArticleJson(articlePage, resourceResolver);
                  jsonObject.put("pageTitle", articlePage.getTitle());
                  jsonObject.put("pagePath", articlePage.getPath() + ".html");
                  if (null != date) {
                    tmap.put(date, jsonObject);
                  }
                  LOG.info("===========>> jsonObject  :: {}", jsonObject.toString());
                }
              }
            }
            else
            {
              LOG.info("===========>> in multiple else node path  :: {}", keywordsNode.getPath());
              String value = keywordsNode.getProperty("keywords").getValue().getString();
              if ((value.trim().equals(this.keyword)) || (value.trim().contains(this.keyword + "=")))
              {
                LOG.info("===========>> Page  :: {}", articlePage.getPath());
                jsonObject = getArticleJson(articlePage, resourceResolver);
                jsonObject.put("pageTitle", articlePage.getTitle());
                jsonObject.put("pagePath", articlePage.getPath() + ".html");
                if (null != date) {
                  tmap.put(date, jsonObject);
                }
                LOG.info("===========>> jsonObject  :: {}", jsonObject.toString());
              }
            }
          }
        }
        else
        {
          LOG.info("===========>> Page  :: {}", articlePage.getPath());
          jsonObject = getArticleJson(articlePage, resourceResolver);
          jsonObject.put("pageTitle", articlePage.getTitle());
          jsonObject.put("pagePath", articlePage.getPath() + ".html");
          if (null != date) {
            tmap.put(date, jsonObject);
          }
          LOG.info("===========>> jsonObject  :: {}", jsonObject.toString());
        }
      }
      catch (Exception e)
      {
        LOG.info("===========>> error  :: {}", e.getMessage());
      }
    }
    return tmap;
  }
  
  private JSONObject getArticleJson(Page articlesPage, ResourceResolver resolver)
  {
    LOG.info("===========>> profileTitle  :: {}", articlesPage.getTitle());
    Resource resource = articlesPage.getContentResource("contentParsys/hero");
    LOG.info("===========>> profileTitle  :: {}", resource);
    if (resource != null)
    {
      Node node = (Node)resource.adaptTo(Node.class);
      
      Set<String> propertiesToIgnore = new HashSet() {};
      StringWriter stringWriter = new StringWriter();
      JsonItemWriter jsonWriter = new JsonItemWriter(propertiesToIgnore);
      JSONObject jsonObject = null;
      try
      {
        jsonWriter.dump(node, stringWriter, 0);
        return new JSONObject(stringWriter.toString());
      }
      catch (RepositoryException e)
      {
        LOG.info("Repository exception :: {} ", e);
      }
      catch (JSONException e)
      {
        LOG.info("JSON exception :: {} ", e);
        e.printStackTrace();
      }
      catch (Exception e)
      {
        LOG.info("Exception :: {} ", e);
      }
    }
    return null;
  }
  
  protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
    throws ServletException, IOException
  {
    doGet(request, response);
  }
  
  protected void bindPageManagerFactory(PageManagerFactory paramPageManagerFactory)
  {
    this.pageManagerFactory = paramPageManagerFactory;
  }
  
  protected void unbindPageManagerFactory(PageManagerFactory paramPageManagerFactory)
  {
    if (this.pageManagerFactory == paramPageManagerFactory) {
      this.pageManagerFactory = null;
    }
  }
}

