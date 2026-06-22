package ${shellPackage};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// io.mateu is scanned so Mateu's web layer (MateuController: the UI shell at "/"
// and the /mateu/v3/sync API) gets registered — Mateu ships no Spring auto-configuration.
@SpringBootApplication(scanBasePackages = {"${shellPackage}", "io.mateu"})
public class ${shellClassName}Application {

    public static void main(String[] args) {
        SpringApplication.run(${shellClassName}Application.class, args);
    }

}
