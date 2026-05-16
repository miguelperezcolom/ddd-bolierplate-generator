package io.mateu.modux.specdrivengenerator.application.usecases.subscription.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.SubscriptionRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteSubscriptionUseCase {

    final SubscriptionRepository repository;

    public void handle(DeleteSubscriptionCommand command) {
        repository.deleteAllById(command.ids().stream().map(SubscriptionId::new).toList());
    }
}
