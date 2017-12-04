package com.adobe.itc.poc.core.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;

public class MainTopNavigation extends WCMUsePojo {

	private static Logger logger = LoggerFactory.getLogger(MainTopNavigation.class);

	public List<MainTopNavigationConfig> mainTopNavigationConfigList = new ArrayList<MainTopNavigationConfig>();
	public String[] mwConfig;
	public String[] mainNavConfig;
	public boolean multiFiledEmpty = false;
	public boolean getWcmModeEdit = false;
	public boolean getWcmModeDesign = false;
	public String itemHasDropdownArray;

	private List<Map<String, String>> navBarConfigList = new ArrayList();
	public String[] currentNode;

	@Override
	public void activate() throws Exception {
		// mwGlobalConfig = getCurrentStyle().get("globalModalWindowConfig",
		// String[].class);
		Resource res = this.getResourceResolver().getResource("/etc/designs/itc-poc/jcr:content/page/topnav");
		mainNavConfig = res.adaptTo(ValueMap.class).get("mainNavConfig", String[].class);

		logger.info("testing mw11--->" + mainNavConfig);
		if (mainNavConfig != null) {
			try {
				logger.info("MainTopNavigation starts here ");
				if (mainTopNavigationConfigList.isEmpty()) {
					JSONObject jsonObj = null;
					for (int i = 0; i < mainNavConfig.length; i++) {
						jsonObj = new JSONObject(mainNavConfig[i]);
						logger.info("mainMenu " + jsonObj.getString("mainMenu"));
						logger.info("itemHasDropdown " + jsonObj.getString("itemHasDropdown"));
						logger.info("subMenuList " + jsonObj.getString("subMenuList"));
						logger.info("mainMenuURL " + jsonObj.getString("mainMenuURL"));
						if(jsonObj.getJSONArray("itemHasDropdown").length() > 0){
						itemHasDropdownArray = jsonObj.getJSONArray("itemHasDropdown").getString(0);
						}else{
							itemHasDropdownArray="false";
						}						
						logger.info("itemHasDropdownArray " + itemHasDropdownArray);
						mainTopNavigationConfigList.add(new MainTopNavigationConfig(jsonObj.getString("mainMenu"),
								itemHasDropdownArray, jsonObj.getString("subMenuList"),
								jsonObj.getString("mainMenuURL")));
					}

				}

			

			} catch (Exception e) {
				logger.info(e.getMessage());

			} finally {
				logger.info("logger FInally here ");
			}
		} else {
			multiFiledEmpty = true;
		}

	}

	public class MainTopNavigationConfig {
		private String mainMenu;
		private String itemHasDropdown;
		private String subMenuList;
		private String mainMenuURL;

		public MainTopNavigationConfig(String mainMenu, String itemHasDropdown, String subMenuList,
				String mainMenuURL) {
			this.mainMenu = mainMenu;
			this.itemHasDropdown = itemHasDropdown;
			this.subMenuList = subMenuList;
			this.mainMenuURL = mainMenuURL;

		}

		public String getMainMenu() {
			return mainMenu;
		}

		public void setMainMenu(String mainMenu) {
			this.mainMenu = mainMenu;
		}

		public String getItemHasDropdown() {
			return itemHasDropdown;
		}

		public void setItemHasDropdown(String itemHasDropdown) {
			this.itemHasDropdown = itemHasDropdown;
		}

		public String getSubMenuList() {
			return subMenuList;
		}

		public void setSubMenuList(String subMenuList) {
			this.subMenuList = subMenuList;
		}

		public String getMainMenuURL() {
			return mainMenuURL;
		}

		public void setMainMenuURL(String mainMenuURL) {
			this.mainMenuURL = mainMenuURL;
		}
	}
}

