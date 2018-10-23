package com.adobe.itc.poc.core.servlets;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.Session;
import javax.mail.internet.InternetAddress;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.mail.ByteArrayDataSource;
import org.apache.commons.mail.HtmlEmail;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;

@SuppressWarnings({ "serial" })
@Component(metatype = false)
@SlingServlet(name = "EmailServlet", description = "EmailServlet", methods = "POST", generateComponent =false, paths = "/services/EmailServlet")
@Service(Servlet.class)
public class EmailServlet extends SlingAllMethodsServlet {

       private static final Logger LOG = LoggerFactory.getLogger(EmailServlet.class);

       @Reference
       private MessageGatewayService messageGatewayService;
       @Reference
       public SlingRepository repository;

       @Override
       protected void doGet(SlingHttpServletRequest request,
                     SlingHttpServletResponse response) throws ServletException,
                     IOException {
              doPost(request, response);
       }
    
       @Override
       protected void doPost(SlingHttpServletRequest request,
                     SlingHttpServletResponse response) throws ServletException,
                     IOException {
              String results = sendEmail(request);
              if (results != null && results.equalsIgnoreCase("success")) {
                     response.getWriter().write("success");
              } else {
                     response.getWriter().write("fail");
              }           
       }   

       public String sendEmail(SlingHttpServletRequest request) {

              ArrayList<InternetAddress> emailRecipients = new ArrayList<InternetAddress>();
              Session session = null;
              String results = "Success";
 
              String fromAddress=request.getParameter("fromAddress");
              String toAddress=request.getParameter("toAddress");
            
              String firstName=request.getParameter("firstName");
              String lastName=request.getParameter("lastName");
              String subject=request.getParameter("subject");
              String templateLink=request.getParameter("templateLink");
              String isAttachmentRequired=request.getParameter("isAttachmentReq");
              String attachmentType=request.getParameter("attachmenttype");
              String attachmentPath=request.getParameter("attachmentpath");
              attachmentPath=attachmentPath + "/jcr:content/renditions/original";
              
            
              try {
                     session = repository.loginAdministrative(null);
                     String templateReference = templateLink.substring(1)+ "/jcr:content";

                     Node root = session.getRootNode();
                     Node jcrContent = root.getNode(templateReference);
                     InputStream is = jcrContent.getProperty("jcr:data").getBinary().getStream();

                     BufferedInputStream bis = new BufferedInputStream(is);
                     ByteArrayOutputStream buf = new ByteArrayOutputStream();
                     int resultNumber = bis.read();
                     while (resultNumber != -1) {
                           byte b = (byte) resultNumber;
                           buf.write(b);
                           resultNumber = bis.read();
                     }
                     
                     
                     String bufString = buf.toString();
                     LOG.info("template.."+bufString);
                     bufString = bufString.replace("${firstName}", firstName);
                     bufString = bufString.replace("${lastName}", lastName);
                     LOG.info("mesage.."+bufString);
                     HtmlEmail email = new HtmlEmail();
                  
                     emailRecipients.add(new InternetAddress(toAddress));
                     email.setCharset("UTF-8");
                     email.setFrom(fromAddress);
                     email.setTo(emailRecipients);
                     email.setSubject(subject);
                     
                     ByteArrayDataSource imageDS = null;
                     if(isAttachmentRequired.equalsIgnoreCase("true"))
                     {
	                     Resource imageNodeRes = request.getResourceResolver().getResource(attachmentPath);
	                     Node imageNode=imageNodeRes.adaptTo(Node.class);
	                     Node contentNode = imageNode.getNode("jcr:content");
	                     Binary imageBinary = contentNode.getProperty("jcr:data").getBinary();
	                     InputStream imageStream = imageBinary.getStream();
	                     imageDS = new ByteArrayDataSource(imageStream,attachmentType);
	                     email.attach(imageDS,"ITP-POC","This is Test mail Attachment");
                     }
                     
                     
                     email.setHtmlMsg(bufString);
                     MessageGateway<HtmlEmail> messageGateway = this.messageGatewayService.getGateway(HtmlEmail.class);
                     messageGateway.send(email);
                     emailRecipients.clear();                     
                  
              } catch (Exception e) {
                     results = "fail";
                     LOG.info("e.getMessage"+e.getMessage());
                     e.printStackTrace();
              } finally {
                     if(session != null) {
                           session.logout();
                     }
              }
              return results;
       }
}