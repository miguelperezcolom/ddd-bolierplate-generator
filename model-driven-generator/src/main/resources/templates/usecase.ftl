package ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')};
<#-- Aggregate-level imports for ReadAggregate / SaveAggregate / CallAggregateOperation steps -->
<#assign aggregateImports = []>
<#if usecase.steps?has_content>
<#list usecase.steps as step>
<#if (step.type == "ReadAggregate" || step.type == "CallAggregateOperation" || step.type == "SaveAggregate") && step.aggregate??>
    <#if !aggregateImports?seq_contains(step.aggregate.name)>
        <#assign aggregateImports = aggregateImports + [step.aggregate.name]>
    </#if>
</#if>
</#list>
</#if>
<#list aggregateImports as aggName>
import ${project.packageName}.${module.slug}.application.out.${aggName}Repository;
import ${project.packageName}.${module.slug}.domain.aggregates.${aggName?lower_case}.${aggName};
import ${project.packageName}.${module.slug}.domain.aggregates.${aggName?lower_case}.vo.${aggName}Id;
</#list>
<#-- Gateway imports -->
<#if usecase.steps?has_content>
<#list usecase.steps as step>
<#if step.type == "CallGateway" && step.gateway??>
import ${project.packageName}.${module.slug}.application.out.${step.gateway.name?cap_first}Gateway;
</#if>
</#list>
</#if>
<#-- Called use-case imports -->
<#if usecase.steps?has_content>
<#list usecase.steps as step>
<#if step.type == "CallUseCase" && step.useCase??>
import ${project.packageName}.${module.slug}.application.usecases.${step.useCase.name?lower_case?replace("[^a-z0-9]","",'r')}.${step.useCase.name?cap_first}UseCase;
import ${project.packageName}.${module.slug}.application.usecases.${step.useCase.name?lower_case?replace("[^a-z0-9]","",'r')}.${step.useCase.name?cap_first}Command;
</#if>
</#list>
</#if>
<#-- Domain event imports for PublishDomainEvent steps -->
<#if usecase.steps?has_content>
<#list usecase.steps as step>
<#if step.type == "PublishDomainEvent" && step.domainEvent??>
import ${project.packageName}.${module.slug}.domain.events.${step.domainEvent.name?cap_first}Event;
</#if>
</#list>
</#if>
<#if usecase.needsStreamBridge>
import org.springframework.cloud.stream.function.StreamBridge;
</#if>
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
<#if usecase.transactionBoundary?? && usecase.transactionBoundary?has_content>
import org.springframework.transaction.annotation.Transactional;
</#if>
<#if usecase.cacheable?? && usecase.cacheable>
import org.springframework.cache.annotation.Cacheable;
</#if>
<#if usecase.allowedRoles?has_content>
import org.springframework.security.access.prepost.PreAuthorize;
</#if>

