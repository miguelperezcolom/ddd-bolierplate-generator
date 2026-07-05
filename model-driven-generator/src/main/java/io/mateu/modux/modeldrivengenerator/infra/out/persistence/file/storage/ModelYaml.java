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
        return new YAMLMapper();
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
