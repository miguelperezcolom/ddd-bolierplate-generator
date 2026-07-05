package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.specsearch;

import io.mateu.core.infra.declarative.orchestrators.crud.Crud;
import io.mateu.uidl.annotations.ReadOnly;
import io.mateu.uidl.annotations.SplitCrud;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.reflection.GenericClassProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Full-text search over the whole specification, as a read-only split view: type a query in the
 * search box and every element whose id, name or YAML content matches is listed with the matching
 * line(s); selecting a hit opens that element's own view in the detail pane (same id-based routing
 * as the workspace). The listing behind it is {@code SearchModelQueryService} — the exact same
 * search the MCP {@code search_elements} tool runs, so humans and agents see the same results.
 */
@Service
@RequiredArgsConstructor
@Scope("prototype")
@Title("Search")
@SplitCrud
@ReadOnly
public class SpecSearchCrudOrchestrator
    extends Crud<
        CrudEditorForm<String>,
        CrudEditorForm<String>,
        CrudCreationForm<String>,
        NoFilters,
        SpecSearchRow,
        String> {

  private final SpecSearchCrudAdapter adapter;

  @Override
  public CrudAdapter<CrudEditorForm<String>, CrudCreationForm<String>, NoFilters, SpecSearchRow, String>
      adapter() {
    return adapter;
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
    throw new UnsupportedOperationException("The search page is read-only.");
  }

  @Override
  public Object saveNew(HttpRequest httpRequest) {
    throw new UnsupportedOperationException("The search page is read-only.");
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
