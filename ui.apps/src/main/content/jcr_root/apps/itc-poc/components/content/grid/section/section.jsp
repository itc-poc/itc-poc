<%--

  ITC-POC Grid Base Component
  
--%><%@page import="com.day.cq.wcm.foundation.Paragraph,
										com.day.cq.wcm.foundation.ParagraphSystem,
										com.day.cq.wcm.api.components.IncludeOptions,
										com.day.cq.commons.jcr.JcrConstants,
										com.day.cq.wcm.api.WCMMode" %><%
%><%@include file="/libs/foundation/global.jsp" %><%

	ParagraphSystem parSys = ParagraphSystem.create(resource, slingRequest);
	String newType = "/apps/itc-poc/components/content/grid/row/new";
	int columnCount = 0;
	int maxColumns = 12;

	int xsColumns = 0;
	int smColumns = 0;
	int mdColumns = 0;

	String xsOffsetColumns = "na";
	String smOffsetColumns = "na";
	String mdOffsetColumns = "na";
	String lgOffsetColumns = "na";
	int lgOffsetColumnsInt = 0;

	
	Node parent = resource.adaptTo( Node.class ).getParent();
	int safety = 100;

	while( parent != null ){
		if( safety > 0 ){
			safety--;
		}else{
			break;
		}

		if( parent.getName().indexOf( "column" ) > -1 ){
			if( parent.hasProperty("lgNumCols") ){
				int parentCols = Integer.parseInt( parent.getProperty("lgNumCols").getString() );
				maxColumns = parentCols;
			}
			break;
		}else if( parent.getName().indexOf( "gridContainer" ) > -1 ){
			break;
		}else{
			try{
				parent = parent.getParent();
			}catch( Throwable e ){
				break;
			}
		}
	}

	%>

	<c:choose>
		<%-- institution palette --%>
		<c:when test="${properties['bgColor']=='990000'}">
			<c:set var="bgColor">bg-color-brand-red</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='666666'}">
			<c:set var="bgColor">bg-color-brand-coolgray</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='CBC3B7'}">
			<c:set var="bgColor">bg-color-brand-gray</c:set>
		</c:when>
		<%-- learning experience palette --%>
		<c:when test="${properties['bgColor']=='FF6600'}">
			<c:set var="bgColor">bg-color-brand-orange</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='D7234A'}">
			<c:set var="bgColor">bg-color-brand-pink</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='851782'}">
			<c:set var="bgColor">bg-color-brand-purple</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='0099CC'}">
			<c:set var="bgColor">bg-color-brand-blue</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='A3DBE8'}">
			<c:set var="bgColor">bg-color-brand-lightblue</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='4FAC1C'}">
			<c:set var="bgColor">bg-color-brand-green</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='B7CD00'}">
			<c:set var="bgColor">bg-color-brand-lightgreen</c:set>
		</c:when>
		<%-- tertiary palette --%>
		<c:when test="${properties['bgColor']=='8B4E21'}">
			<c:set var="bgColor">bg-color-brand-altorange</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='A50052'}">
			<c:set var="bgColor">bg-color-brand-altpink</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='4A0259'}">
			<c:set var="bgColor">bg-color-brand-altpurple</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='006697'}">
			<c:set var="bgColor">bg-color-brand-altblue</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='36849F'}">
			<c:set var="bgColor">bg-color-brand-altlightblue</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='464B18'}">
			<c:set var="bgColor">bg-color-brand-altgreen</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='8D8035'}">
			<c:set var="bgColor">bg-color-brand-altlightgreen</c:set>
		</c:when>
		<%-- neutral palette --%>
		<c:when test="${properties['bgColor']=='FFB119'}">
			<c:set var="bgColor">bg-color-brand-darkyellow</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='D5D6D2'}">
			<c:set var="bgColor">bg-color-brand-coolgray2</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='D3DEE4'}">
			<c:set var="bgColor">bg-color-brand-skyblue</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='D1DFD6'}">
			<c:set var="bgColor">bg-color-brand-mintgreen</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='D7D3C7'}">
			<c:set var="bgColor">bg-color-brand-khaki</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='F1F5F3'}">
			<c:set var="bgColor">bg-color-greygreen</c:set>
		</c:when>
		<c:when test="${properties['bgColor']=='FFFFFF'}">
			<c:set var="bgColor">bg-color-white</c:set>
		</c:when>
        <c:when test="${properties['bgColor']=='EFEFEF'}">
			<c:set var="bgColor">bg-color-White-Smoke</c:set>
		</c:when>
		<c:otherwise>
			<c:set var="bgColor"></c:set>
                <c:set var="bgHexColor">${properties['bgColor']}</c:set>
		</c:otherwise>
	</c:choose>

	<c:choose>
		<%-- institution palette --%>

		<c:when test="${properties['borderColor']=='A3DBE8'}">
			<c:set var="borderColor">brd-color-brand-lightblue</c:set>
		</c:when>
		<c:when test="${properties['borderColor']=='B7CD00'}">
			<c:set var="borderColor">brd-color-brand-lightgreen</c:set>
		</c:when>
		
		<%-- neutral palette --%>

		<c:when test="${properties['borderColor']=='D5D6D2'}">
			<c:set var="borderColor">brd-color-brand-coolgray2</c:set>
		</c:when>
		<c:when test="${properties['borderColor']=='D3DEE4'}">
			<c:set var="borderColor">brd-color-brand-skyblue</c:set>
		</c:when>
		<c:when test="${properties['borderColor']=='D1DFD6'}">
			<c:set var="borderColor">brd-color-brand-mintgreen</c:set>
		</c:when>
		<c:when test="${properties['borderColor']=='D7D3C7'}">
			<c:set var="borderColor">brd-color-brand-khaki</c:set>
		</c:when>
		<c:when test="${properties['borderColor']=='000000'}">
			<c:set var="borderColor">brd-color-black</c:set>
		</c:when>
		<c:when test="${properties['borderColor']=='FFFFFF'}">
			<c:set var="borderColor">brd-color-white</c:set>
		</c:when>
		<c:otherwise>
			<c:set var="borderColor"></c:set>
		</c:otherwise>
	</c:choose>

	<c:if test="${properties['hideBorder']=='true'}">
    <c:set var="bgBorder" value="no-border" />
	</c:if>
   <c:if test="${properties['noPadding']=='true'}">
    <c:set var="noPadding" value="no-padding" />
	</c:if>


   	<c:if test="${properties['imageReference'] != null}">
    	<c:set var="imageReferencePath" value="${properties['imageReference']}" />
	</c:if>
    <c:if test="${properties['imageReferenceMD'] != null}">
    	<c:set var="imageReferenceMDPath" value="${properties['imageReferenceMD']}" />
	</c:if>
    <c:if test="${properties['imageReferenceSM'] != null}">
    	<c:set var="imageReferenceSMPath" value="${properties['imageReferenceSM']}" />
	</c:if>
    <c:if test="${properties['imageReferenceXS'] != null}">
    	<c:set var="imageReferenceXSPath" value="${properties['imageReferenceXS']}" />
	</c:if>

	<c:set var="isBigDesktopImage" value="${!properties['isBigDesktopImage']}" />
    <c:set var="isDesktopImage" value="${!properties['isDesktopImage']}" />
    <c:set var="isTabletImage" value="${!properties['isTabletImage']}" />
    <c:set var="isMobileImage" value="${!properties['isMobileImage']}" />


    <c:if test="${imageReferenceMDPath == null || imageReferenceMDPath==''}">
    	<c:set var="imageReferenceMDPath" value="${imageReferencePath}" />
	</c:if> 
    <c:if test="${imageReferenceSMPath == null || imageReferenceSMPath==''}">
    	<c:set var="imageReferenceSMPath" value="${imageReferenceMDPath}" />
	</c:if>
	<c:if test="${imageReferenceXSPath == null || imageReferenceXSPath==''}">
    	<c:set var="imageReferenceXSPath" value="${imageReferenceSMPath}" />
	</c:if>

    	<c:if test="${properties['opacity'] != null}" >
        	<c:set var="opacity" value="${properties['opacity']}" />

        </c:if>

    <c:if test="${properties.sectionTitleMinHeight != null}">
        <c:set var="sectionTitleMinHeight" value="${properties['sectionTitleMinHeight']}px" />
    </c:if>


	<c:if test="${properties['imageReference'] != null}">
        <c:set var="lazyStyles">lazy-loaders lazy-bgs</c:set>
        <c:set var="bgLogoImage">
            data-style="background-image:url(${imageReferencePath}); background-repeat: no-repeat; background-size: cover; min-height:${sectionTitleMinHeight};"
            data-imageReferenceMDPath="${imageReferenceMDPath}"
            data-imageReferenceSMPath="${imageReferenceSMPath}"
            data-imageReferenceXSPath="${imageReferenceXSPath}"
            data-isBigDesktopImage="${isBigDesktopImage}"
            data-isDesktopImage="${isDesktopImage}"
            data-isTabletImage="${isTabletImage}"
            data-isMobileImage="${isMobileImage}"
        </c:set>
	</c:if>

	<c:if test="${properties['bgLogoPosition']=='true'}">
    <c:set var="bgLogoPosition" value="no-border" />
	</c:if>

	<c:choose>
		<c:when test="${properties['bgLogoPosition']!=''}">
			<c:set var="bgLogoPosition">${properties['bgLogoPosition']}</c:set>
		</c:when>
		<c:otherwise>
			<c:set var="bgLogoPosition"></c:set>
		</c:otherwise>
	</c:choose>

	<c:choose>
		<c:when test="${properties['mainSectionHeadingSize'] == 'heading-1'}">
			<c:set var="mainSectionHeadingSize" value="heading-1" />
		</c:when>
		<c:otherwise>
			<c:set var="mainSectionHeadingSize" value="heading-2" />
		</c:otherwise>
	</c:choose>

	<c:if test="${properties['scrollAnchor'] == 'true'}">
		<c:set var="scrollAnchor">id="scrollAnchor"</c:set>
	</c:if>

	<c:if test="${properties['xsRowMaxWidth'] != ''}">
		<c:set var="xsRowMaxWidth">${properties['xsRowMaxWidth']}</c:set>
	</c:if>

	<c:if test="${properties['smRowMaxWidth'] != ''}">
		<c:set var="smRowMaxWidth">${properties['smRowMaxWidth']}</c:set>
	</c:if>

	<c:if test="${properties['mdRowMaxWidth'] != ''}">
		<c:set var="mdRowMaxWidth">${properties['mdRowMaxWidth']}</c:set>
	</c:if>

	<c:if test="${properties['lgRowMaxWidth'] != ''}">
		<c:set var="lgRowMaxWidth">${properties['lgRowMaxWidth']}</c:set>
	</c:if>

