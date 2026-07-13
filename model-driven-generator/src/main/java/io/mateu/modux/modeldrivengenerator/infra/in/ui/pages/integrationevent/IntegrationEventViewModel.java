package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.integrationevent;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.IntegrationEventDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.create.CreateIntegrationEventCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.create.CreateIntegrationEventUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.save.SaveIntegrationEventCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.save.SaveIntegrationEventUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdOptionsSupplier;
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

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class IntegrationEventViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    String boundedContextId;

    String description;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    String sourceDomainEventId;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String payloadModelId;

    @Tab("Publishing")
    String topicName;
    Integer partitions;
    Long retentionMs;
    IntegrationEventSerializationFormat serializationFormat;
    IntegrationEventCompressionType compressionType;
    String routingKeyField;
    String schemaVersion;

    @Tab("Reliability")
    boolean deadLetterQueueEnabled;
    @Hidden("!state['deadLetterQueueEnabled']")
    String deadLetterQueueName;
    @Hidden("!state['deadLetterQueueEnabled']")
    Integer maxDeliveryAttempts;
    boolean replayable;

    final CreateIntegrationEventUseCase createUseCase;
    final SaveIntegrationEventUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateIntegrationEventCommand(id, name, boundedContextId, description,
                sourceDomainEventId, payloadModelId, topicName, partitions, retentionMs,
                serializationFormat, compressionType,
                deadLetterQueueEnabled, deadLetterQueueName, maxDeliveryAttempts,
                schemaVersion, routingKeyField, replayable));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveIntegrationEventCommand(id, name, boundedContextId, description,
                sourceDomainEventId, payloadModelId, topicName, partitions, retentionMs,
                serializationFormat, compressionType,
                deadLetterQueueEnabled, deadLetterQueueName, maxDeliveryAttempts,
                schemaVersion, routingKeyField, replayable));
    }

    @Override
    public String id() {
        return id;
    }

    public IntegrationEventViewModel load(IntegrationEventDto model) {
        id = model.id();
        name = model.name();
        boundedContextId = model.boundedContextId();
        description = model.description();
        sourceDomainEventId = model.sourceDomainEventId();
        payloadModelId = model.payloadModelId();
        topicName = model.topicName();
        partitions = model.partitions();
        retentionMs = model.retentionMs();
        serializationFormat = model.serializationFormat();
        compressionType = model.compressionType();
        deadLetterQueueEnabled = model.deadLetterQueueEnabled();
        deadLetterQueueName = model.deadLetterQueueName();
        maxDeliveryAttempts = model.maxDeliveryAttempts();
        schemaVersion = model.schemaVersion();
        routingKeyField = model.routingKeyField();
        replayable = model.replayable();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New integration event";
    }

}
