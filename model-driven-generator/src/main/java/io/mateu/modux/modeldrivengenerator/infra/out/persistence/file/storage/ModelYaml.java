package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;

/**
 * Shared YAML mappers so the monolithic and granular formats — and every other surface that shows
 * elements "as stored", like the MCP {@code get_element} tool — serialize identically.
 */
public final class ModelYaml {

    private ModelYaml() {
    }

    public static YAMLMapper reader() {
        var mapper = new YAMLMapper();
        // A store written by a newer (or older) modux may carry fields this build does not
        // know: ignore them instead of refusing to open the model. The generated JSON
        // schema remains the strict guard for hand-edited files.
        mapper.configure(
                com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                false);
        return mapper;
    }

    public static YAMLMapper writer() {
        var mapper = new YAMLMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.configOverride(boolean.class).setInclude(
                JsonInclude.Value.construct(JsonInclude.Include.NON_DEFAULT, JsonInclude.Include.NON_DEFAULT));
        mapper.configOverride(Boolean.class).setInclude(
                JsonInclude.Value.construct(JsonInclude.Include.NON_DEFAULT, JsonInclude.Include.NON_DEFAULT));
        return mapper;
    }
}
