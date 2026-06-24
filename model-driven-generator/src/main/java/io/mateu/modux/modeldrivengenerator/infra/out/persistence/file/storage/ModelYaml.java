package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;

/** Shared YAML mappers so the monolithic and granular formats serialize elements identically. */
final class ModelYaml {

    private ModelYaml() {
    }

    static YAMLMapper reader() {
        return new YAMLMapper();
    }

    static YAMLMapper writer() {
        var mapper = new YAMLMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.configOverride(boolean.class).setInclude(
                JsonInclude.Value.construct(JsonInclude.Include.NON_DEFAULT, JsonInclude.Include.NON_DEFAULT));
        mapper.configOverride(Boolean.class).setInclude(
                JsonInclude.Value.construct(JsonInclude.Include.NON_DEFAULT, JsonInclude.Include.NON_DEFAULT));
        return mapper;
    }
}
