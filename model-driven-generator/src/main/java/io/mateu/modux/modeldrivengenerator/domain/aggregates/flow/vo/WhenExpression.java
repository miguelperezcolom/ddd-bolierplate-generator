package io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo;

import java.util.Optional;

/**
 * The compact one-line authoring form of a flow's trigger (RFC §5 / §10.1):
 * {@code <Context>.<Aggregate> <event>}, e.g. {@code Reservas.Booking recorded}.
 *
 * <p>Strict grammar so it stays legible <em>and</em> unambiguously parseable: exactly one context,
 * one aggregate, and a single event token (no whitespace in the verb — use camel/kebab if needed).
 * Internally a flow still stores the resolved parts; this VO is the sugar layer that parses to and
 * formats from them.
 */
public record WhenExpression(String context, String aggregate, String event) {

    public WhenExpression {
        if (isBlank(context) || isBlank(aggregate) || isBlank(event)) {
            throw new IllegalArgumentException("when needs a non-empty context, aggregate and event");
        }
    }

    /** Parses the compact form, throwing {@link IllegalArgumentException} on a grammar violation. */
    public static WhenExpression parse(String text) {
        if (text == null || text.isBlank()) {
            throw new IllegalArgumentException("when is empty");
        }
        var trimmed = text.trim();
        var parts = trimmed.split("\\s+");
        if (parts.length != 2) {
            throw new IllegalArgumentException(
                    "when must be '<Context>.<Aggregate> <event>' with a single event token, got: " + text);
        }
        var path = parts[0];
        var event = parts[1];
        int dot = path.indexOf('.');
        if (dot <= 0 || dot != path.lastIndexOf('.') || dot == path.length() - 1) {
            throw new IllegalArgumentException(
                    "when path must be exactly '<Context>.<Aggregate>', got: " + path);
        }
        return new WhenExpression(path.substring(0, dot), path.substring(dot + 1), event);
    }

    /** Lenient variant: {@link Optional#empty()} instead of throwing on a malformed input. */
    public static Optional<WhenExpression> tryParse(String text) {
        try {
            return Optional.of(parse(text));
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }

    /** The inverse of {@link #parse}: renders the compact one-line form. */
    public String format() {
        return context + "." + aggregate + " " + event;
    }

    /** Convenience formatter from already-resolved parts (e.g. for a read-only display). */
    public static String format(String context, String aggregate, String event) {
        return new WhenExpression(context, aggregate, event).format();
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
