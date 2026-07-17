<#function schemaType t><#if t == "integer"><#return "integer"><#elseif t == "number" || t == "money"><#return "number"><#elseif t == "bool"><#return "boolean"><#elseif t == "array"><#return "array"><#else><#return "string"></#if></#function>
<#function mcpArg f><#if f.basicType?? && f.basicType><#if f.type == "integer"><#return 'toInteger(args.get("' + f.name + '"))'><#elseif f.type == "number" || f.type == "money"><#return 'toBigDecimal(args.get("' + f.name + '"))'><#elseif f.type == "bool"><#return 'toBoolean(args.get("' + f.name + '"))'><#elseif f.type == "date"><#return 'toLocalDate(args.get("' + f.name + '"))'><#elseif f.type == "time"><#return 'toLocalTime(args.get("' + f.name + '"))'><#elseif f.type == "dateTime"><#return 'toLocalDateTime(args.get("' + f.name + '"))'><#else><#return 'text(args.get("' + f.name + '"))'></#if><#elseif (f.type!"") == "array"><#return 'jsonText(args.get("' + f.name + '"))'><#else><#return 'text(args.get("' + f.name + 'Id"))'></#if></#function>
package ${project.packageName}.${module.slug}.infra.in.mcp;

import com.fasterxml.jackson.databind.ObjectMapper;
<#list mcpUseCases as item>
import ${project.packageName}.${module.slug}.application.usecases.${item.slug}.${item.className}Command;
import ${project.packageName}.${module.slug}.application.usecases.${item.slug}.${item.className}UseCase;
</#list>
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Minimal MCP server (JSON-RPC 2.0 over streamable HTTP, plain JSON responses): implements
 * initialize, tools/list and tools/call — what an agent needs to operate. One tool per
 * exposedAsMcp use case of this bounded context, prefixed by the service name.
 */
@RestController
@RequiredArgsConstructor
public class McpServer {

    private static final String PROTOCOL_VERSION = "2025-06-18";

<#list mcpUseCases as item>
    private final ${item.className}UseCase ${item.fieldName};
</#list>
    private final ObjectMapper json;

    @PostMapping(path = "/mcp", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, Object>> serve(@RequestBody Map<String, Object> request) {
        var method = (String) request.get("method");
        var id = request.get("id");
        if (id == null) {
            return ResponseEntity.accepted().build(); // notifications
        }
        try {
            return ResponseEntity.ok(reply(id, switch (method) {
                case "initialize" -> Map.of(
                        "protocolVersion", PROTOCOL_VERSION,
                        "capabilities", Map.of("tools", Map.of()),
                        "serverInfo", Map.of("name", "${serviceSlug}", "version", "1.0.0"));
                case "tools/list" -> Map.of("tools", tools());
                case "tools/call" -> call(request);
                case "ping" -> Map.of();
                default -> throw new McpError(-32601, "Unsupported method: " + method);
            }));
        } catch (McpError e) {
            var body = new LinkedHashMap<String, Object>();
            body.put("jsonrpc", "2.0");
            body.put("id", id);
            body.put("error", Map.of("code", e.code, "message", e.getMessage()));
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            return ResponseEntity.ok(reply(id, Map.of(
                    "content", List.of(Map.of("type", "text", "text", "Error: " + e.getMessage())),
                    "isError", true)));
        }
    }

    private List<Map<String, Object>> tools() {
        var tools = new ArrayList<Map<String, Object>>();
<#list mcpUseCases as item>
        tools.add(Map.of(
                "name", "${serviceSlug}_${item.slug}",
                "description", "${(item.usecase.mcpDescription!item.usecase.title!item.usecase.name)?j_string}",
                "inputSchema", Map.of(
                        "type", "object",
                        "properties", Map.ofEntries(<#if item.inputModel?? && item.inputModel.fields?has_content><#list item.inputModel.fields as f>
                                Map.entry("${f.name}<#if !(f.basicType?? && f.basicType) && (f.type!"") != "array">Id</#if>", Map.of("type", "${schemaType(f.type!"string")}"<#if f.label?? && f.label?has_content>, "description", "${f.label?j_string}"</#if>))<#sep>,</#sep></#list><#else>
                                Map.entry("id", Map.of("type", "string"))</#if>
                        ))));
</#list>
        return tools;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> call(Map<String, Object> request) throws Exception {
        var params = (Map<String, Object>) request.getOrDefault("params", Map.of());
        var name = (String) params.get("name");
        var args = (Map<String, Object>) params.getOrDefault("arguments", Map.of());
        Object result = switch (name) {
<#list mcpUseCases as item>
            case "${serviceSlug}_${item.slug}" -> {
<#if item.outputModel??>
                yield ${item.fieldName}.handle(new ${item.className}Command(<#if item.inputModel?? && item.inputModel.fields?has_content><#list item.inputModel.fields as f>${mcpArg(f)}<#sep>, </#sep></#list><#else>text(args.get("id"))</#if>));
<#else>
                ${item.fieldName}.handle(new ${item.className}Command(<#if item.inputModel?? && item.inputModel.fields?has_content><#list item.inputModel.fields as f>${mcpArg(f)}<#sep>, </#sep></#list><#else>text(args.get("id"))</#if>));
                yield Map.of("ok", true);
</#if>
            }
</#list>
            default -> throw new McpError(-32602, "Unknown tool: " + name);
        };
        return Map.of("content", List.of(Map.of(
                "type", "text",
                "text", json.writerWithDefaultPrettyPrinter().writeValueAsString(result))));
    }

    private Map<String, Object> reply(Object id, Object result) {
        var body = new LinkedHashMap<String, Object>();
        body.put("jsonrpc", "2.0");
        body.put("id", id);
        body.put("result", result);
        return body;
    }

    private static String text(Object value) {
        return value == null ? null : String.valueOf(value);
    }

    private static Integer toInteger(Object value) {
        return value == null ? null : value instanceof Number n ? n.intValue()
                : Integer.valueOf(String.valueOf(value));
    }

    private static BigDecimal toBigDecimal(Object value) {
        return value == null ? null : new BigDecimal(String.valueOf(value));
    }

    private static Boolean toBoolean(Object value) {
        return value == null ? null : value instanceof Boolean b ? b
                : Boolean.valueOf(String.valueOf(value));
    }

    private static LocalDate toLocalDate(Object value) {
        return value == null ? null : LocalDate.parse(String.valueOf(value));
    }

    private static LocalTime toLocalTime(Object value) {
        return value == null ? null : LocalTime.parse(String.valueOf(value));
    }

    private static LocalDateTime toLocalDateTime(Object value) {
        return value == null ? null : LocalDateTime.parse(String.valueOf(value));
    }

    /** Arrays travel as JSON text in commands; agents may send them as real arrays. */
    private String jsonText(Object value) throws Exception {
        if (value == null) {
            return null;
        }
        return value instanceof String s ? s : json.writeValueAsString(value);
    }

    private static final class McpError extends RuntimeException {
        final int code;

        McpError(int code, String message) {
            super(message);
            this.code = code;
        }
    }
}
