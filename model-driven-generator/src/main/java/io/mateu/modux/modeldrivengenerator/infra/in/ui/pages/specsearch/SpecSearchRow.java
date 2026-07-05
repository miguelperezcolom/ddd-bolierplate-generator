package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.specsearch;

import io.mateu.uidl.annotations.Hidden;

/**
 * One search result: {@code element} is "Type: name" and {@code match} shows the YAML line(s) the
 * query matched (empty when it matched only the id/name, or when listing without a query).
 * {@code id} is the element's real, globally-unique id, so selecting the row opens that element's
 * own view exactly like the workspace tree does.
 */
public record SpecSearchRow(String element, String match, @Hidden String id) {
}
