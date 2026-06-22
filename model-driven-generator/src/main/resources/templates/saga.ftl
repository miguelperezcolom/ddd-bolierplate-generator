package ${project.packageName}.${module.slug}.application.sagas;
<#-- Collect aggregate imports from steps -->
<#assign sagaAggregateImports = []>
<#if saga.steps?has_content>
<#list saga.steps as step>
<#if (step.type == "ReadAggregate" || step.type == "CallAggregateOperation" || step.type == "SaveAggregate") && step.aggregate??>
    <#if !sagaAggregateImports?seq_contains(step.aggregate.name)>
        <#assign sagaAggregateImports = sagaAggregateImports + [step.aggregate.name]>
    </#if>
</#if>
</#list>
</#if>
<#list sagaAggregateImports as aggName>
import ${project.packageName}.${module.slug}.application.out.${aggName}Repository;
import ${project.packageName}.${module.slug}.domain.aggregates.${aggName?lower_case}.${aggName};
import ${project.packageName}.${module.slug}.domain.aggregates.${aggName?lower_case}.vo.${aggName}Id;
</#list>
<#if saga.steps?has_content>
<#list saga.steps as step>
<#if step.type == "PublishDomainEvent" && step.domainEvent??>
import ${project.packageName}.${module.slug}.domain.events.${step.domainEvent.name?cap_first}Event;
</#if>
<#if step.type == "CallUseCase" && step.useCase??>
import ${project.packageName}.${module.slug}.application.usecases.${step.useCase.name?lower_case?replace("[^a-z0-9]","",'r')}.${step.useCase.name?cap_first}UseCase;
import ${project.packageName}.${module.slug}.application.usecases.${step.useCase.name?lower_case?replace("[^a-z0-9]","",'r')}.${step.useCase.name?cap_first}Command;
</#if>
<#if step.type == "CallGateway" && step.gateway??>
import ${project.packageName}.${module.slug}.application.out.${step.gateway.name?cap_first}Gateway;
</#if>
</#list>
</#if>
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ${saga.name?cap_first}Saga {

<#-- Repository fields -->
<#assign addedSagaFields = []>
<#if saga.steps?has_content>
<#list saga.steps as step>
<#if (step.type == "ReadAggregate" || step.type == "CallAggregateOperation" || step.type == "SaveAggregate") && step.aggregate??>
    <#if !addedSagaFields?seq_contains(step.aggregate.name + "Repository")>
        <#assign addedSagaFields = addedSagaFields + [step.aggregate.name + "Repository"]>
    final ${step.aggregate.name}Repository ${step.aggregate.name?uncap_first}Repository;
    </#if>
</#if>
<#if step.type == "CallGateway" && step.gateway??>
    <#if !addedSagaFields?seq_contains(step.gateway.name?cap_first + "Gateway")>
        <#assign addedSagaFields = addedSagaFields + [step.gateway.name?cap_first + "Gateway"]>
    final ${step.gateway.name?cap_first}Gateway ${step.gateway.name?uncap_first}Gateway;
    </#if>
</#if>
<#if step.type == "CallUseCase" && step.useCase??>
    <#if !addedSagaFields?seq_contains(step.useCase.name?cap_first + "UseCase")>
        <#assign addedSagaFields = addedSagaFields + [step.useCase.name?cap_first + "UseCase"]>
    final ${step.useCase.name?cap_first}UseCase ${step.useCase.name?uncap_first}UseCase;
    </#if>
</#if>
</#list>
</#if>
<#if saga.steps?has_content && saga.steps?filter(s -> s.type == "PublishDomainEvent")?has_content>
    final StreamBridge streamBridge;
</#if>

    @Transactional
    public void execute(/* TODO: define saga trigger payload */) {
<#if saga.steps?has_content>
<#list saga.steps as step>
<#if step.type == "ReadAggregate" && step.aggregate??>
        var ${step.aggregate.name?uncap_first} = ${step.aggregate.name?uncap_first}Repository
                .findById(new ${step.aggregate.name}Id(/* TODO: id */))
                .orElseThrow();
<#elseif step.type == "CallAggregateOperation" && step.aggregate??>
<#if step.operation??>
        ${step.aggregate.name?uncap_first}.${step.operation.name?uncap_first}(/* TODO: args */);
<#else>
        // TODO: call operation on ${step.aggregate.name?uncap_first}
</#if>
<#elseif step.type == "SaveAggregate" && step.aggregate??>
        ${step.aggregate.name?uncap_first}Repository.save(${step.aggregate.name?uncap_first});
<#elseif step.type == "CallGateway" && step.gateway??>
<#if step.gatewayOperation??>
        ${step.gateway.name?uncap_first}Gateway.${step.gatewayOperation.name?uncap_first}(/* TODO: args */);
<#else>
        // TODO: call gateway ${step.gateway.name?uncap_first}Gateway
</#if>
<#elseif step.type == "PublishDomainEvent" && step.domainEvent??>
        streamBridge.send("${step.domainEvent.name?lower_case?replace("[^a-z0-9]","-",'r')}", new ${step.domainEvent.name?cap_first}Event(/* TODO: fill event */));
<#elseif step.type == "CallUseCase" && step.useCase??>
        ${step.useCase.name?uncap_first}UseCase.handle(/* TODO: build ${step.useCase.name?cap_first}Command */);
<#else>
        // TODO: step "${step.name}" (${step.type})
</#if>
</#list>
<#else>
        // TODO: implement saga steps
</#if>
    }

    public void compensate(/* TODO: define saga payload */) {
        // TODO: implement compensation logic
<#if saga.steps?has_content>
<#list saga.steps?reverse as step>
        // Compensate: ${step.name} (${step.type})
</#list>
</#if>
    }

}
