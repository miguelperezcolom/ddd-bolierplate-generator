package io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.BusinessRuleRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;
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
