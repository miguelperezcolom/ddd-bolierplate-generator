package io.mateu.modux.specdrivengenerator.application.usecases.role.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.RoleRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.role.vo.RoleId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.role.vo.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveRoleUseCase {

    final RoleRepository repository;

    public void handle(SaveRoleCommand command) {
        var role = repository.findById(new RoleId(command.id())).orElseThrow();
        role.update(
                new RoleName(command.name()),
                command.allowedUseCaseIds(),
                command.allowedReadModelIds());
        repository.save(role);
    }
}
