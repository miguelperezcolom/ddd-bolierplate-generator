package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.mcpgateway;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpGatewayEntity;
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
public class McpGatewayCrudAdapter implements CrudAdapter<
        McpGatewayViewModel,
        McpGatewayViewModel,
        NoFilters,
        McpGatewayRow,
        String
        > {

    final McpGatewayViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<McpGatewayRow> search(String searchText,
                                         NoFilters filters,
                                         Pageable pageable,
                                         HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, McpGatewayEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(x -> new McpGatewayRow(x.id(), x.name()))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        repository.deleteAllById(selectedIds, McpGatewayEntity.class);
    }

    @Override
    public McpGatewayViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, McpGatewayEntity.class).orElseThrow());
    }

    @Override
    public McpGatewayViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, McpGatewayEntity.class).orElseThrow());
    }

    @Override
    public McpGatewayViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
