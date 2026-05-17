package ${project.packageName}.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
<#if adapter.menuItems?has_content>
<#list adapter.menuItems as item>
<#assign routeSlug = item.route?lower_case?replace("[^a-z0-9]","",'r')>
<#list service.modules as m>
<#list m.aggregates as agg>
<#assign aggSlug = agg.name?lower_case?replace("[^a-z0-9]","",'r')>
<#if aggSlug == routeSlug>
import ${project.packageName}.${m.slug}.infra.in.ui.pages.${aggSlug}.${agg.name}CrudOrchestrator;
</#if>
</#list>
</#list>
</#list>
</#if>

/**
 * Home page generated from UIAdapter: ${adapter.name}
 * Path: ${adapter.path!''}
 */
@UI("${adapter.path!''}")
@Title("${adapter.title!service.name}")
public class Home {

<#if adapter.menuItems?has_content>
<#list adapter.menuItems as item>
<#assign routeSlug = item.route?lower_case?replace("[^a-z0-9]","",'r')>
<#assign fieldName = item.label?lower_case?replace("[^a-z0-9]","_",'r')?replace("_+","_",'r')>
<#assign matched = false>
<#list service.modules as m>
<#list m.aggregates as agg>
<#assign aggSlug = agg.name?lower_case?replace("[^a-z0-9]","",'r')>
<#if aggSlug == routeSlug && !matched>
<#assign matched = true>
    @Menu("${item.label}")
    ${agg.name}CrudOrchestrator ${fieldName};
</#if>
</#list>
</#list>
<#if !matched>
    @Menu("${item.label}")
    // TODO: resolve type for route "${item.route!''}"
    Object ${fieldName};
</#if>
</#list>
<#else>
    // TODO: add menu items
</#if>

}
