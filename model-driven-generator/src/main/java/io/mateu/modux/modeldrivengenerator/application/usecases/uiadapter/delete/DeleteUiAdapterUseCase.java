package io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.UiAdapterRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteUiAdapterUseCase {

    final UiAdapterRepository repository;

    public void handle(DeleteUiAdapterCommand command) {
        repository.deleteAllById(command.ids().stream().map(UiAdapterId::new).toList());
    }
}
