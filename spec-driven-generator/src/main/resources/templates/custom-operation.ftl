<#assign operationName = operation.name?lower_case>
package ${project.packageName}.domain.aggregates.${aggregate.name?lower_case};

@FunctionalInterface
public interface ${operationName?cap_first}${aggregate.name}Operation {

void execute(${aggregate.name}OperationContext context);

}
