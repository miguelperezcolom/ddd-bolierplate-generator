package io.mateu.modux.modeldrivengenerator.application.usecases.role.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.RoleRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.role.vo.RoleId;
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
