package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.infra.in.mcp.ModelMcpTools;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

/** The MCP surface covers the system/solutions workspace too (AI-driven modelling). */
@SpringBootTest
class McpSolutionToolsTest {

    @Autowired ModelMcpTools tools;

    @Test
    void solutionToolsAreExposedAndWorkspaceStatusAnswers() throws Exception {
        var names = tools.tools().stream().map(ModelMcpTools.ToolSpec::name).toList();
        assertThat(names).contains("workspace_status", "create_solution", "switch_solution",
                "solution_diff", "set_solution_status", "merge_solution",
                "update_solution_from_system");

        var status = tools.call("workspace_status", null);
        assertThat(status).contains("current:").contains("system:").contains("diff:");

        var diff = tools.call("solution_diff", null);
        assertThat(diff).contains("system: true"); // on main, the diff is empty by definition
    }
}
