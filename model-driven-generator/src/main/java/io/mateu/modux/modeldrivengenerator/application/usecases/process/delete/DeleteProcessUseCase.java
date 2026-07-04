package io.mateu.modux.modeldrivengenerator.application.usecases.process.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProcessRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteProcessUseCase {

    final ProcessRepository repository;

    public void handle(DeleteProcessCommand command) {
        repository.deleteAllById(command.ids().stream().map(ProcessId::new).toList());
    }
}
