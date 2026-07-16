<#assign pageSlug = pageSlug!(page.name?lower_case?replace("[^a-z0-9]","",'r'))>
<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.pages.${pageSlug};

<#if ui??>
import io.mateu.uidl.annotations.UI;
</#if>
import io.mateu.uidl.annotations.Title;
<#if page.favicon?has_content>
import io.mateu.uidl.annotations.FavIcon;
</#if>
<#if page.style?has_content>
import io.mateu.uidl.StyleConstants;
import io.mateu.uidl.annotations.Style;
</#if>
<#assign textNodes = []>
<#if page.content?has_content>
<#list page.content as node>
<#if node.kind == 'text' && node.text?has_content>
<#assign textNodes = textNodes + [node]>
</#if>
</#list>
</#if>
<#if textNodes?has_content>
import io.mateu.uidl.annotations.Label;
import io.mateu.uidl.annotations.PlainText;
</#if>
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
<#if components?has_content>
<#list components as component>
import ${project.packageName}.${moduleSlugVal}.infra.in.ui.components.${component.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Component;
</#list>
</#if>

/**
 * Dashboard page: ${page.name}
 * Route: ${page.route!''}
 * Generated from PageEntity id=${page.id}
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
<#if ui??>
<#assign uiPath = (ui.path?has_content)?then(ui.path, '')>
@UI(<#if ui.indexHtmlPath?has_content || ui.frontendComponentPath?has_content>value = "${uiPath}"<#if ui.indexHtmlPath?has_content>, indexHtmlPath = "${ui.indexHtmlPath}"</#if><#if ui.frontendComponentPath?has_content>, frontendComponentPath = "${ui.frontendComponentPath}"</#if><#else>"${uiPath}"</#if>)
</#if>
@Title("${page.title!page.name}")
<#if page.favicon?has_content>
@FavIcon("${page.favicon}")
</#if>
<#if page.style?has_content>
@Style(StyleConstants.${page.style})
</#if>
public class ${pageClassName!(page.name?cap_first?replace("[^a-zA-Z0-9]","",'r') + "Page")} {

<#list textNodes as node>
    @Label("")
    @PlainText
    String text${node?index} = "${node.text?j_string}";

</#list>
<#if components?has_content>
<#list components as component>
    final ${component.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Component ${component.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}Component;
</#list>
<#elseif !textNodes?has_content>
    // TODO: add dashboard components
</#if>

}
