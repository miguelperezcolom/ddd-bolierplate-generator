package io.mateu.modux.specdrivengenerator.application.usecases.page.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SavePageUseCase {

    final PageRepository repository;

    public void handle(SavePageCommand command) {
        var page = repository.findById(new PageId(command.id())).orElseThrow();
        page.update(
                new PageName(command.name()),
                command.route(),
                command.type(),
                command.aggregateId(),
                command.modelId(),
                command.componentIds(),
                command.listingDataSourceType(),
                command.listingQueryServiceId(),
                command.listingGatewayId());
        repository.save(page);
    }
}
