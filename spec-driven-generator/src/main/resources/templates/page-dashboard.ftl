<#assign pageSlug = page.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.pages.${pageSlug};

import io.mateu.uidl.annotations.Title;
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
@Title("${page.name}")
public class ${page.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Page {

<#if components?has_content>
<#list components as component>
    final ${component.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Component ${component.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}Component;
</#list>
<#else>
    // TODO: add dashboard components
</#if>

}
