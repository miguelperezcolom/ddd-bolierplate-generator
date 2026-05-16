package io.mateu.modux.specdrivengenerator.application.usecases.role.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.RoleRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.role.vo.RoleId;
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
