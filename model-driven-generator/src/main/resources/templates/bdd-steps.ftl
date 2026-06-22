package ${project.packageName}.${module.slug}.bdd;
<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import ${project.packageName}.${module.slug}.application.out.${aggregate.name}Repository;
import ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.create.Create${aggregate.name}Command;
import ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.create.Create${aggregate.name}UseCase;
import ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.delete.Delete${aggregate.name}Command;
import ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.delete.Delete${aggregate.name}UseCase;
import ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.update.Update${aggregate.name}Command;
import ${project.packageName}.${module.slug}.application.usecases.${aggregate.name?lower_case}.update.Update${aggregate.name}UseCase;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class ${aggregate.name}Steps {

    @Autowired
    ${aggregate.name}Repository repository;

    @Autowired
    Create${aggregate.name}UseCase createUseCase;

    @Autowired
    Update${aggregate.name}UseCase updateUseCase;

    @Autowired
    Delete${aggregate.name}UseCase deleteUseCase;

    private Exception lastException;

    @Before
    public void setUp() {
        lastException = null;
    }

    @Given("no ${aggregate.name} exists")
    public void no${aggregate.name}Exists() {
        // nothing to set up
    }

    @Given("a ${aggregate.name} exists with id {string}")
    public void ${aggregate.name?lower_case}ExistsWith(String id) {
        // TODO: insert a test ${aggregate.name} with the given id into the repository
    }

    @When("I create a new ${aggregate.name}")
    public void createNew${aggregate.name}() {
        try {
            createUseCase.handle(new Create${aggregate.name}Command(<#list safeFields as field>null<#sep>, </#sep></#list>));
        } catch (Exception e) {
            lastException = e;
        }
    }

    @When("I update the ${aggregate.name} with id {string}")
    public void update${aggregate.name}(String id) {
        try {
            updateUseCase.handle(new Update${aggregate.name}Command(id<#list safeFields as field>, null</#list>));
        } catch (Exception e) {
            lastException = e;
        }
    }

    @When("I delete the ${aggregate.name} with id {string}")
    public void delete${aggregate.name}(String id) {
        try {
            deleteUseCase.handle(new Delete${aggregate.name}Command(java.util.List.of(id)));
        } catch (Exception e) {
            lastException = e;
        }
    }

<#list aggregate.operations as operation>
    @When("I execute ${operation.name} on the ${aggregate.name} with id {string}")
    public void execute${operation.name?cap_first}OnThe${aggregate.name}(String id) {
        // TODO: load aggregate by id and invoke ${operation.name} operation
    }

</#list>
    @Then("a ${aggregate.name} should be saved successfully")
    public void ${aggregate.name?lower_case}ShouldBeSaved() {
        assertNull(lastException, () -> "Unexpected exception: " + lastException);
    }

    @Then("the ${aggregate.name} with id {string} should be updated")
    public void ${aggregate.name?lower_case}ShouldBeUpdated(String id) {
        assertNull(lastException, () -> "Unexpected exception: " + lastException);
    }

    @Then("the ${aggregate.name} with id {string} should no longer exist")
    public void ${aggregate.name?lower_case}ShouldNoLongerExist(String id) {
        assertNull(lastException, () -> "Unexpected exception: " + lastException);
        // TODO: verify repository.findById(...) returns empty
    }

    @Then("the ${aggregate.name} with id {string} should reflect the {string} operation")
    public void ${aggregate.name?lower_case}ShouldReflectOperation(String id, String operation) {
        // TODO: verify the expected state after the operation
    }
}
