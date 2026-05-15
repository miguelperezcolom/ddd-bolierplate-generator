package io.mateu.mdd.specdrivengenerator.application.usecases.role.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.RoleRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.role.vo.RoleId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteRoleUseCase {

    final RoleRepository repository;

    public void handle(DeleteRoleCommand command) {
        repository.deleteAllById(command.ids().stream().map(RoleId::new).toList());
    }
}