@Service
@RequiredArgsConstructor
public class ${usecase.name?cap_first}UseCase {

<#-- Repository fields -->
<#assign addedFields = []>
<#if usecase.steps?has_content>
<#list usecase.steps as step>
<#if (step.type == "ReadAggregate" || step.type == "CallAggregateOperation" || step.type == "SaveAggregate") && step.aggregate??>
    <#if !addedFields?seq_contains(step.aggregate.name + "Repository")>
        <#assign addedFields = addedFields + [step.aggregate.name + "Repository"]>
    final ${step.aggregate.name}Repository ${step.aggregate.name?uncap_first}Repository;
    </#if>
</#if>
<#if step.type == "CallGateway" && step.gateway??>
    <#if !addedFields?seq_contains(step.gateway.name?cap_first + "Gateway")>
        <#assign addedFields = addedFields + [step.gateway.name?cap_first + "Gateway"]>
    final ${step.gateway.name?cap_first}Gateway ${step.gateway.name?uncap_first}Gateway;
    </#if>
</#if>
<#if step.type == "CallUseCase" && step.useCase??>
    <#if !addedFields?seq_contains(step.useCase.name?cap_first + "UseCase")>
        <#assign addedFields = addedFields + [step.useCase.name?cap_first + "UseCase"]>
    final ${step.useCase.name?cap_first}UseCase ${step.useCase.name?uncap_first}UseCase;
    </#if>
</#if>
</#list>
</#if>
<#if usecase.needsStreamBridge>
    final StreamBridge streamBridge;
</#if>
<#if usecase.steps?has_content && usecase.steps?filter(s -> s.type == "Custom")?has_content>
    final ${usecase.name?cap_first}Steps steps;
</#if>

<#if usecase.allowedRoles?has_content>
    @PreAuthorize("hasAnyRole(${usecase.allowedRoles?map(r -> "'" + r + "'")?join(", ")})")
</#if>
<#if usecase.cacheable?? && usecase.cacheable>
    @Cacheable(value = "${usecase.name?lower_case}", <#if usecase.cacheTtlSeconds??>/* ttlSeconds=${usecase.cacheTtlSeconds} */</#if>)
</#if>
<#if usecase.transactionBoundary?? && usecase.transactionBoundary?has_content>
    @Transactional
</#if>
    public void handle(${usecase.name?cap_first}Command command) {
<#if usecase.steps?has_content>
<#list usecase.steps as step>
<#if step.type == "ReadAggregate" && step.aggregate??>
        var ${step.aggregate.name?uncap_first} = ${step.aggregate.name?uncap_first}Repository
                .findById(new ${step.aggregate.name}Id(command.id()))
                .orElseThrow();
<#elseif step.type == "CallAggregateOperation" && step.aggregate??>
<#if step.operation??>
        ${step.aggregate.name?uncap_first}.${step.operation.name?uncap_first}(/* TODO: pass operation args */);
<#else>
        // TODO: call operation on ${step.aggregate.name?uncap_first} (operationId not resolved)
</#if>
<#elseif step.type == "SaveAggregate" && step.aggregate??>
<#if !step.aggregateLoaded?? || !step.aggregateLoaded>
        ${step.aggregate.name} ${step.aggregate.name?uncap_first} = null; // TODO: build ${step.aggregate.name} from command + gateway results
</#if>
        ${step.aggregate.name?uncap_first}Repository.save(${step.aggregate.name?uncap_first});
<#elseif step.type == "CallGateway" && step.gateway??>
<#if step.gatewayOperation??>
        ${step.gateway.name?uncap_first}Gateway.${step.gatewayOperation.name?uncap_first}(<#if step.argFields??><#list step.argFields as a><#if a.matched>command.${a.name}()<#else>null /* TODO: ${a.name} */</#if><#sep>, </#sep></#list></#if>);
<#else>
        // TODO: call gateway ${step.gateway.name?uncap_first}Gateway (operation not resolved)
</#if>
<#elseif step.type == "PublishDomainEvent" && step.domainEvent??>
        streamBridge.send("${step.domainEvent.name?lower_case?replace("[^a-z0-9]","-",'r')}", new ${step.domainEvent.name?cap_first}Event(null /* TODO: aggregateId */<#if step.argFields??><#list step.argFields as a>, <#if a.matched>command.${a.name}()<#else>null /* TODO: ${a.name} */</#if></#list></#if>));
<#elseif step.type == "CallUseCase" && step.useCase??>
        ${step.useCase.name?uncap_first}UseCase.handle(/* TODO: build ${step.useCase.name?cap_first}Command */);
<#elseif step.type == "ApplyModelMapping">
<#if step.modelMapping??>
        // TODO: apply model mapping "${step.modelMapping.name}"
<#else>
        // TODO: apply model mapping (not resolved)
</#if>
<#elseif step.type == "Custom">
        steps.${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}();
<#else>
        // TODO: implement step "${step.name}" (${step.type})
</#if>
</#list>
<#else>
        // TODO: implement use case logic
</#if>
    }

}
