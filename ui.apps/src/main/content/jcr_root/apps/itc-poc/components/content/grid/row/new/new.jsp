<%--
	Copyright 1997-2008 Day Management AG
	Barfuesserplatz 6, 4001 Basel, Switzerland
	All Rights Reserved.

	This software is the confidential and proprietary information of
	Day Management AG, ("Confidential Information"). You shall not
	disclose such Confidential Information and shall use it only in
	accordance with the terms of the license agreement you entered into
	with Day.

	==============================================================================

	Default parsys/new component

	This component does not provide any output and is used only for the "new"
	edit bar. It respects the "currentResource" edit context attribute that allows
	correct inserting components in the paragraph system.

--%><%@ page session="false" import="
	com.day.cq.wcm.api.components.EditContext,
	com.day.cq.wcm.api.components.ComponentContext,
	com.day.cq.wcm.api.components.Component,
	com.day.text.Text,
	org.apache.sling.api.resource.Resource,
	com.day.cq.wcm.commons.WCMUtils,
	
	com.day.cq.wcm.foundation.Paragraph,
	com.day.cq.wcm.foundation.ParagraphSystem,
	com.day.cq.commons.jcr.JcrConstants" %><%

%><%@include file="/libs/foundation/global.jsp" %><%

int columnCount = 12;

editContext = WCMUtils.getComponentContext(request).getEditContext();
if (editContext != null) {
	if (editContext.getParent() != null) {
		Resource curRes = (Resource) editContext.getParent().getAttribute("currentResource");
		if (curRes != null) {
				String prev = Text.getName(curRes.getPath());
				editContext.getEditConfig().setInsertBehavior("before " + prev);
		}

		ComponentContext parCtx = editContext.getParent().getComponentContext();
		if( parCtx != null ){
			Resource currentResource = (Resource) parCtx.getResource();
			if( currentResource != null ){
				Node parent = currentResource.adaptTo( Node.class ).getParent();
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
							columnCount = parentCols;
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

				ParagraphSystem parSys = ParagraphSystem.create( currentResource, slingRequest );
				
				for (Paragraph par : parSys.paragraphs()) {                       
					Node node = par.adaptTo(Node.class);
					if( node.getName().indexOf("column") > -1 ) {
						String lgNumCols = node.hasProperty("lgNumCols") ? node.getProperty("lgNumCols").getString(): "4";
						columnCount -= Integer.parseInt( lgNumCols );
					}
				}
			}
		}
	}
}

editContext.getEditConfig().setEmpty(true);
editContext.getEditConfig().setEmptyText( "Double-click here to add columns (" + columnCount + " columns left)" );
%>