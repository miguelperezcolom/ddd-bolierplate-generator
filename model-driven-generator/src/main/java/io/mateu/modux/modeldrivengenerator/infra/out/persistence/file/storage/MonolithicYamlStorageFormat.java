package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

/** The original format: the whole model in a single YAML (or JSON) file. */
@Component
public class MonolithicYamlStorageFormat implements ModelStorageFormat {

    @Override
    public boolean handles(Path path) {
        return !Files.isDirectory(path);
    }

    @Override
    public AllData load(Path path) throws Exception {
        if (Files.exists(path)) {
            return ModelYaml.reader().readValue(path.toFile(), AllData.class);
        }
        // fall back to the sibling JSON store, mirroring the historical behaviour
        var json = Files.readString(path.resolveSibling("model-driven-store.json"));
        return new ObjectMapper().readValue(json, AllData.class);
    }

    @Override
    public void save(Path path, AllData data) throws Exception {
        var yaml = "# yaml-language-server: $schema=./model-driven-store-schema.json\n"
                + ModelYaml.writer().writeValueAsString(data);
        if (path.getParent() != null) {
            Files.createDirectories(path.getParent());
        }
        Files.writeString(path, yaml);
    }

    @Override
    public Path dataDir(Path path) {
        var parent = path.toAbsolutePath().normalize().getParent();
        return parent != null ? parent : Path.of(".");
    }
}
