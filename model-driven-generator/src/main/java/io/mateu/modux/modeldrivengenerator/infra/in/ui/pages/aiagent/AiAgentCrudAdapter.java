package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aiagent;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
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
public class AiAgentCrudAdapter implements CrudAdapter<
        AiAgentViewModel,
        AiAgentViewModel,
        NoFilters,
        AiAgentRow,
        String
        > {

    final AiAgentViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<AiAgentRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, AiAgentEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new AiAgentRow(x.id(), x.name(), x.external()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, AiAgentEntity.class);
    }

    @Override
    public AiAgentViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, AiAgentEntity.class).orElseThrow());
    }

    @Override
    public AiAgentViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, AiAgentEntity.class).orElseThrow());
    }

    @Override
    public AiAgentViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
