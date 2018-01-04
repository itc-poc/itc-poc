package com.adobe.itc.poc.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;

/**
 * @author 22642
 *
 */
public class BreadCrumbComponent extends WCMUsePojo {

	private static Logger log = LoggerFactory
			.getLogger(BreadCrumbComponent.class);

	private String uri = "Hello";
	private List<Page> navList = new ArrayList();
	Map<String, String> userDefinedinks = new HashMap<String, String>();
	private String isLinkPathExists = "false";

	public void activate() throws Exception {
		this.uri = getRequest().getRequestURI();
		setBreadCrumbItems();
		setUserDefinedinks();
	}

	private void setBreadCrumbItems() {

		long level = 3L;
		long endLevel = 1L;
		int currentLevel = getCurrentPage().getDepth();

		while (level < currentLevel) {
			try {
				Page trailPage = getCurrentPage()
						.getAbsoluteParent((int) level);
				ValueMap props = trailPage.getProperties();
				String hideInNav = (String) props.get("hideInNav", "false");
				if ((trailPage == null) || (hideInNav.equals("true"))) {
					level += 1L;
				} else {
					this.navList.add(trailPage);
					level += 1L;
				}
			} catch (Exception e) {
				log.error("Exception happened here : "
						+ e.getLocalizedMessage());
			}
		}
	}
/**
 * Provides proper path to a content path
 * @param path
 * @return
 */
	private String getCompleteUrl(String path) {
		String completePath = "";
		if (path != null && !path.isEmpty()) {
			// added changes for external link
			if (path.contains(".html") || path.contains("www")
					|| path.contains("http:") || path.contains("https:")) {
				completePath = path;
			}

			else {
				if (path.contains("/content/itc-poc")) {
					completePath = path + ".html";
				} else {
					completePath = path;
				}
			}
		}

		if (path == null || path.isEmpty()) {
			completePath = "#";
		}
		return completePath;
	}

	/**
	 * Reads the authored values from multifield and sends to Sightly
	 * @throws RepositoryException
	 * @throws PathNotFoundException
	 */
	public void setUserDefinedinks() {
		try {
			Node contentNode = getResource().adaptTo(Node.class);
			if(contentNode.hasNode("linkList")){
				Node multifieldNode = contentNode.getNode("linkList");
				if (multifieldNode.hasProperty("linkPath")
						&& multifieldNode.hasProperty("linkText")) {
					isLinkPathExists = "true";
					Property pathProperty = multifieldNode.getProperty("linkPath");
					Property textProperty = multifieldNode.getProperty("linkText");
					if (textProperty.isMultiple() || pathProperty.isMultiple()) {
						log.info("########  ITS A MULTI VALUE PROP");
						Value[] linkPaths = pathProperty.getValues();
						Value[] linkTexts = textProperty.getValues();
						for (int i = 0; i < linkTexts.length; i++) {
							if (linkTexts[i] != null && linkPaths[i] != null) {
								String completeUrl = getCompleteUrl(linkPaths[i]
										.toString());
									userDefinedinks.put(linkTexts[i].toString(),
											completeUrl);
									log.info(" linkText : " + linkTexts[i]
											+ "  : Link path: " + completeUrl);
							}

						}
					} else {
						Value linkPath = pathProperty.getValue();
						Value linkText = textProperty.getValue();
						String completeUrl = getCompleteUrl(linkPath
								.toString());
						userDefinedinks.put(linkText.toString(), completeUrl);
						log.info(" ITS A SINGLE VALUE PROP : " + linkText.toString()
								+ "  : Link path: " + completeUrl);
					}
				}
			}
			

			

		} catch (PathNotFoundException e) {
			log.error("PathNotFoundException occured : "
					+ e.getLocalizedMessage());
		} catch (RepositoryException e) {
			log.error("RepositoryException occured : "
					+ e.getLocalizedMessage());
		}
	}

	/**
	 * @return the navList
	 */
	public List<Page> getNavList() {
		return this.navList;
	}

	/**
	 * @return the uri
	 */
	public String getUri() {
		return uri;
	}

	/**
	 * @return the userDefinedinks
	 */
	public Map<String, String> getUserDefinedinks() {
		return userDefinedinks;
	}

	/**
	 * @return the isLinkPathExists
	 */
	public String getIsLinkPathExists() {
		return isLinkPathExists;
	}
}
