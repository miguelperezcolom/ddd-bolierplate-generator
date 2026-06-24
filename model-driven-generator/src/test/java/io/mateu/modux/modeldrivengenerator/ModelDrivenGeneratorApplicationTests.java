package io.mateu.modux.modeldrivengenerator;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;

@SpringBootTest
class ModelDrivenGeneratorApplicationTests {

    static {
        // the model store lives at the repo root, one level above this module's working directory
        System.setProperty("modux.model-file",
                new File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Test
    void contextLoads() {
    }

}
