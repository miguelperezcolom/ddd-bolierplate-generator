<#assign operationName = operation.name>
package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case};

<#if operation.intent?? && operation.intent?has_content>
/** ${operation.intent} */
</#if>
@FunctionalInterface
public interface ${operationName?cap_first}${aggregate.name}Operation {

void execute(${aggregate.name}OperationContext context);

}
