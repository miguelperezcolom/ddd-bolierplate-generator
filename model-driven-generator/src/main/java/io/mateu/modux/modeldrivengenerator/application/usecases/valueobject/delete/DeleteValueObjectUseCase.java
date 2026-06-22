package io.mateu.modux.modeldrivengenerator.application.usecases.valueobject.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ValueObjectRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.vo.ValueObjectId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteValueObjectUseCase {

    final ValueObjectRepository repository;

    public void handle(DeleteValueObjectCommand command) {
        repository.deleteAllById(command.ids().stream().map(ValueObjectId::new).toList());
    }

}
