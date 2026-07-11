package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.WorkflowQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowStepDto;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowStepEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkflowFileQueryService implements WorkflowQueryService {

    final ModelStore repository;

    @Override
    public ListingData<WorkflowRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, WorkflowEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new WorkflowRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, WorkflowEntity.class).map(WorkflowEntity::name).orElseThrow();
    }

    @Override
    public Optional<WorkflowDto> getById(String id) {
        return repository.findById(id, WorkflowEntity.class)
                .map(entity -> new WorkflowDto(entity.id(), entity.name(), entity.description(),
                        entity.triggerAggregateId(), entity.triggerDomainServiceId(),
                        entity.triggerUseCaseId(), entity.triggerEvent(),
                        toStepDtos(entity.steps()), entity.onCompletionEventName()));
    }

    private static List<WorkflowStepDto> toStepDtos(List<WorkflowStepEntity> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new WorkflowStepDto(s.id(), s.name(), s.emittedEventName(),
                        s.targetUseCaseId(), s.completionEventName(), s.dependsOnStepIds(),
                        s.description(), s.type(), s.handoffWorkflowId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId()))
                .toList();
    }
}
