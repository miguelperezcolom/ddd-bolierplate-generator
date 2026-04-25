<#assign className = project.name?replace(" ", "_")?replace("-", "_")?split("_")?map(w -> w?cap_first)?join("") + "Application">
package ${project.packageName};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ${className} {

    public static void main(String[] args) {
        SpringApplication.run(${className}.class, args);
    }

}
