package com.adobe.itc.poc.core.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.Resource;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import java.util.Iterator;
import java.util.List;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.ListIterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.commons.collections4.IteratorUtils;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;

import javax.jcr.Node;
import javax.jcr.NodeIterator;

public class ArticleUtils extends WCMUsePojo {
    
    private static Logger log = LoggerFactory.getLogger( ArticleUtils.class );
    private List<ArticleUtils.Article> articleList = new ArrayList<ArticleUtils.Article>();
    private ListIterator<Page> lIter = null;
    private String imagePath = "";
    private String articleTitle = "";
    private String url = "";
    private String desc = "";
    private String dateVal = "";
    private String postedBy = "";
    private String collegeName = "";
    private Date createdDate = null;
	private boolean isMonOrYear =false;
    
    public void activate() throws Exception {
        String articlePath = get("path", String.class);
        int noOfArticles = Integer.parseInt(get("noOfArticles", String.class));
        String isArticlePage = get("isArticlePage", String.class);
        String listType = get("listType", String.class);
        
        int count = 0;
        Resource resource = getResourceResolver().getResource(articlePath);
        if(resource != null) {
            log.info("Article-List is not null"+articlePath);
            Page articlesHomePage = getPageManager().getPage(articlePath);
            if(null != articlesHomePage){
                log.info("Article home page :: "+articlesHomePage.getPageTitle());
                if(null != isArticlePage && isArticlePage.equalsIgnoreCase("true")) {
                    log.info("Article-List page is true");
                    String singleArtNode = "";
                    isMonOrYear =false;
                    singleArtNode = getPropNode(articlesHomePage);
                    log.info("CHILD isMonOrYearPage single page ==>" + isMonOrYear);
                    ValueMap propertiesMap = articlesHomePage.getProperties(singleArtNode);
                    createdDate = getCreatedDate(articlesHomePage);
                    log.info("Single JCR:CREATED date ==>"+createdDate);
					if (!isMonOrYear) {
						if (null != propertiesMap && propertiesMap.size() > 0) {
							if (null != (articlesHomePage.getProperties().get("articlePageType", String.class))
									&& (articlesHomePage.getProperties().get("articlePageType", String.class))
											.equals("profile")) {
								log.info("Article-List in Current Page in Profile");
								articleTitle = propertiesMap.get("profileTitle", String.class);
								imagePath = propertiesMap.get("fileReference", String.class);
								collegeName = propertiesMap.get("collegeName", String.class);
								url = articlesHomePage.getPath() + ".html";

								articleList.add(new Article(imagePath, articleTitle, url, collegeName, "", ""));

							} else if (null != (articlesHomePage.getProperties().get("articlePageType",
									String.class))) {
								log.info("Article-List in Current Page in ELSE");
								articleTitle = articlesHomePage.getTitle();
								url = articlesHomePage.getPath() + ".html";
								dateVal = "";
								if (null != propertiesMap.get("publishDate", String.class)) {

									dateVal = propertiesMap.get("publishDate", String.class);
								}
								postedBy = "";
								if (null != propertiesMap.get("publishDate", String.class)) {

									postedBy = propertiesMap.get("postedBy", "");
								}

								if (!postedBy.equals("")) {
									postedBy = propertiesMap.get("byOption", "") + ": " + postedBy;
								}

								articleList.add(new Article(imagePath, articleTitle, url, desc, postedBy, dateVal));

							}
						}
					}
                } else {

                	 TreeMap<Date, ArticleUtils.Article> tMap = new TreeMap<Date,ArticleUtils.Article>();
                     TreeMap<Date, ArticleUtils.Article> finalTMap = new TreeMap<Date, ArticleUtils.Article>(Collections.reverseOrder());

                    ValueMap propertiesMap = null;
                    // Current Page 
                    String propNode = "";
                    isMonOrYear =false;
                    propNode = getPropNode(articlesHomePage);	
                    log.info("CHILD isMonOrYearPage parent page ==>" + isMonOrYear);
                    if(!isMonOrYear){
                    log.info("Article-List in Current Page propNode "+propNode);
                    propertiesMap = articlesHomePage.getProperties(propNode);
                    log.info("Article-List in Current Page in propertiesMap SIZE "+propertiesMap.size());
                    if(null != propertiesMap && propertiesMap.size() > 0){
                    	
                    	createdDate = getCreatedDate(articlesHomePage);
                    	log.info("parent JCR:CREATED date ==>"+createdDate);
                        log.info("Article-List in Current Page in propertiesMap is not null");
                        if (null !=(articlesHomePage.getProperties().get("articlePageType", String.class)) && (articlesHomePage.getProperties().get("articlePageType", String.class)).equals("profile")) {
                            log.info("Article-List in Current Page in Profile");
                            articleTitle = propertiesMap.get("profileTitle", String.class);
                            imagePath = propertiesMap.get("fileReference", String.class);
                            collegeName = propertiesMap.get("collegeName", String.class);
                            url = articlesHomePage.getPath()+".html";
                            
                           // articleList.add(new Article(imagePath, articleTitle, url, collegeName, "", ""));
                            if (null != createdDate) {
                            	tMap.put(createdDate, new Article(imagePath, articleTitle, url, collegeName, "", ""));
                            }
                            
                            count++;
                            
                        } else if(null !=(articlesHomePage.getProperties().get("articlePageType", String.class))){
                            log.info("Article-List in Current Page in ELSE");
                            articleTitle = articlesHomePage.getTitle();
                            url = articlesHomePage.getPath()+".html";
                            dateVal = "";
                            if(null != propertiesMap.get("publishDate", String.class)){
                                
                                dateVal = propertiesMap.get("publishDate", String.class);
                            }
                            postedBy = "";
                            if(null != propertiesMap.get("publishDate", String.class)){
                                
                            	postedBy = propertiesMap.get("postedBy", "");
                            }
                            
                            if(!postedBy.equals("")) {
                                postedBy = propertiesMap.get("byOption", "") + ": " + postedBy;
                            }
                            
                           // articleList.add(new Article(imagePath, articleTitle, url, desc, postedBy, dateVal));
                            if (null != createdDate) {
                            	tMap.put(createdDate, new Article(imagePath, articleTitle, url, desc, postedBy, dateVal));
                            }
                            count++;
                            
                        }
                        
                        log.info("Article-List in Current Page in ELSE-->"+articleList.size()+"---noOfArticles---"+noOfArticles);
                       /* if(count == noOfArticles){
                            return;
                        }*/
                        
                    }
                    }
                    //Child of Current path
                    Iterator<Page> pageItr = articlesHomePage.listChildren(new PageFilter(getRequest()), true);
                    while (pageItr.hasNext()) {
                        Page articlePage = pageItr.next();
                        isMonOrYear = false;
                        String heroNode = "";                    
                        heroNode = getPropNode(articlePage);
                        //log.info("CHILD isMonOrYearPage flag ==>" + isMonOrYear);
						if (!isMonOrYear) {
							Date createDate = getCreatedDate(articlePage);
							//log.info("CHILD JCR:CREATED date ==>" + createDate);
							propertiesMap = articlePage.getProperties(heroNode);
							if (null != propertiesMap && propertiesMap.size() > 0) {
								if (null != (articlePage.getProperties().get("articlePageType", String.class))
										&& (articlePage.getProperties().get("articlePageType", String.class))
												.equals("profile")) {
									log.info("Article-List in Current Page in Profile");
									articleTitle = propertiesMap.get("profileTitle", String.class);
									imagePath = propertiesMap.get("fileReference", String.class);
									String collegeName = propertiesMap.get("collegeName", String.class);
									url = articlePage.getPath() + ".html";

									// articleList.add(new Article(imagePath,
									// articleTitle, url, collegeName, "", ""));
									if (null != createDate) {
										tMap.put(createDate,
												new Article(imagePath, articleTitle, url, desc, postedBy, dateVal));
									}

									count++;
									/*
									 * if(count == noOfArticles){ return; }
									 */

								} else if (null != (articlePage.getProperties().get("articlePageType", String.class))) {
									log.info("Article-List in Current Page in else");
									articleTitle = articlePage.getTitle();
									url = articlePage.getPath() + ".html";
									dateVal = "";
									if (null != propertiesMap.get("publishDate", String.class)) {

										dateVal = propertiesMap.get("publishDate", String.class);
									}
									postedBy = "";
									if (null != propertiesMap.get("publishDate", String.class)) {

										postedBy = propertiesMap.get("postedBy", "");
									}

									if (!postedBy.equals("")) {
										postedBy = propertiesMap.get("byOption", "") + ": " + postedBy;
									}

									// articleList.add(new Article(imagePath,
									// articleTitle, url, desc, postedBy,
									// dateVal));
									if (null != createDate) {
										tMap.put(createDate,
												new Article(imagePath, articleTitle, url, desc, postedBy, dateVal));
									}

									count++;
									/*
									 * if(count == noOfArticles){ return; }
									 */
								}
							}
						}
                    } 

                    if(null != tMap && tMap.size() >0 ){
                    	finalTMap.putAll(tMap);
                        
                        Set set = finalTMap.entrySet();
            			Iterator iterator = set.iterator();
            			int countCheck = 0;
            			while (iterator.hasNext()) {
            				Map.Entry mentry = (Map.Entry) iterator.next();
            				if (countCheck < noOfArticles) {
            					//jsonArray.put(mentry.getValue());
            					articleList.add((ArticleUtils.Article)mentry.getValue());
            					countCheck++;
            					//log.info("===========>> & countCheck is: "+ countCheck+ "mentry.getKey() "+mentry.getKey());
            				}
            			}

                    }
                    
                    //log.info("Article-List in Current Page child loop ends "+articleList.size());
                }
                
            }
        }   
        log.info("Article-List activate ENDS" );		
    }
    
