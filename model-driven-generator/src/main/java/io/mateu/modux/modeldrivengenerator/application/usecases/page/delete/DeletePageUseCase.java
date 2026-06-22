package io.mateu.modux.modeldrivengenerator.application.usecases.page.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeletePageUseCase {

    final PageRepository repository;

    public void handle(DeletePageCommand command) {
        repository.deleteAllById(command.ids().stream().map(PageId::new).toList());
    }
}
