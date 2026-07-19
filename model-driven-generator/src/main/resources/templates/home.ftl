package ${project.packageName}.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
<#if idp??>
import io.mateu.uidl.annotations.KeycloakSecured;
import io.mateu.uidl.data.Anchor;
import io.mateu.uidl.data.Popover;
import io.mateu.uidl.data.Text;
import io.mateu.uidl.data.VerticalLayout;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.WidgetSupplier;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import static io.mateu.core.infra.JsonSerializer.fromJson;
</#if>
<#list menuModules as m>
import ${project.packageName}.${m.slug}.infra.in.ui.menu.${m.className};
</#list>
<#if uiPages?? && uiPages?has_content>
<#list uiPages as pg>
import ${project.packageName}.${pg.moduleSlug}.infra.in.ui.pages.${pg.pageSlug}.${pg.className};
</#list>
</#if>

<#if idp??>
<#-- keycloak.js login: adapter-less apps get a client named after the service (up.sh
     provisions it) -->
@KeycloakSecured(url = "${idp.url}", realm = "${idp.realm}", clientId = "${service.name?lower_case?replace("[^a-z0-9]","-",'r')}")
</#if>
<#if ui??>
<#assign uiPath = (ui.path?has_content)?then(ui.path, '')>
@UI(<#if ui.indexHtmlPath?has_content || ui.frontendComponentPath?has_content>value = "${uiPath}"<#if ui.indexHtmlPath?has_content>, indexHtmlPath = "${ui.indexHtmlPath}"</#if><#if ui.frontendComponentPath?has_content>, frontendComponentPath = "${ui.frontendComponentPath}"</#if><#else>"${uiPath}"</#if>)
@Title("${ui.name}")
<#else>
@UI("")
@Title("${service.name}")
</#if>
public class Home<#if idp??> implements WidgetSupplier</#if> {

<#list menuModules as m>
    @Menu
    ${m.className} ${m.field};
</#list>
<#if uiPages?? && uiPages?has_content>
<#list uiPages as pg>
    @Menu
    ${pg.className} ${pg.field};
</#list>
</#if>
<#if idp??>

    /** The user widget: who is logged in (from the keycloak JWT) and a way out. */
    @Override
    public List<Component> widgets(HttpRequest httpRequest) {
        List<Component> widgets = new ArrayList<>();
        var authorization = httpRequest.getHeaderValue("Authorization");
        if (authorization != null && authorization.startsWith("Bearer ")) {
            var token = authorization.substring("Bearer ".length());
            var payload = new String(Base64.getDecoder().decode(token.split("\\.")[1]));
            var values = fromJson(payload);
            var nombre = values.get("name") != null ? values.get("name") : values.get("preferred_username");
            var detalle = values.get("email") != null ? "Email: " + values.get("email") : "Usuario: " + nombre;
            widgets.add(Popover.builder()
                    .wrapped(Text.builder().text("Hola, " + nombre)
                            .style("margin-right: 20px;")
                            .build())
                    .content(VerticalLayout.builder().content(List.of(
                                    new Text(detalle),
                                    new Anchor("Logout", "javascript: window.logout();"))
                            ).spacing(true)
                            .padding(true)
                            .build())
                    .build());
        }
        return widgets;
    }
</#if>

}
