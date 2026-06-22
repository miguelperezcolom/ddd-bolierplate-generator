package ${project.packageName}.${module.slug}.bdd;

import io.cucumber.junit.platform.engine.Constants;
import io.cucumber.spring.CucumberContextConfiguration;
import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;
import org.springframework.boot.test.context.SpringBootTest;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features/${module.slug}")
@ConfigurationParameter(key = Constants.GLUE_PROPERTY_NAME,
        value = "${project.packageName}.${module.slug}.bdd")
public class CucumberRunner {
}

@SpringBootTest
@CucumberContextConfiguration
class CucumberSpringConfiguration {
}
