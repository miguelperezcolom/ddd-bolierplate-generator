<#assign className = service.name?replace(" ", "_")?replace("-", "_")?split("_")?map(w -> w?cap_first)?join("") + "Application">
package ${project.packageName};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// io.mateu is scanned so Mateu's web layer (MateuController: the UI shell at "/"
// and the /mateu/v3/sync API) gets registered — Mateu ships no Spring auto-configuration.
@SpringBootApplication(scanBasePackages = {"${project.packageName}", "io.mateu"})
public class ${className} {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }

}
