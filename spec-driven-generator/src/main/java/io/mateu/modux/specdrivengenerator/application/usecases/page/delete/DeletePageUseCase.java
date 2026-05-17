package io.mateu.modux.specdrivengenerator.application.usecases.page.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;
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
