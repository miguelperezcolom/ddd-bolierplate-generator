package io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiAdapterRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAdapterId;
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