<%

				String bgHexColor=properties.get("bgColor","FFFFFF");

				String opacity1=properties.get("opacity","100");
                if((opacity1!=null && opacity1!="") || (bgHexColor!="" && bgHexColor!=null)){
                    int divValue = 100;
                    float opacity = ((float)Integer.valueOf(opacity1))/divValue;
                    Integer r = Integer.valueOf( bgHexColor.substring( 0, bgHexColor.length()/3 ), 16 );
                    Integer g =  Integer.valueOf( bgHexColor.substring( bgHexColor.length()/3, 2*bgHexColor.length()/3 ), 16 );
                    Integer b =  Integer.valueOf( bgHexColor.substring(2*bgHexColor.length()/3, 3*bgHexColor.length()
                                                                       /3 ), 16 ) ;
                    
                    bgHexColor= "rgba("+r+","+g+","+b+","+opacity+")";
                    // bgHexColor= "FFFFFF";
                    request.setAttribute("modifiedBgHexColor", bgHexColor);
                }


    %>
		
<c:choose>
        <c:when test="${properties['opacity'] != null}" >

            <div data-rgbacheck="${modifiedBgHexColor}" data-minheightcheck="${sectionTitleMinHeight}" data-sectionbgcolor="${bgHexColor}" ${scrollAnchor} class="section-styles dummyrgbaClass sectionImg ${bgColor} ${bgBorder} ${borderColor} ${noPadding} ${bgLogoPosition} ${lazyStyles} ${xsRowMaxWidth} ${smRowMaxWidth} ${mdRowMaxWidth} ${lgRowMaxWidth}" ${bgLogoImage}  style="background-color: ${modifiedBgHexColor}; min-height:${sectionTitleMinHeight}; " >

		</c:when>
		
		<c:otherwise>
        <div  data-rgbacheck="" data-minheightcheck="${sectionTitleMinHeight}" data-sectionbgcolor="${bgHexColor}" ${scrollAnchor} class="section-styles sectionImg ${bgColor} ${bgBorder} ${borderColor} ${noPadding} ${bgLogoPosition} ${lazyStyles} ${xsRowMaxWidth} ${smRowMaxWidth} ${mdRowMaxWidth} ${lgRowMaxWidth}" ${bgLogoImage} style="background-color: #${bgHexColor}; min-height:${sectionTitleMinHeight}; " >
         </c:otherwise>
		 
		</c:choose>
	<div data-sly-test="${properties['sectionTitle'] =='' || properties['sectionTitle'] == null}" data-sly-unwrap>
			<div data-sly-test.clsddHidden ="sectionTitleHidden" data-sly-unwrap></div>
	</div>

   <c:if test="${properties['sectionTitle']!=null && properties['sectionTitle']!=''}">
      <c:choose>
         <c:when test="${properties['mainSectionHeading'] == 'h1'}">
         <h1 class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</h1>
         </c:when>
         <c:when test="${properties['mainSectionHeading'] == 'h3'}"> 
         <h3 class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</h3>
         </c:when>
         <c:when test="${properties['mainSectionHeading'] == 'h4'}">
         <h4 class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</h4>
         </c:when>
         <c:when test="${properties['mainSectionHeading'] == 'h5'}">
         <h5 class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</h5>
         </c:when>
         <c:when test="${properties['mainSectionHeading'] == 'h6'}">
         <h6 class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</h6>
         </c:when>
         <c:when test="${properties['mainSectionHeading'] == 'p'}">  
         <p class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</p>
         </c:when>
         <c:otherwise>
         <h2 class="section-title col-xs-12 ${properties.sectionTitleColor} ${mainSectionHeadingSize} ${clsddHidden}" role="heading" tabindex="0">${properties['sectionTitle']}</h2>
         </c:otherwise>
      </c:choose>
   </c:if>
		<c:if test="${properties['sectionLeadCopy']!=null}">
	    <p class="section-lead-copy col-xs-12" tabindex="0">${properties['sectionLeadCopy']}</p>
		</c:if>

		<% 

				for (Paragraph par : parSys.paragraphs()) {
					if (editContext != null) {
						editContext.setAttribute("currentResource", par);
					}

					Node node = par.adaptTo(Node.class);
					if( node.getName().indexOf("column") > -1 ) {
						int lgNumCols;
						if( node.hasProperty( "lgNumCols" ) ){
							lgNumCols = Integer.parseInt( node.getProperty( "lgNumCols" ).getString() );
						}else{
							if( maxColumns - columnCount - 4 >= 0 || maxColumns - columnCount < 1 ){
								lgNumCols = 4;
							}else{
								lgNumCols = maxColumns - columnCount;
							}
						}

						// extra small columns
						if( node.hasProperty("xsNumCols") ){
							xsColumns = Integer.parseInt( node.getProperty("xsNumCols").getString() );
						}

						if( xsColumns != 0 ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-xs-" + xsColumns);
						}

						// extra small offset columns
						if( node.hasProperty("xsNumOffsetCols") ){
							xsOffsetColumns = node.getProperty("xsNumOffsetCols").getString();
						}

						if( xsOffsetColumns != "na" ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-xs-offset-" + xsOffsetColumns);
						}

						// small columns
						if( node.hasProperty("smallNumCols") ){
							smColumns = Integer.parseInt( node.getProperty("smallNumCols").getString() );
						}

						if( smColumns != 0 ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-sm-" + smColumns);
						}

						// small offset columns
						if( node.hasProperty("smallNumOffsetCols") ){
							smOffsetColumns = node.getProperty("smallNumOffsetCols").getString();
						}

						if( smOffsetColumns != "na" ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-sm-offset-" + smOffsetColumns);
						}

						// medium columns
						if( node.hasProperty("medNumCols") ){
							mdColumns = Integer.parseInt( node.getProperty("medNumCols").getString() );
						}

						if( mdColumns != 0 ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-md-" + mdColumns);
						}

						// medium offset columns
						if( node.hasProperty("medNumOffsetCols") ){
							mdOffsetColumns = node.getProperty("medNumOffsetCols").getString();
						}

						if( mdOffsetColumns != "na" ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-md-offset-" + mdOffsetColumns);
						}

						// large columns
						IncludeOptions.getOptions(request, true).getCssClassNames().add("col-lg-" + lgNumCols);

						// large offset columns
						if( node.hasProperty("lgNumOffsetCols") ){
							lgOffsetColumns = node.getProperty("lgNumOffsetCols").getString();
						}

						if( lgOffsetColumns != "na" ) {
							IncludeOptions.getOptions(request, true).getCssClassNames().add("col-lg-offset-" + lgOffsetColumns);
							lgOffsetColumnsInt = Integer.parseInt(lgOffsetColumns);
							columnCount += lgOffsetColumnsInt;
						}

						columnCount += lgNumCols;
					}

					%><sling:include resource="<%= par %>"/><%      
				}

				if (editContext != null && columnCount < maxColumns ) {
					editContext.setAttribute("currentResource", null);
					IncludeOptions.getOptions(request, true).getCssClassNames().add("column");
					IncludeOptions.getOptions(request, true).getCssClassNames().add("section-column");
					IncludeOptions.getOptions(request, true).getCssClassNames().add("col-lg-" + ( maxColumns - columnCount ) );
					%><cq:include path="*" resourceType="<%= newType %>"/><%
				}
			%>

</div>