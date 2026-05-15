package io.mateu.mdd.specdrivengenerator.application.usecases.role.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.RoleRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.role.Role;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.role.vo.RoleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.role.vo.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateRoleUseCase {

    final RoleRepository repository;

    public void handle(CreateRoleCommand command) {
        var role = Role.of(
                new RoleId(command.id()),
                new RoleName(command.name()),
                command.allowedUseCaseIds(),
                command.allowedReadModelIds());
        repository.save(role);
    }
}
