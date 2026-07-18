package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.interaction;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionEntity;
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
public class InteractionCrudAdapter implements CrudAdapter<
        InteractionViewModel,
        InteractionViewModel,
        NoFilters,
        InteractionRow,
        String
        > {

    final InteractionViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<InteractionRow> search(String searchText,
                                              NoFilters filters,
                                              Pageable pageable,
                                              HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, InteractionEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new InteractionRow(x.id(), x.name(), trigger(x), x.messages().size()))
                        .toList()));
    }

    /** Trigger as one compact column: "ACTOR · huesped". */
    private static String trigger(InteractionEntity entity) {
        if (entity.triggerKind() == null) return "";
        return entity.triggerKind().name()
                + (entity.triggerRef() != null && !entity.triggerRef().isBlank()
                        ? " · " + entity.triggerRef() : "");
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, InteractionEntity.class);
    }

    @Override
    public InteractionViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, InteractionEntity.class).orElseThrow());
    }

    @Override
    public InteractionViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, InteractionEntity.class).orElseThrow());
    }

    @Override
    public InteractionViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
