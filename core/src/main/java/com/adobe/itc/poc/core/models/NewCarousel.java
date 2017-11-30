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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.wcm.foundation.Image;
import java.util.List;
import java.util.ArrayList;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import com.day.cq.wcm.api.WCMMode;
import java.util.Iterator;
import java.lang.Exception;

public class NewCarousel extends WCMUsePojo {

	private static Logger log = LoggerFactory.getLogger(NewCarousel.class);
	public List<NewCarousel.SlideShowImage> images = new ArrayList<NewCarousel.SlideShowImage>();
	boolean moreSlides = false;

	@Override
	public void activate() throws Exception {
		Resource resource = getResource();
		images = getImages(resource, "images");
	}

	public class SlideShowImage extends Image {
		int slideNumber;
		String title;
        String titleAlignment;
        String headingStyle;
		String desc;
        String thumbnailTitle;
		String btnLink;
		String btnText;
		String altText;
		String videoURL;
		String videoTitle;
		String videoCopy;
		String videoTranscript;
		String slideThumbnail;

		public int getSlideNumber() {
			return slideNumber;
		}

		public void setSlideNumber(int slideNumber) {
			this.slideNumber = slideNumber;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}
        public String getTitleAlignment() {
			return titleAlignment;
		}

		public void setTitleAlignment(String titleAlignment) {
			this.titleAlignment = titleAlignment;
		}
        public String getHeadingStyle() {
			return headingStyle;
		}

		public void setHeadingStyle(String headingStyle) {
			this.headingStyle = headingStyle;
		}
        public String getThumbnailTitle() {
			return thumbnailTitle;
		}

		public void setThumbnailTitle(String thumbnailTitle) {
			this.thumbnailTitle = thumbnailTitle;
		}

		public String getDesc() {
			return desc;
		}

		public void setDesc(String desc) {
			this.desc = desc;
		}

		public String getBtnText() {
			return btnText;
		}

		public void setBtnText(String btnText) {
			this.btnText = btnText;
		}

		public String getBtnLink() {
			return btnLink;
		}

		public void setBtnLink(String btnLink) {
			this.btnLink = btnLink;
		}

		public String getAltText() {
			return altText;
		}

		public void setAltText(String altText) {
			this.altText = altText;
		}
		
		public String getSlideThumbnail() {
			return slideThumbnail;
		}

		public void setSlideThumbnail(String slideThumbnail) {
			this.slideThumbnail = slideThumbnail;
		}
		public String getVideoURL() {
			return videoURL;
		}

		public void setVideoURL(String videoURL) {
			this.videoURL = videoURL;
		}

		public String getVideoTitle() {
			return videoTitle;
		}

		public void setVideoTitle(String videoTitle) {
			this.videoTitle = videoTitle;
		}

		public String getVideoCopy() {
			return videoCopy;
		}

		public void setVideoCopy(String videoCopy) {
			this.videoCopy = videoCopy;
		}

		public String getVideoTranscript() {
			return videoTranscript;
		}

		public void setVideoTranscript(String videoTranscript) {
			this.videoTranscript = videoTranscript;
		}

		public SlideShowImage(Resource resource) {
			super(resource);
		}
	}

	public boolean getMoreSlides() {
		moreSlides = images.size() > 1;
		return moreSlides;
	}

	public List<SlideShowImage> getImages(Resource resource, String name) {
		List<SlideShowImage> images = new ArrayList<SlideShowImage>();
		Resource imagesResource = resource.getChild(name);

		if (imagesResource == null) {
			return images;
		}

		ValueMap map = imagesResource.adaptTo(ValueMap.class);
		String order = map.get("order", String.class);

		if (order == null) {
			return images;
		}

		JSONArray array;
		ValueMap vMap;

		try {
			array = new JSONArray(order);
		} catch (JSONException e) {
			array = new JSONArray();
		}

		for (int i = 0; i < array.length(); i++) {
			String imageResourceName;

			try {
				imageResourceName = array.getString(i);
			} catch (JSONException e) {
				imageResourceName = null;
			}

			if (imageResourceName != null) {
				Resource imageResource = imagesResource.getChild(imageResourceName);

				if (imageResource != null) {
					Iterator childImagesItr = imageResource.listChildren();

					while (childImagesItr.hasNext()) {
						Resource childImage = (Resource) childImagesItr.next();
						SlideShowImage img = new SlideShowImage(childImage);
						img.setItemName(Image.PN_REFERENCE, "imageReference");
						img.setSelector("img");
						img.setAlt(childImage.getName());
						vMap = imageResource.adaptTo(ValueMap.class);
						img.setSlideNumber(i);
						img.setTitle(vMap.get("title", String.class));
                        img.setTitleAlignment(vMap.get("titleAlignment", String.class));
                        img.setHeadingStyle(vMap.get("headingStyle", String.class));
						img.setThumbnailTitle(vMap.get("thumbnailtitle", String.class));
						img.setDesc(vMap.get("desc", String.class));
						img.setBtnText(vMap.get("btnText", String.class));
						img.setBtnLink(vMap.get("btnLink", String.class));
						img.setAltText(vMap.get("altText", String.class));
						img.setSlideThumbnail(vMap.get("slideThumbnail", String.class));
						img.setVideoURL(vMap.get("videoURL", String.class));
						img.setVideoTitle(vMap.get("videoTitle", String.class));
						img.setVideoCopy(vMap.get("videoCopy", String.class));
						img.setVideoTranscript(vMap.get("videoTranscript", String.class));
						images.add(img);
					}
				}
			}
		}

		return images;
	}

}