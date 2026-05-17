<#assign pageSlug = page.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.pages.${pageSlug};

import io.mateu.uidl.annotations.Title;
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
@Title("${page.name}")
public class ${page.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Page {

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
