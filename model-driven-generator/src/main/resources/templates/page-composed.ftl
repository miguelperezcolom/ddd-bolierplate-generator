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
<#list treeImports as imp>
import ${imp};
</#list>
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Composed page: ${page.name} — generated from its designed component tree.
 * Route: ${page.route!''}
 * Generated from PageEntity id=${page.id}
 */
@Service
@Scope("prototype")
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
public class ${pageClassName!(page.name?cap_first?replace("[^a-zA-Z0-9]","",'r') + "Page")} implements ComponentTreeSupplier {
<#if treeFields?has_content>

<#list treeFields as f>
    ${f}
</#list>
</#if>

    @Override
    public Component component(HttpRequest httpRequest) {
        return ${componentTree};
    }
<#if treeNested?has_content>
<#list treeNested as nestedClass>

${nestedClass}
</#list>
</#if>
}
