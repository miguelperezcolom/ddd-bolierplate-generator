package io.mateu.modux.modeldrivengenerator.application.usecases.recipes;

import java.util.List;

/**
 * A starter recipe: a named, parameterized template that emits <em>intent-layer</em> elements
 * (flows, processes) instead of asking the author for the structural pieces they expand into.
 * Recipes are the "start from intent" entry point of the escalera de intención.
 */
public record Recipe(String id, String name, String description, List<RecipeParam> params) {

    public record RecipeParam(String name, String description, boolean required) {
    }
}
