package com.adobe.itc.poc.core.models;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * @author 22642
 *
 */
public class ModalWindow extends WCMUse {
	private static Logger logger = LoggerFactory.getLogger(ModalWindow.class);
	public List<ModalWindowConfig> getModalWindowConfigList;
	public String[] mwConfig;
	public String[] mwGlobalConfig;
	public boolean multiFiledEmpty;
	public boolean getWcmModeEdit;
	public boolean getWcmModeDesign;
	public String componentShowHide;
	public String modalLinkText;
	public String backgroundColorMW;
	public String linkFontSize;
	public String circularCarousel;
	public String backgroundColorModalWindow;
	public String borderColorModalWindow;
	public String fontColorModalWindow;
	public String backgroundColorHoverModalWindow;
	public String borderColorHoverModalWindow;
	public String fontColorHoverModalWIndow;

	public ModalWindow() {
		this.getModalWindowConfigList = new ArrayList();

		this.multiFiledEmpty = false;
		this.getWcmModeEdit = false;
		this.getWcmModeDesign = false;
	}

	public void activate() throws Exception {
		Resource res = getResourceResolver().getResource(
				"/etc/designs/ac/jcr:content/modalwindowconfig");
		this.mwGlobalConfig = ((String[]) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("globalModalWindowConfig",
				String[].class));
		this.getWcmModeEdit = getWcmMode().isEdit();
		this.getWcmModeDesign = getWcmMode().isDesign();
		this.componentShowHide = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class))
				.get("componentShowHide", String.class));
		this.modalLinkText = ((String) ((ValueMap) res.adaptTo(ValueMap.class))
				.get("modalLinkText", String.class));
		this.backgroundColorMW = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class))
				.get("backgroundColorMW", String.class));
		this.linkFontSize = ((String) ((ValueMap) res.adaptTo(ValueMap.class))
				.get("linkFontSize", String.class));
		this.circularCarousel = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("circularCarousel", String.class));
		this.backgroundColorModalWindow = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("backgroundColorModalWindow",
				String.class));
		this.borderColorModalWindow = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("borderColorModalWindow",
				String.class));
		this.fontColorModalWindow = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("fontColorModalWindow",
				String.class));
		this.backgroundColorHoverModalWindow = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get(
				"backgroundColorHoverModalWindow", String.class));
		this.borderColorHoverModalWindow = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("borderColorHoverModalWindow",
				String.class));
		this.fontColorHoverModalWIndow = ((String) ((ValueMap) res
				.adaptTo(ValueMap.class)).get("fontColorHoverModalWIndow",
				String.class));

		this.mwConfig = ((String[]) getProperties().get("modalWindowConfig",
				String[].class));
		if (this.mwConfig == null) {
			this.mwConfig = this.mwGlobalConfig;
		}
		logger.info("testing mw11--->" + this.mwConfig);
		if (this.mwConfig != null) {
			try {
				logger.info("ModelWindow starts here ");
				if (this.getModalWindowConfigList.isEmpty()) {
					JSONObject jsonObj = null;
					for (int i = 0; i < this.mwConfig.length; i++) {
						jsonObj = new JSONObject(this.mwConfig[i]);
						logger.info("mwimagess " + jsonObj.getString("mwImage"));
						this.getModalWindowConfigList
								.add(new ModalWindowConfig(jsonObj
										.getString("mwImage"), jsonObj
										.getString("mwAltText"), jsonObj
										.getString("mwText"), jsonObj
										.getString("mwLink"), jsonObj
										.getString("mwLinkText")));
					}
				}
				logger.info("ModelWindow Ends here ");
			} catch (Exception e) {
				logger.info(e.getMessage());
			} finally {
				logger.info("logger FInally here ");
			}
		} else {
			this.multiFiledEmpty = true;
		}
	}

	public class ModalWindowConfig {
		private String imagePath;
		private String imageAltText;
		private String mwText;
		private String mwLink;
		private String mwLinkText;

		public ModalWindowConfig(String imagePath, String imageAltText,
				String mwText, String mwLink, String mwLinkText) {
			this.imagePath = imagePath;
			this.imageAltText = imageAltText;
			this.mwText = mwText;
			if (mwLink.contains("/content")) {
				this.mwLink = (mwLink + ".html");
			} else {
				this.mwLink = mwLink;
			}
			this.mwLinkText = mwLinkText;
		}

		public String getImagePath() {
			return this.imagePath;
		}

		public void setImagePath(String imagePath) {
			this.imagePath = imagePath;
		}

		public String getImageAltText() {
			return this.imageAltText;
		}

		public void setImageAltText(String imageAltText) {
			this.imageAltText = imageAltText;
		}

		public String getMwText() {
			return this.mwText;
		}

		public void setMwText(String mwText) {
			this.mwText = mwText;
		}

		public String getMwLink() {
			return this.mwLink;
		}

		public void setMwLink(String mwLink) {
			this.mwLink = mwLink;
		}

		public String getMwLinkText() {
			return this.mwLinkText;
		}

		public void setMwLinkText(String mwLinkText) {
			this.mwLinkText = mwLinkText;
		}
	}
}
