<%--

ITC POC Grid Base Component
  
--%><%@page import="com.day.cq.wcm.foundation.Paragraph,
                    com.day.cq.wcm.foundation.ParagraphSystem,
                    com.day.cq.wcm.api.components.IncludeOptions,
                    com.day.cq.commons.jcr.JcrConstants,
                    com.day.cq.wcm.api.WCMMode" %><%
%><%@include file="/libs/foundation/global.jsp" %><%
    
    ParagraphSystem parSys = ParagraphSystem.create(resource, slingRequest);
    String newType = resource.getResourceType() + "/new";
    
    for (Paragraph par: parSys.paragraphs()) {
        if (editContext != null) {
            editContext.setAttribute("currentResource", par);
        }
        
        %><sling:include resource="<%= par %>"/><%
    }
    
    
    if (editContext != null) {
        editContext.setAttribute("currentResource", null);
        %><cq:include path="*" resourceType="<%= newType %>"/><%
    }
%>