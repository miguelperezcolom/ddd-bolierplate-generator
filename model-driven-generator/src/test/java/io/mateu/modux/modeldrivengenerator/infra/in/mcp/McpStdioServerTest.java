package io.mateu.modux.modeldrivengenerator.infra.in.mcp;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Drives the MCP server the way a client would: JSON-RPC messages in, protocol responses out.
 * Uses a temp copy of the example store so upserts/deletes never touch the real one.
 */
@SpringBootTest
class McpStdioServerTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ModelMcpTools tools;

    @Autowired
    CommonFileRepository repository;

    McpStdioServer server;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void loadTempStore() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var file = Files.createTempFile("mcp-test-store", ".yaml");
        Files.writeString(file, store);
        repository.loadFrom(file.toAbsolutePath().toString());
        server = new McpStdioServer(tools);
    }

    @Test
    void initialize_and_list_tools_over_the_stream() throws Exception {
        var input = """
                {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"0"}}}
                {"jsonrpc":"2.0","method":"notifications/initialized"}
                {"jsonrpc":"2.0","id":2,"method":"tools/list"}
                """;
        var out = new ByteArrayOutputStream();

        server.run(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)), out);

        var lines = out.toString(StandardCharsets.UTF_8).trim().split("\n");
        assertEquals(2, lines.length, "one response per request, none for the notification");
        var initialize = mapper.readTree(lines[0]);
        assertEquals("modux", initialize.at("/result/serverInfo/name").asText());
        assertEquals("2025-06-18", initialize.at("/result/protocolVersion").asText());
        var toolsList = mapper.readTree(lines[1]);
        var toolNames = new java.util.ArrayList<String>();
        toolsList.at("/result/tools").forEach(t -> toolNames.add(t.get("name").asText()));
        assertTrue(toolNames.containsAll(java.util.List.of("list_element_types", "get_element_schema",
                "upsert_element", "delete_element", "lint_model", "check_model", "generate_code")),
                "tool catalog incomplete: " + toolNames);
    }

    @Test
    void upsert_get_and_delete_an_element() throws Exception {
        var upsert = call("upsert_element", """
                {"type":"decisions","element":{"id":"mcp-test-decision","name":"Test decision",
                 "decision":"Authored over MCP","status":"ACCEPTED"}}""");
        assertTrue(upsert.contains("Created decisions 'mcp-test-decision'"), upsert);

        var get = call("get_element", """
                {"type":"decisions","id":"mcp-test-decision"}""");
        assertTrue(get.contains("Authored over MCP"), get);

        var delete = call("delete_element", """
                {"type":"decisions","id":"mcp-test-decision"}""");
        assertTrue(delete.contains("Deleted decisions 'mcp-test-decision'"), delete);
    }

    @Test
    void upsert_reports_dangling_references_it_introduces() throws Exception {
        var upsert = call("upsert_element", """
                {"type":"aggregates","element":{"id":"mcp-test-aggregate","name":"Test",
                 "modelId":"does-not-exist-mcp"}}""");
        assertTrue(upsert.contains("does-not-exist-mcp"), "should warn about the dangling modelId: " + upsert);

        call("delete_element", """
                {"type":"aggregates","id":"mcp-test-aggregate"}""");
    }

    @Test
    void upsert_with_unknown_field_is_rejected_with_guidance() throws Exception {
        var response = rawCall("upsert_element", """
                {"type":"decisions","element":{"id":"x","naem":"typo"}}""");
        assertTrue(response.at("/result/isError").asBoolean(), response.toString());
        assertTrue(response.at("/result/content/0/text").asText().contains("get_element_schema"),
                response.toString());
    }

    @Test
    void schema_check_lint_and_search_work() throws Exception {
        var schema = call("get_element_schema", """
                {"type":"aggregates"}""");
        assertTrue(schema.contains("\"eventSourcingEnabled\""), schema);

        var types = call("list_element_types", "{}");
        assertTrue(types.contains("aggregates"), types);

        var check = call("check_model", "{}");
        assertTrue(check.contains("no dangling references"), check);

        // the example store lints (findings allowed) — the tool must run and format
        var lint = call("lint_model", "{}");
        assertFalse(lint.isBlank());

        var search = call("search_elements", """
                {"query":"reserva"}""");
        assertTrue(search.contains("reserva"), search);
    }

    @Test
    void unknown_method_and_notifications_follow_jsonrpc() throws Exception {
        assertNull(server.process("""
                {"jsonrpc":"2.0","method":"notifications/whatever"}"""), "notifications get no response");
        var unknown = server.process("""
                {"jsonrpc":"2.0","id":9,"method":"resources/list"}""");
        assertEquals(-32601, unknown.at("/error/code").asInt());
    }

    private String call(String tool, String argumentsJson) throws Exception {
        var response = rawCall(tool, argumentsJson);
        assertFalse(response.at("/result/isError").asBoolean(),
                "tool " + tool + " failed: " + response.at("/result/content/0/text").asText());
        return response.at("/result/content/0/text").asText();
    }

    private com.fasterxml.jackson.databind.JsonNode rawCall(String tool, String argumentsJson) throws Exception {
        var request = mapper.createObjectNode();
        request.put("jsonrpc", "2.0");
        request.put("id", 1);
        request.put("method", "tools/call");
        var params = request.putObject("params");
        params.put("name", tool);
        params.set("arguments", mapper.readTree(argumentsJson));
        return server.process(mapper.writeValueAsString(request));
    }
}