    public String getPropNode (Page articlesHomePage){
        String propNode = "contentParsys/hero";
        boolean heroFound = false;
        String heroName = "";
        Node articlesHomePageNode = articlesHomePage.adaptTo(Node.class);
        try{
            if(null != articlesHomePageNode.getNode("jcr:content/contentParsys")){
                Node contentNode = articlesHomePageNode.getNode("jcr:content/contentParsys"); 
                NodeIterator childNodeIterator = contentNode.getNodes();
                
                log.info("childNodeIterator Size"+childNodeIterator.getSize());
                //log.info("CHILD isMonOrYearPage Method before ==>" + isMonOrYear);
                if(childNodeIterator.getSize() == 1){
                	isMonOrYear = true;
                	//log.info("CHILD isMonOrYearPage Method after ==>" + isMonOrYear);
                }else{
                	while(childNodeIterator.hasNext()){
                        heroName = childNodeIterator.nextNode().getName().toString();
                        if(heroName.indexOf("hero") > -1){
                            propNode = "contentParsys/"+heroName;
                            //log.info("childNodeIterator propNode "+propNode);
                        }           
                        
                    }
                }
            }
        }
        catch (Exception ex){
            log.info("articlesHomePage no contentParsys"+articlesHomePage.getPath());
        }
        
        return propNode;
    }
    
