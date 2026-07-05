package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.specsearch;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.search.SearchHit;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.search.SearchModelQueryService;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace.WorkspaceCrudAdapter;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Data adapter for the spec search page: the flat, ranked hit list comes from
 * {@link SearchModelQueryService} (the same search the MCP tool uses), and opening a result
 * delegates to the {@link WorkspaceCrudAdapter}, which already resolves any globally-unique id to
 * its concept's own view/editor. Read-only: no creation, no deletion.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class SpecSearchCrudAdapter
    implements CrudAdapter<CrudEditorForm<String>, CrudCreationForm<String>, NoFilters, SpecSearchRow, String> {

  private final SearchModelQueryService searchModelQueryService;
  private final WorkspaceCrudAdapter workspaceAdapter;

  @Override
  public ListingData<SpecSearchRow> search(
      String searchText, NoFilters filters, Pageable pageable, HttpRequest httpRequest) {
    var hits = searchModelQueryService.search(searchText);
    var rows = hits.stream()
        .skip((long) pageable.page() * pageable.size())
        .limit(pageable.size())
        .map(SpecSearchCrudAdapter::row)
        .toList();
    return new ListingData<>(new Page<>(searchText, pageable.size(), pageable.page(), hits.size(), rows));
  }

  private static SpecSearchRow row(SearchHit hit) {
    var label = hit.typeLabel() + ": " + (hit.name() != null && !hit.name().isBlank() ? hit.name() : hit.id());
    return new SpecSearchRow(label, hit.snippet() != null ? hit.snippet() : "", hit.id());
  }

  @Override
  public Object getView(String id, HttpRequest httpRequest) {
    return workspaceAdapter.getView(id, httpRequest);
  }

  @Override
  public Object getEditor(String id, HttpRequest httpRequest) {
    return workspaceAdapter.getEditor(id, httpRequest);
  }

  @Override
  public Object getCreationForm(HttpRequest httpRequest) {
    // the split view resolves /new for its empty detail pane even on a read-only crud
    return new SpecSearchPlaceholder();
  }

  @Override
  public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
    throw new UnsupportedOperationException("The search page is read-only.");
  }
}
