package io.mateu.ddd.sample.booking.domain.services;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.AnnotatedField;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.SneakyThrows;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Map;

public class SerializationService {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    //private static final ObjectMapper yamlMapper = new ObjectMapper(new YAMLFactory());

    static {
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        objectMapper.registerModule(new JavaTimeModule());
//        SimpleModule module = new SimpleModule();
//        module.addSerializer(IconChooser.class, new IconChooserSerializer());
//        objectMapper.registerModule(module);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.NON_PRIVATE);
        objectMapper.setVisibility(new VisibilityChecker.Std(JsonAutoDetect.Visibility.NON_PRIVATE) {
            public boolean isFieldVisible(Field f) {
                return !Modifier.isFinal(f.getModifiers()) && !Modifier.isTransient(f.getModifiers()) ? super.isFieldVisible(f) : false;
            }

            public boolean isFieldVisible(AnnotatedField f) {
                return !Modifier.isFinal(f.getModifiers()) && !Modifier.isTransient(f.getModifiers()) ? super.isFieldVisible(f) : false;
            }
        });
//        this.yamlMapper.enable(SerializationFeature.INDENT_OUTPUT);
//        this.yamlMapper.registerModule(new JavaTimeModule());
//        this.yamlMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

    }

    @SneakyThrows
    public static String toJson(Object obj) {
        return objectMapper.writeValueAsString(obj);
    }

    public static Map<String, Object> fromJson(String json) throws IOException {
        if (json == null || "".equals(json)) {
            json = "{}";
        }

        return (Map)objectMapper.readValue(json, Map.class);
    }

    public static <T> T fromJson(String json, Class<T> c) throws Exception {
        if (json == null || "".equals(json)) {
            json = "{}";
        }

        return pojoFromJson(json, c);
    }

    public static <T> T pojoFromJson(String json, Class<T> c) throws Exception {
        if (json == null || json.isEmpty()) {
            json = "{}";
        }

        return objectMapper.readValue(json, c);
    }

}
