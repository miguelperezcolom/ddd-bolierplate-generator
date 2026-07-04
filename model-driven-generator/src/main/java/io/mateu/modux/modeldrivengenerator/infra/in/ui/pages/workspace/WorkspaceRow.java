package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.uidl.annotations.Hidden;
import java.util.List;

/**
 * A node of the workspace tree-CRUD.
 *
 * <p>{@code label} is the first (and only visible) column, rendered as the expandable tree column.
 * {@code id} is the component's <b>real</b> id for openable nodes (unique across the project, so the
 * workspace routes on the plain id and the opened editor reports that same id — view/edit/save work like
 * any CRUD). Grouping/info nodes carry a synthetic, non-routable id (so the tree still has a stable id per
 * row for expansion tracking via {@code itemIdPath}) and {@code viewable=false} (no View button, no
 * editor). Both {@code id} and {@code viewable} are {@code @Hidden} (not columns) but travel in the
 * serialized row. {@code children} is a {@code Collection}, excluded from the columns, and carries the
 * sub-tree.
 */
public record WorkspaceRow(
    String label, @Hidden String id, @Hidden boolean viewable, List<WorkspaceRow> children) {

  public WorkspaceRow {
    // Normalize empty children to null: the tree's itemHasChildrenPath treats an empty array as
    // truthy and would show a (useless) expand toggle on leaf nodes.
    if (children != null && children.isEmpty()) {
      children = null;
    }
  }

  /** An openable node identified by its real component id. */
  public static WorkspaceRow of(String id, String label, List<WorkspaceRow> children) {
    return new WorkspaceRow(label, id, true, children);
  }

  /** A non-openable folder/category node (synthetic id for expansion tracking, no editor). */
  public static WorkspaceRow group(String syntheticId, String label, List<WorkspaceRow> children) {
    return new WorkspaceRow(label + " (" + children.size() + ")", syntheticId, false, children);
  }
}
