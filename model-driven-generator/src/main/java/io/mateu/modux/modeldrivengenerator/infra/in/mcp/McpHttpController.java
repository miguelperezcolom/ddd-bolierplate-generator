package io.mateu.modux.modeldrivengenerator.infra.in.mcp;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * The SAME tools-only MCP server, over streamable HTTP: one JSON-RPC message per
 * POST, one JSON response back — enough for any http MCP client. Sharing the
 * process with the web app means the agent edits the SAME in-memory catalog the
 * open UIs are looking at: no second process, no file-watcher latency. This is
 * what lets the in-app chat's pseudo-agent (mateu agent-cli → claude CLI with
 * an --mcp-config pointing here) author the model and render the map.
 */
@RestController
public class McpHttpController {

    private final McpStdioServer rpc;

    public McpHttpController(ModelMcpTools tools) {
        this.rpc = new McpStdioServer(tools);
    }

    @PostMapping(value = "/mcp", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> message(@RequestBody String body) {
        var response = rpc.process(body);
        // notifications get no body: 202 tells the client we took it
        if (response == null) return ResponseEntity.accepted().build();
        return ResponseEntity.ok(response.toString());
    }
}
