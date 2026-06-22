package ${shellPackage}.infra.in.ui;

import io.mateu.uidl.annotations.FavIcon;
import io.mateu.uidl.annotations.Logo;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.PageTitle;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
import io.mateu.uidl.data.RemoteMenu;
import io.mateu.uidl.StyleConstants;
<#if shell.designSystem?? && shell.designSystem?has_content>
import io.mateu.uidl.annotations.KeycloakSecured;
</#if>

@UI("")
@Title("${shell.title!shell.name}")
@PageTitle("${shell.title!shell.name}")
@FavIcon("/images/favicon.png")
@Logo("/images/logo.png")
@Style(StyleConstants.CONTAINER)
<#if shell.designSystem?? && shell.designSystem?has_content>
@KeycloakSecured(url = "${r"${KEYCLOAK_URL:http://localhost:8080/auth}"}", realm = "${r"${KEYCLOAK_REALM:master}"}", clientId = "${r"${KEYCLOAK_CLIENT_ID:shell}"}")
</#if>
public class ${shellClassName}Home {

<#if resolvedServices?has_content>
<#list resolvedServices as svc>
    @Menu
    RemoteMenu ${svc.name?lower_case?replace("[^a-z0-9]","_",'r')} = new RemoteMenu("/_${svc.name?lower_case?replace("[^a-z0-9]","-",'r')}").withLabel("${svc.name}");

</#list>
<#else>
    // TODO: add RemoteMenu fields for each service
    // @Menu
    // RemoteMenu myService = new RemoteMenu("/_my-service").withLabel("My Service");
</#if>
}
