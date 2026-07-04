package io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class WhenExpressionTest {

    @Test
    void parses_the_canonical_form() {
        var when = WhenExpression.parse("Reservas.Booking recorded");
        assertEquals("Reservas", when.context());
        assertEquals("Booking", when.aggregate());
        assertEquals("recorded", when.event());
    }

    @Test
    void round_trips_through_format() {
        var text = "Reservas.Booking recorded";
        assertEquals(text, WhenExpression.parse(text).format());
    }

    @Test
    void tolerates_surrounding_and_inner_whitespace() {
        var when = WhenExpression.parse("  Reservas.Booking    recorded  ");
        assertEquals("Booking", when.aggregate());
        assertEquals("recorded", when.event());
    }

    @Test
    void rejects_a_multi_word_event() {
        assertThrows(IllegalArgumentException.class, () -> WhenExpression.parse("Reservas.Booking was recorded"));
    }

    @Test
    void rejects_a_missing_or_extra_context_separator() {
        assertThrows(IllegalArgumentException.class, () -> WhenExpression.parse("Booking recorded"));
        assertThrows(IllegalArgumentException.class, () -> WhenExpression.parse("A.B.C recorded"));
        assertThrows(IllegalArgumentException.class, () -> WhenExpression.parse("Reservas. recorded"));
    }

    @Test
    void tryParse_is_lenient() {
        assertTrue(WhenExpression.tryParse("nonsense").isEmpty());
        assertTrue(WhenExpression.tryParse("Reservas.Booking recorded").isPresent());
    }
}
