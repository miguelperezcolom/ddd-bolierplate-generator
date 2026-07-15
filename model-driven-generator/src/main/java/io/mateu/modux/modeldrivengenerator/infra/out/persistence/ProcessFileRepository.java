package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProcessRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.Process;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStep;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProcessFileRepository implements ProcessRepository {

    final ModelStore repository;

    @Override
    public Optional<Process> findById(ProcessId id) {
        return repository.findById(id.id(), ProcessEntity.class)
                .map(entity -> Process.load(entity.id(), entity.name(), entity.description(),
                        entity.triggerAggregateId(), entity.triggerEvent(), entity.ownerBoundedContextId(),
                        toSteps(entity.steps()), entity.onCompletionEventName(), entity.sla()));
    }

    @Override
    public Process save(Process entity) {
        // decisionIds are not modeled in the domain Process yet — carry them over from the stored
        // entity so a UI save never wipes what was authored in the YAML store.
        var existing = repository.findById(entity.getId().id(), ProcessEntity.class).orElse(null);
        repository.save(new ProcessEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDescription(),
                entity.getTriggerAggregateId(),
                entity.getTriggerEvent(),
                entity.getOwnerBoundedContextId(),
                toStepEntities(entity.getSteps()),
                entity.getOnCompletionEventName(),
                entity.getSla(),
                existing != null ? existing.decisionIds() : List.of(), null));
        return entity;
    }

    @Override
    public void deleteAllById(List<ProcessId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ProcessId::id).toList(), ProcessEntity.class);
    }

    private static List<ProcessStep> toSteps(List<ProcessStepEntity> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new ProcessStep(s.id(), s.name(), s.type(), s.useCaseId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(), s.description()))
                .toList();
    }

    private static List<ProcessStepEntity> toStepEntities(List<ProcessStep> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new ProcessStepEntity(s.id(), s.name(), s.type(), s.useCaseId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(), s.description()))
                .toList();
    }
}
