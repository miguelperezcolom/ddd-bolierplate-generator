package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.subscription;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.SubscriptionActionData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.ScalingStrategy;
import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.create.CreateSubscriptionCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.create.CreateSubscriptionUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.save.SaveSubscriptionCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.save.SaveSubscriptionUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.Tab;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class SubscriptionViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @NotEmpty
    String eventName;

    String sourceService;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String inputModelId;

    String topicName;
    String consumerGroup;
    Integer retryCount;
    String deadLetterTopic;
    ScalingStrategy scalingStrategy;
    String filterExpression;

    @Tab
    List<SubscriptionActionViewModel> actions = new ArrayList<>();

    final CreateSubscriptionUseCase createUseCase;
    final SaveSubscriptionUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateSubscriptionCommand(id, name, eventName, sourceService, inputModelId, topicName, consumerGroup, retryCount, deadLetterTopic, toActionData(actions), scalingStrategy != null ? scalingStrategy.name() : null, filterExpression));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveSubscriptionCommand(id, name, eventName, sourceService, inputModelId, topicName, consumerGroup, retryCount, deadLetterTopic, toActionData(actions), scalingStrategy != null ? scalingStrategy.name() : null, filterExpression));
    }

    @Override
    public String id() {
        return id;
    }

    public SubscriptionViewModel load(SubscriptionDto model) {
        id = model.id();
        name = model.name();
        eventName = model.eventName();
        sourceService = model.sourceService();
        inputModelId = model.inputModelId();
        topicName = model.topicName();
        consumerGroup = model.consumerGroup();
        retryCount = model.retryCount();
        deadLetterTopic = model.deadLetterTopic();
        scalingStrategy = model.scalingStrategy() != null ? ScalingStrategy.valueOf(model.scalingStrategy()) : null;
        filterExpression = model.filterExpression();
        actions = model.actions() == null ? new ArrayList<>() : model.actions().stream().map(a -> {
            var vm = new SubscriptionActionViewModel();
            vm.id = a.id();
            vm.name = a.name();
            vm.type = a.type();
            vm.useCaseId = a.useCaseId();
            vm.sagaId = a.sagaId();
            vm.projectionId = a.projectionId();
            vm.modelMappingId = a.modelMappingId();
            return vm;
        }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<SubscriptionActionData> toActionData(List<SubscriptionActionViewModel> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new SubscriptionActionData(a.id, a.name, a.type,
                        a.useCaseId, a.sagaId, a.projectionId, a.modelMappingId))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New subscription";
    }
}
