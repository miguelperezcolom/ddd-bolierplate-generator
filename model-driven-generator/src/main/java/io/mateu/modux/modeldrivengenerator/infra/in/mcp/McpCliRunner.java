package io.mateu.modux.modeldrivengenerator.infra.in.mcp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

/**
 * MCP server mode:
 *
 * <pre>
 *   --modux.mcp [--modux.model-file=&lt;store&gt;]
 * </pre>
 *
 * Serves the model-authoring tools over stdio until the client disconnects, then exits. The main
 * class detects the flag and switches off the web server, the banner and console logging so stdout
 * carries nothing but protocol messages (see {@code ModelDrivenGeneratorApplication}).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class McpCliRunner implements ApplicationRunner {

    private final ModelMcpTools tools;
    private final ConfigurableApplicationContext context;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!args.containsOption("modux.mcp")) {
            return;
        }
        log.info("MCP authoring server listening on stdio");
        new McpStdioServer(tools).run(System.in, System.out);
        log.info("MCP client disconnected; shutting down");
        System.exit(SpringApplication.exit(context, () -> 0));
    }
}
