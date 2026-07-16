package ${project.packageName}.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
<#if homePage??>
import ${project.packageName}.${homePage.moduleSlug}.infra.in.ui.pages.${homePage.pageSlug}.${homePage.className};
</#if>
<#if menuPages?? && menuPages?has_content>
<#list menuPages as pg>
import ${project.packageName}.${pg.moduleSlug}.infra.in.ui.pages.${pg.pageSlug}.${pg.className};
</#list>
</#if>
<#if adapter.menuItems?has_content>
<#list adapter.menuItems as item>
<#if item.route?has_content>
<#assign routeSlug = item.route?lower_case?replace("[^a-z0-9]","",'r')>
<#list service.modules as m>
<#list m.aggregates as agg>
<#assign aggSlug = agg.name?lower_case?replace("[^a-z0-9]","",'r')>
<#if aggSlug == routeSlug>
import ${project.packageName}.${m.slug}.infra.in.ui.pages.${aggSlug}.${agg.name}CrudOrchestrator;
</#if>
</#list>
</#list>
</#if>
</#list>
</#if>

/**
 * Home page generated from UIAdapter: ${adapter.name}
 * Path: ${adapter.path!''}
 */
@Service
@Scope("prototype")
<#if ui??>
<#assign uiPath = (ui.path?has_content)?then(ui.path, (adapter.path)!'')>
@UI(<#if ui.indexHtmlPath?has_content || ui.frontendComponentPath?has_content>value = "${uiPath}"<#if ui.indexHtmlPath?has_content>, indexHtmlPath = "${ui.indexHtmlPath}"</#if><#if ui.frontendComponentPath?has_content>, frontendComponentPath = "${ui.frontendComponentPath}"</#if><#else>"${uiPath}"</#if>)
@Title("${adapter.title!ui.name}")
<#else>
@UI("${adapter.path!''}")
@Title("${adapter.title!service.name}")
</#if>
public class Home<#if homePage??> extends ${homePage.className}</#if> {

<#if menuPages?? && menuPages?has_content>
<#list menuPages as pg>
    @Menu
    ${pg.className} ${pg.field};

</#list>
</#if>
<#if adapter.menuItems?has_content>
<#list adapter.menuItems as item>
<#if item.route?has_content>
<#assign routeSlug = item.route?lower_case?replace("[^a-z0-9]","",'r')>
<#assign fieldName = item.label?lower_case?replace("[^a-z0-9]","_",'r')?replace("_+","_",'r')>
<#list service.modules as m>
<#list m.aggregates as agg>
<#assign aggSlug = agg.name?lower_case?replace("[^a-z0-9]","",'r')>
<#if aggSlug == routeSlug>
    @Menu
    ${agg.name}CrudOrchestrator ${fieldName};

</#if>
</#list>
</#list>
</#if>
</#list>
</#if>
<#if !(menuPages?? && menuPages?has_content) && !(adapter.menuItems?has_content)>
    // TODO: add menu items
</#if>
}
