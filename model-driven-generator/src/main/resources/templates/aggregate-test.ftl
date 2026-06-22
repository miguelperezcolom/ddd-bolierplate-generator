package ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case};

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ${aggregate.name}Test {

    @Test
    void should_instantiate_successfully() {
        var aggregate = new ${aggregate.name}();
        assertNotNull(aggregate);
    }

<#list aggregate.invariants as invariant>
    @Test
    void ${invariant.name?lower_case?replace("[^a-z0-9]","_",'r')}_invariant_should_be_enforced() {
        // TODO: arrange data that violates invariant "${invariant.name}"
        // assertThrows(IllegalArgumentException.class, () -> ${aggregate.name}.of(...));
    }

</#list>
<#list aggregate.operations as operation>
    @Test
    void ${operation.name?lower_case?replace("[^a-z0-9]","_",'r')}_operation_should_succeed() {
        // TODO: arrange aggregate then call ${aggregate.name}#${operation.name?lower_case}(...)
    }

</#list>
}
