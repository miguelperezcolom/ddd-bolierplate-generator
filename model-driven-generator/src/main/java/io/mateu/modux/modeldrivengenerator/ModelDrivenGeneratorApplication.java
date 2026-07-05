package io.mateu.modux.modeldrivengenerator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class ModelDrivenGeneratorApplication {

    public static void main(String[] args) {
        // MCP mode speaks JSON-RPC over stdio: no web server, no banner, no console logging —
        // any stray stdout byte would corrupt the protocol stream (see McpCliRunner).
        if (Arrays.asList(args).contains("--modux.mcp")) {
            System.setProperty("spring.main.web-application-type", "none");
            System.setProperty("spring.main.banner-mode", "off");
            System.setProperty("logging.pattern.console", "");
        }
        // convenience: accept the store path as a CLI arg too (it is read as a system property)
        for (var arg : args) {
            if (arg.startsWith("--modux.model-file=")) {
                System.setProperty("modux.model-file", arg.substring("--modux.model-file=".length()));
            }
        }
        SpringApplication.run(ModelDrivenGeneratorApplication.class, args);
    }

}
