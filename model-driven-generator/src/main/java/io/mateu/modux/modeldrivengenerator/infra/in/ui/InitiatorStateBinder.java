package io.mateu.modux.modeldrivengenerator.infra.in.ui;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.extern.slf4j.Slf4j;

/**
 * Binds the submitted form values onto a view model instance. Mateu sends them as the
 * action's initiator state (parameters.initiatorState) — NOT as bean fields, and
 * HttpRequest.getString reads the orchestrator's state instead — so create()/save()
 * must bind explicitly. Field-access Jackson update: matching fields are overwritten,
 * everything else (use case dependencies, unknown keys) is left alone.
 */
@Slf4j
public final class InitiatorStateBinder {

    private static final ObjectMapper MAPPER = new ObjectMapper()
            .setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    private InitiatorStateBinder() {
    }

    public static void bind(Object form, HttpRequest httpRequest) {
        var rq = httpRequest.runActionRq();
        if (rq == null || rq.parameters() == null) return;
        var state = rq.parameters().get("initiatorState");
        if (state == null) return;
        try {
            MAPPER.updateValue(form, state);
        } catch (com.fasterxml.jackson.core.JacksonException e) {
            log.warn("no se pudo vincular el estado del formulario en {}: {}",
                    form.getClass().getSimpleName(), e.getMessage());
        }
    }
}
