package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.services;

/**
 * Domain service ${domainService.name}. A stateless coordinator of the ${module.name} bounded
 * context; its operations are implemented in the developer-owned {@code Default${domainService.name}}.
 */
public interface ${domainService.name} {
<#list operations as op>

<#if op.intent?? && op.intent?has_content>
    /** ${op.intent} */
</#if>
    void ${op.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}();
</#list>
}
