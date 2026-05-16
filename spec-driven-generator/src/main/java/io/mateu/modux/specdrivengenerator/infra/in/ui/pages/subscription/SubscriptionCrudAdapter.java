package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.subscription;

import io.mateu.modux.specdrivengenerator.application.out.query.SubscriptionQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.SubscriptionRow;
import io.mateu.modux.specdrivengenerator.application.usecases.subscription.delete.DeleteSubscriptionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.subscription.delete.DeleteSubscriptionUseCase;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
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
public class SubscriptionCrudAdapter implements CrudAdapter<
        SubscriptionViewModel,
        SubscriptionViewModel,
        SubscriptionViewModel,
        NoFilters,
        SubscriptionRow,
        String
        > {

    final SubscriptionViewModel viewModel;
    final DeleteSubscriptionUseCase deleteUseCase;
    final SubscriptionQueryService queryService;

    @Override
    public ListingData<SubscriptionRow> search(String searchText,
                                               NoFilters filters,
                                               Pageable pageable,
                                               HttpRequest httpRequest) {
        return queryService.findAll(searchText, filters, pageable);
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        deleteUseCase.handle(new DeleteSubscriptionCommand(selectedIds));
    }

    @Override
    public SubscriptionViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public SubscriptionViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(queryService.getById(id).orElseThrow());
    }

    @Override
    public SubscriptionViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
