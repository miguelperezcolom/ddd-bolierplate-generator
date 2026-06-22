package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.QueryServiceRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteQueryServiceUseCase {

    final QueryServiceRepository repository;

    public void handle(DeleteQueryServiceCommand command) {
        repository.deleteAllById(command.ids().stream().map(QueryServiceId::new).toList());
    }

}