    public Date getCreatedDate (Page articlesHomePage){
    	Date createdDate = null;
        Node articlesHomePageNode = articlesHomePage.adaptTo(Node.class);
        try{
        	SimpleDateFormat formatter = new SimpleDateFormat("yyy-MM-dd'T'HH:mm:ss.SSSX");
          
            if (articlesHomePageNode.hasProperty("jcr:created")) {
				if (!articlesHomePageNode.getProperty("jcr:created").isMultiple()) {
					//log.info("===========>> created is not Multiple  :: {}",
							//articlesHomePageNode.getProperty("jcr:created").getValue());
					try {
						String dateStr = articlesHomePageNode.getProperty("jcr:created").getValue().toString();
						createdDate = formatter.parse(dateStr);
						//log.info("===========>> created date in string format:" + " " + formatter.parse(dateStr));
					} catch (ParseException ex) {
						log.info("===========>> Exception", ex);
					}
				}
			}
        }
        catch (Exception ex){
            log.info("Date JCR:Created Conversion -->"+articlesHomePage.getPath());
        }
        
        return createdDate;
    }
    
    
    public class Article {
        
        private String imagePath;
        private String title;
        private String url;
        private String desc;
        private String postedBy;
        private String dateVal;
        private String collegeName;
		
        public Article( String imagePath, String title, String url, String desc, String postedBy, String dateVal ) {
            this.imagePath = imagePath;
            this.title = title;
            this.url = url;
            this.desc = desc;
            this.postedBy = postedBy;
            this.dateVal = dateVal;
            this.collegeName = desc;
        }
        
        public String getImagePath() {
            String path = this.imagePath;
            return path;
        }
        public String getTitle() {
            String title = this.title;
            return title;
        }
        public String getUrl() {
            String url = this.url;
            return url;
        }
        public String getCollegeName() {
            String collegeName = this.desc;
            return collegeName;
        }
        public String getDesc() {
            String desc = this.desc;
            return desc;
        }
        public String getPostedBy() {
            String postedBy = this.postedBy;
            return postedBy;
        }
        public String getDateVal() {
            String dateVal = this.dateVal;               
            return dateVal;
        }              
    }
    
    public List < ArticleUtils.Article > getArticleList() {
        return articleList;
    }

}

