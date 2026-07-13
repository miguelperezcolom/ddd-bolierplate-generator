package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ProcessQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessStepDto;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProcessFileQueryService implements ProcessQueryService {

    final ModelStore repository;

    @Override
    public ListingData<ProcessRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ProcessEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ProcessRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ProcessEntity.class).map(ProcessEntity::name).orElseThrow();
    }

    @Override
    public Optional<ProcessDto> getById(String id) {
        return repository.findById(id, ProcessEntity.class)
                .map(entity -> new ProcessDto(entity.id(), entity.name(), entity.description(),
                        entity.triggerAggregateId(), entity.triggerEvent(), entity.ownerBoundedContextId(),
                        toStepDtos(entity.steps()), entity.onCompletionEventName(), entity.sla()));
    }

    private static List<ProcessStepDto> toStepDtos(List<ProcessStepEntity> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new ProcessStepDto(s.id(), s.name(), s.type(), s.useCaseId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(), s.description()))
                .toList();
    }
}
