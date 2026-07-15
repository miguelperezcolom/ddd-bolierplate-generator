package io.mateu.modux.figma;

import java.text.Normalizer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/** Identifier derivation: labels/titles → unique camelCase/PascalCase/snake_case names. */
class Names {

    private final Map<String, Integer> used = new HashMap<>();

    String unique(String base) {
        int n = used.merge(base, 1, Integer::sum);
        return n == 1 ? base : base + n;
    }

    static String camel(String text) {
        String cleaned = clean(text);
        if (cleaned.isEmpty()) return "value";
        String[] words = cleaned.split(" ");
        StringBuilder out = new StringBuilder(words[0]);
        for (int i = 1; i < words.length; i++) {
            out.append(Character.toUpperCase(words[i].charAt(0))).append(words[i].substring(1));
        }
        String id = out.toString();
        return Character.isDigit(id.charAt(0)) ? "v" + id : id;
    }

    static String pascal(String text) {
        String camelCase = camel(text);
        return Character.toUpperCase(camelCase.charAt(0)) + camelCase.substring(1);
    }

    static String snake(String text) {
        String cleaned = clean(text);
        if (cleaned.isEmpty()) return "value";
        String id = cleaned.replace(' ', '_');
        return Character.isDigit(id.charAt(0)) ? "v" + id : id;
    }

    private static String clean(String text) {
        if (text == null) return "";
        String noAccents = Normalizer.normalize(text, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return noAccents.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", " ")
                .trim();
    }

    static String escape(String text) {
        return text == null ? "" : text.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
