package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.core.infra.declarative.orchestrators.crud.Crud;
import io.mateu.uidl.annotations.NotCreatable;
import io.mateu.uidl.annotations.NotDeletable;
import io.mateu.uidl.annotations.SplitCrud;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.fluent.GridLayout;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.reflection.GenericClassProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * The workspace as a heterogeneous tree-CRUD: a split view whose master list is rendered as a treegrid
 * ({@code gridLayout = tree}) of the whole model (Project ▸ Service ▸ Module ▸ Aggregates/Entities/…),
 * and whose detail pane shows the selected node's own editor. The framework handles selection→editor and
 * save routing; this class only supplies the tree data (via {@link WorkspaceCrudAdapter}) and delegates
 * save to the right concept editor by decoding the composite id.
 */
@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Workspace")
@SplitCrud
@NotCreatable
@NotDeletable
public class WorkspaceCrudOrchestrator
    extends Crud<
        CrudEditorForm<String>,
        CrudEditorForm<String>,
        CrudCreationForm<String>,
        NoFilters,
        WorkspaceRow,
        String> {

  private final WorkspaceCrudAdapter adapter;

  @Override
  public CrudAdapter<CrudEditorForm<String>, CrudCreationForm<String>, NoFilters, WorkspaceRow, String>
      adapter() {
    return adapter;
  }

  @Override
  public GridLayout gridLayout() {
    return GridLayout.tree;
  }

  @Override
  public boolean searchable() {
    return true;
  }

  @Override
  public boolean selectionEnabled() {
    return false;
  }

  @Override
  public String toId(String s) {
    return s;
  }

  @Override
  public String getIdFieldForRow() {
    return "id";
  }

  @Override
  @SuppressWarnings({"rawtypes", "unchecked"})
  public Object search(String searchText, Object filters, Pageable pageable, HttpRequest httpRequest) {
    return ((CrudAdapter) adapter()).search(searchText, filters, pageable, httpRequest);
  }

  @Override
  public Object save(HttpRequest httpRequest) {
    var id = httpRequest.getString(getIdFieldForRow());
    Object editor = adapter.getEditor(id, httpRequest);
    if (editor instanceof CrudEditorForm<?> form) {
      form.save(httpRequest);
    }
    return id;
  }

  @Override
  public Object saveNew(HttpRequest httpRequest) {
    return null;
  }

  @Override
  @SuppressWarnings({"rawtypes", "unchecked"})
  public Class editorClass() {
    return GenericClassProvider.getGenericClass(this.getClass(), Crud.class, "Editor");
  }

  @Override
  @SuppressWarnings({"rawtypes", "unchecked"})
  public Class creationFormClass() {
    return GenericClassProvider.getGenericClass(this.getClass(), Crud.class, "CreationForm");
  }
}
