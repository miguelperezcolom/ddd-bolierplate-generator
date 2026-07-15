package ${project.packageName}.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
<#list menuModules as m>
import ${project.packageName}.${m.slug}.infra.in.ui.menu.${m.className};
</#list>
<#if uiPages?? && uiPages?has_content>
<#list uiPages as pg>
import ${project.packageName}.${pg.moduleSlug}.infra.in.ui.pages.${pg.pageSlug}.${pg.className};
</#list>
</#if>

<#if ui??>
<#assign uiPath = (ui.path?has_content)?then(ui.path, '')>
@UI(<#if ui.indexHtmlPath?has_content || ui.frontendComponentPath?has_content>value = "${uiPath}"<#if ui.indexHtmlPath?has_content>, indexHtmlPath = "${ui.indexHtmlPath}"</#if><#if ui.frontendComponentPath?has_content>, frontendComponentPath = "${ui.frontendComponentPath}"</#if><#else>"${uiPath}"</#if>)
@Title("${ui.name}")
<#else>
@UI("")
@Title("${service.name}")
</#if>
public class Home {

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

}
