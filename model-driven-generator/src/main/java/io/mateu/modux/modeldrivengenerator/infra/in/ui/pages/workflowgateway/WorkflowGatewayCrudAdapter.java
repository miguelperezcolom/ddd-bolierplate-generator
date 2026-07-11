package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
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
public class WorkflowGatewayCrudAdapter implements CrudAdapter<
        WorkflowGatewayViewModel,
        WorkflowGatewayViewModel,
        NoFilters,
        WorkflowGatewayRow,
        String
        > {

    final WorkflowGatewayViewModel viewModel;
    final ModelStore repository;

    @Override
    public ListingData<WorkflowGatewayRow> search(String searchText,
                                                  NoFilters filters,
                                                  Pageable pageable,
                                                  HttpRequest httpRequest) {
        var data = repository.findAll(searchText, filters, pageable, WorkflowGatewayEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(g -> new WorkflowGatewayRow(g.id(), g.name(), g.type(),
                                g.semantics() != null ? g.semantics()
                                        : "SPLIT".equals(g.type()) ? "PARALLEL" : "ALL"))
                        .toList()));
    }

    @Override
    public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
        // other gateways let go of the deleted ones on both sides
        for (var g : repository.findAllOfType(WorkflowGatewayEntity.class)) {
            if (selectedIds.contains(g.id())) continue;
            var sources = g.sourceIds().stream().filter(x -> !selectedIds.contains(x)).toList();
            var targets = g.targetIds().stream().filter(x -> !selectedIds.contains(x)).toList();
            if (sources.size() != g.sourceIds().size() || targets.size() != g.targetIds().size()) {
                repository.save(g.toBuilder().sourceIds(sources).targetIds(targets).build());
            }
        }
        repository.deleteAllById(selectedIds, WorkflowGatewayEntity.class);
    }

    @Override
    public WorkflowGatewayViewModel getView(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, WorkflowGatewayEntity.class).orElseThrow());
    }

    @Override
    public WorkflowGatewayViewModel getEditor(String id, HttpRequest httpRequest) {
        return viewModel.load(repository.findById(id, WorkflowGatewayEntity.class).orElseThrow());
    }

    @Override
    public WorkflowGatewayViewModel getCreationForm(HttpRequest httpRequest) {
        return viewModel;
    }
}
