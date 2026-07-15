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
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Wizard page: ${page.name}
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

<#if page.wizardSteps?has_content>
<#list page.wizardSteps as step>
    @Service
    @Scope("prototype")
    @Title("${step.name!'Step ${step?index + 1}'}")
    public static class Step${step?index + 1} {
        // TODO: add fields for wizard step "${step.name!'step ${step?index + 1}'}"

        public Object next(HttpRequest httpRequest) {
            // TODO: implement step transition logic
<#if step?has_next>
            return new Step${step?index + 2}();
<#else>
            return null; // wizard complete
</#if>
        }
    }

</#list>
<#else>
    // TODO: define wizard steps
    public static class Step1 {
        public Object next(HttpRequest httpRequest) {
            return null;
        }
    }
</#if>

    public Step1 start() {
        return new Step1();
    }

}
