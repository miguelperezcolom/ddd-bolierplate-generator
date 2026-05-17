package ${project.packageName}.${module.slug}.e2e;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

@Tag("e2e")
class ${aggregate.name}E2ETest extends BaseE2ETest {

    // Mateu derives the route from the @Menu field name in Home.java:
    // @Menu ${aggregate.name}CrudOrchestrator ${aggregate.name?lower_case}s;
    private static final String LIST_URL = "/${aggregate.name?lower_case}s";

    @Test
    void page_should_load() {
        navigateTo(LIST_URL);
        assertThat(page).not().hasURL("about:blank");
    }

    @Test
    void should_show_${aggregate.name?lower_case}_list() {
        navigateTo(LIST_URL);
        // TODO: assert the list/grid is visible
        // assertThat(page.locator("vaadin-grid")).isVisible();
    }

    @Test
    void should_open_create_form() {
        navigateTo(LIST_URL);
        page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("New")).click();
        // TODO: assert the create form/dialog is visible
        // assertThat(page.getByRole(AriaRole.DIALOG)).isVisible();
    }

    @Test
    void should_create_${aggregate.name?lower_case}() {
        navigateTo(LIST_URL);
        page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("New")).click();
        // TODO: fill in the form fields
<#list aggregate.fields?filter(f -> f.name != "id") as field>
        // page.getByLabel("${field.name?cap_first}").fill("test-value");
</#list>
        page.getByRole(AriaRole.BUTTON,
                new Page.GetByRoleOptions().setName("Save")).click();
        // TODO: assert the new item appears in the list
    }

    @Test
    void should_delete_${aggregate.name?lower_case}() {
        navigateTo(LIST_URL);
        // TODO: select a row then click Delete
        // page.locator("vaadin-grid vaadin-grid-cell").first().click();
        // page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Delete")).click();
        // page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Confirm")).click();
    }
<#list aggregate.operations as operation>

    @Test
    void should_execute_${operation.name?lower_case?replace("[^a-z0-9]","_",'r')}_operation() {
        navigateTo(LIST_URL);
        // TODO: select a row then click the "${operation.name}" action button
        // page.getByRole(AriaRole.BUTTON,
        //         new Page.GetByRoleOptions().setName("${operation.name}")).click();
    }
</#list>
}
