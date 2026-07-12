package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.externalsystem;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorProjectSupport;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ExternalSystemCrudAdapter implements CrudAdapter<
        ExternalSystemViewModel,
        ExternalSystemViewModel,
        NoFilters,
        ExternalSystemRow,
        String
        > {

    final ExternalSystemViewModel viewModel;
    final ModelStore repository;
    final EditorProjectSupport projects;

    private List<ExternalSystemEntity> all() {
        return projects.currentProject()
                .map(p -> p.externalSystems())
                .orElse(List.of());
    }

    @Override
    public ListingData<ExternalSystemRow> search(String searchText,
                                                 NoFilters filters,
                                                 Pageable pageable,
                                                 HttpRequest httpRequest) {
        var found = all().stream()
                .filter(x -> searchText == null || searchText.isBlank()
                        || x.name().toLowerCase().contains(searchText.toLowerCase()))
                .toList();
        return new ListingData<>(new Page<>(
                searchText, found.size(), 0, found.size(),
                found.stream()
                        .map(x -> new ExternalSystemRow(x.id(), x.name(),
                                x.protocol() == null ? null : x.protocol().name(),
                                x.direction() == null ? null : x.direction().name()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        var project = projects.owningProject();
        repository.save(EditorProjectSupport.withExternalSystems(project,
                project.externalSystems().stream()
                        .filter(x -> !selectedIds.contains(x.id()))
                        .toList()));
    }

    private ExternalSystemEntity byId(String id) {
        return all().stream().filter(x -> x.id().equals(id)).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
    }

    @Override
    public ExternalSystemViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(byId(id));
    }

    @Override
    public ExternalSystemViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(byId(id));
    }

    @Override
    public ExternalSystemViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
