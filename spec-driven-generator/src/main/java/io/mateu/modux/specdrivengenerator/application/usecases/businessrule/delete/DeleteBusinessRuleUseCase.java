package io.mateu.modux.specdrivengenerator.application.usecases.businessrule.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.BusinessRuleRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteBusinessRuleUseCase {

    final BusinessRuleRepository repository;

    public void handle(DeleteBusinessRuleCommand command) {
        repository.deleteAllById(command.ids().stream().map(BusinessRuleId::new).toList());
    }
}
