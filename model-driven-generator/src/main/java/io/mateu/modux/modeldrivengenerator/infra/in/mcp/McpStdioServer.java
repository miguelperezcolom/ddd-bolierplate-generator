package io.mateu.modux.modeldrivengenerator.infra.in.mcp;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

/**
 * A minimal MCP (Model Context Protocol) server over stdio: JSON-RPC 2.0, one message per line.
 * Implements the {@code tools} capability only — enough for any MCP client (Claude Code, IDEs…) to
 * author the model through {@link ModelMcpTools}. Hand-rolled on purpose: the tools-only protocol
 * is four methods, and having no SDK dependency keeps the generator self-contained.
 */
public class McpStdioServer {

    static final String PROTOCOL_VERSION = "2025-06-18";

    private final ModelMcpTools tools;
    private final ObjectMapper mapper = new ObjectMapper();

    public McpStdioServer(ModelMcpTools tools) {
        this.tools = tools;
    }

    /** Serve until the client closes stdin. Anything but protocol messages must stay off {@code out}. */
    public void run(InputStream in, OutputStream out) throws IOException {
        var reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8));
        var writer = new BufferedWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.isBlank()) {
                continue;
            }
            var response = process(line);
            if (response != null) {
                writer.write(mapper.writeValueAsString(response));
                writer.write("\n");
                writer.flush();
            }
        }
    }

    /** Handle one JSON-RPC message; returns the response, or null for notifications. */
    ObjectNode process(String line) {
        JsonNode message;
        try {
            message = mapper.readTree(line);
        } catch (JacksonException e) {
            return error(mapper.getNodeFactory().nullNode(), -32700, "Parse error: not valid JSON");
        }
        var id = message.get("id");
        var method = message.path("method").asText("");
        if (id == null || id.isNull()) {
            return null; // notification (e.g. notifications/initialized) — no response
        }
        return switch (method) {
            case "initialize" -> result(id, initializeResult(message.path("params")));
            case "ping" -> result(id, mapper.createObjectNode());
            case "tools/list" -> result(id, toolsList());
            case "tools/call" -> result(id, toolsCall(message.path("params")));
            default -> error(id, -32601, "Method not found: " + method);
        };
    }

    private ObjectNode initializeResult(JsonNode params) {
        var result = mapper.createObjectNode();
        var clientVersion = params.path("protocolVersion").asText("");
        result.put("protocolVersion", clientVersion.isBlank() ? PROTOCOL_VERSION : clientVersion);
        result.putObject("capabilities").putObject("tools");
        var serverInfo = result.putObject("serverInfo");
        serverInfo.put("name", "modux");
        serverInfo.put("title", "Modux model authoring");
        serverInfo.put("version", "0.0.1");
        result.put("instructions", "Authoring tools for the modux model store (the YAML spec that modux "
                + "turns into code). Model in the natural order (the authoring path): "
                + "1) topology — bootstrap_project creates project + service + modules in one call from "
                + "the user's description; "
                + "2) models first (data with shape), then escalate only when needed: add an aggregate "
                + "when there are invariants or a lifecycle to protect, a query service or read model "
                + "for the read side, domain events for what happened, use cases for what the system does; "
                + "3) relations between modules are declared as intent, not structure: use flows "
                + "(MATERIALIZES/TRIGGERS/NOTIFIES/ORCHESTRATES), processes, or a recipe (list_recipes) — "
                + "prefer apply_recipe over hand-building the pieces; "
                + "4) operations are pipelines: gather data, transform (model mappings), write or return. "
                + "Tool loop: list_element_types to orient, get_element_schema before a new type, "
                + "upsert_element (returns the dangling references you introduce), lint_model after each "
                + "batch — its findings are the next-step to-do list — and generate_code when clean.");
        return result;
    }

    private ObjectNode toolsList() {
        var result = mapper.createObjectNode();
        var list = result.putArray("tools");
        for (var tool : tools.tools()) {
            list.add(mapper.<JsonNode>valueToTree(tool));
        }
        return result;
    }

    private ObjectNode toolsCall(JsonNode params) {
        var name = params.path("name").asText("");
        var arguments = params.path("arguments");
        String text;
        boolean isError = false;
        try {
            text = tools.call(name, arguments);
        } catch (Exception e) {
            text = "Error: " + (e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName());
            isError = true;
        }
        var result = mapper.createObjectNode();
        var content = result.putArray("content").addObject();
        content.put("type", "text");
        content.put("text", text);
        if (isError) {
            result.put("isError", true);
        }
        return result;
    }

    private ObjectNode result(JsonNode id, ObjectNode payload) {
        var response = mapper.createObjectNode();
        response.put("jsonrpc", "2.0");
        response.set("id", id);
        response.set("result", payload);
        return response;
    }

    private ObjectNode error(JsonNode id, int code, String message) {
        var response = mapper.createObjectNode();
        response.put("jsonrpc", "2.0");
        response.set("id", id);
        var error = response.putObject("error");
        error.put("code", code);
        error.put("message", message);
        return response;
    }
}
