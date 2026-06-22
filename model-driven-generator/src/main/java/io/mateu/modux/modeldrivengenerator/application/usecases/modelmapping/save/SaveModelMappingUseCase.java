package io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModelMappingRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.ModelMappingExpressionData;
import io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.ModelMappingRuleData;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingExpression;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingHasCustomPart;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingRule;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingSourceModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingTargetModelId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveModelMappingUseCase {

    final ModelMappingRepository repository;

    public void handle(SaveModelMappingCommand command) {
        var mapping = repository.findById(new ModelMappingId(command.id())).orElseThrow();
        var rules = toRules(command.rules());
        mapping.update(
                new ModelMappingName(command.name()),
                command.sourceModelId() != null ? new ModelMappingSourceModelId(command.sourceModelId()) : null,
                command.targetModelId() != null ? new ModelMappingTargetModelId(command.targetModelId()) : null,
                new ModelMappingHasCustomPart(command.hasCustomPart()),
                rules);
        repository.save(mapping);
    }

    private List<ModelMappingRule> toRules(List<ModelMappingRuleData> rules) {
        if (rules == null) return List.of();
        return rules.stream().map(r -> new ModelMappingRule(r.id(), r.sourceFieldId(), r.targetFieldId(),
                r.expressions() == null ? List.of() :
                        r.expressions().stream()
                                .map(e -> new ModelMappingExpression(e.id(), e.inputExpression(), e.outputExpression()))
                                .toList())).toList();
    }
}
