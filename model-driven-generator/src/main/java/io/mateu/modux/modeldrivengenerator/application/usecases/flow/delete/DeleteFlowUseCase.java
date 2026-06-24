package io.mateu.modux.modeldrivengenerator.application.usecases.flow.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.FlowRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteFlowUseCase {

    final FlowRepository repository;

    public void handle(DeleteFlowCommand command) {
        repository.deleteAllById(command.ids().stream().map(FlowId::new).toList());
    }

}
