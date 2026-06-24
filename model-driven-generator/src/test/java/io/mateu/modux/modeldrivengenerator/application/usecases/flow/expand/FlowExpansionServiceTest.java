package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FlowExpansionServiceTest {

    @Test
    void keepNew_drops_pieces_that_already_exist_and_dedups_derived() {
        var derived = List.of("a", "b", "b", "c");   // 'b' appears twice among derived
        var existing = List.of("c");                  // 'c' is hand-declared

        var result = FlowExpansionService.keepNew(derived, existing, Function.identity());

        // 'c' reused (dropped), 'b' collapsed to one, order preserved
        assertEquals(List.of("a", "b"), result);
    }

    @Test
    void keepNew_keeps_everything_when_nothing_pre_exists() {
        var result = FlowExpansionService.keepNew(List.of("x", "y"), List.of(), Function.identity());
        assertEquals(List.of("x", "y"), result);
    }
}
