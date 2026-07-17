package ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.create;
<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ${project.packageName}.${module.slug}.application.out.${aggregate.name}Repository;
import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
<#if aggregate.invariants?has_content>
import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name}Invariants;
</#if>
import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class Create${aggregate.name}UseCaseTest {

    @Mock
    ${aggregate.name}Repository repository;

<#if aggregate.invariants?has_content>
    @Mock
    ${aggregate.name}Invariants invariants;

</#if>
    @InjectMocks
    Create${aggregate.name}UseCase useCase;

    @Test
    void should_create_and_persist() {
        when(repository.save(any(${aggregate.name}.class))).thenReturn(new ${aggregate.name}Id(1L));
        var command = new Create${aggregate.name}Command(<#list safeFields as field>null<#sep>, </#sep></#list>);
        useCase.handle(command);
        verify(repository).save(any(${aggregate.name}.class));
    }
}
