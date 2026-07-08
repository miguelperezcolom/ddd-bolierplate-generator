package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.RoleRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.role.Role;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.role.vo.RoleId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleFileRepository implements RoleRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Role> findById(RoleId id) {
        return repository.findById(id.id(), RoleEntity.class)
                .map(entity -> Role.load(
                        entity.id(),
                        entity.name(),
                        entity.allowedUseCaseIds()));
    }

    @Override
    public Role save(Role entity) {
        // allowedQueryServiceIds and externalSystemIds are not modeled in the domain Role yet —
        // carry them over from the stored entity so a UI save never wipes what was authored elsewhere.
        var existing = repository.findById(entity.getId().id(), RoleEntity.class).orElse(null);
        repository.save(new RoleEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getAllowedUseCaseIds(),
                existing != null ? existing.allowedQueryServiceIds() : List.of(),
                existing != null ? existing.externalSystemIds() : List.of()));
        return entity;
    }

    @Override
    public void deleteAllById(List<RoleId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(RoleId::id).toList(), RoleEntity.class);
    }
}
