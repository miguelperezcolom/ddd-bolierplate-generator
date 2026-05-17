package io.mateu.modux.specdrivengenerator.application.usecases.page.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.Page;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreatePageUseCase {

    final PageRepository repository;

    public void handle(CreatePageCommand command) {
        var page = Page.of(
                new PageId(command.id()),
                new PageName(command.name()),
                command.route(),
                command.type(),
                command.aggregateId(),
                command.modelId(),
                command.componentIds());
        repository.save(page);
    }
}
