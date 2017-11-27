<%--

  UoPX Grid Base Component
  
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

			// right border dividers
			String[] rightBorderProps = {"xsRightBorder", "smallRightBorder", "medRightBorder", "largeRightBorder"};
			for (String prop : rightBorderProps) {
				if (node.hasProperty(prop) && node.getProperty(prop).getString().equals("true")) {
					IncludeOptions.getOptions(request, true).getCssClassNames().add(prop);
				}
			}
		}

		%><sling:include resource="<%= par %>"/><%      
	}

	if (editContext != null && columnCount < maxColumns ) {
		editContext.setAttribute("currentResource", null);
		IncludeOptions.getOptions(request, true).getCssClassNames().add("column");
		IncludeOptions.getOptions(request, true).getCssClassNames().add("col-lg-" + ( maxColumns - columnCount ) );
		%><cq:include path="*" resourceType="<%= newType %>"/><%
	}
%>