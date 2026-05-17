package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.domainevent;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.DomainEventDto;
import io.mateu.modux.specdrivengenerator.application.usecases.domainevent.create.CreateDomainEventCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.domainevent.create.CreateDomainEventUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.domainevent.save.SaveDomainEventCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.domainevent.save.SaveDomainEventUseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventCompressionType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventSerializationFormat;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
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
public class DomainEventViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    boolean publishAsIntegrationEvent;

    @Hidden("!state['publishAsIntegrationEvent']")
    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String integrationModelId;

    @Hidden("!state['publishAsIntegrationEvent']")
    String topicName;
    @Hidden("!state['publishAsIntegrationEvent']")
    Integer partitions;
    @Hidden("!state['publishAsIntegrationEvent']")
    Long retentionMs;
    @Hidden("!state['publishAsIntegrationEvent']")
    DomainEventSerializationFormat serializationFormat;
    @Hidden("!state['publishAsIntegrationEvent']")
    DomainEventCompressionType compressionType;
    @Hidden("!state['publishAsIntegrationEvent']")
    boolean deadLetterQueueEnabled;
    @Hidden("!state['publishAsIntegrationEvent'] || !state['deadLetterQueueEnabled']")
    String deadLetterQueueName;
    @Hidden("!state['publishAsIntegrationEvent'] || !state['deadLetterQueueEnabled']")
    Integer maxDeliveryAttempts;
    @Hidden("!state['publishAsIntegrationEvent']")
    String schemaVersion;
    @Hidden("!state['publishAsIntegrationEvent']")
    String routingKeyField;
    @Hidden("!state['publishAsIntegrationEvent']")
    boolean replayable;

    final CreateDomainEventUseCase createUseCase;
    final SaveDomainEventUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateDomainEventCommand(id, name, modelId, publishAsIntegrationEvent, integrationModelId, topicName, partitions, retentionMs, serializationFormat != null ? serializationFormat.name() : null, compressionType != null ? compressionType.name() : null, deadLetterQueueEnabled, deadLetterQueueName, maxDeliveryAttempts, schemaVersion, routingKeyField, replayable));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveDomainEventCommand(id, name, modelId, publishAsIntegrationEvent, integrationModelId, topicName, partitions, retentionMs, serializationFormat != null ? serializationFormat.name() : null, compressionType != null ? compressionType.name() : null, deadLetterQueueEnabled, deadLetterQueueName, maxDeliveryAttempts, schemaVersion, routingKeyField, replayable));
    }

    @Override
    public String id() {
        return id;
    }

    public DomainEventViewModel load(DomainEventDto model) {
        id = model.id();
        name = model.name();
        modelId = model.modelId();
        publishAsIntegrationEvent = model.publishAsIntegrationEvent();
        integrationModelId = model.integrationModelId();
        topicName = model.topicName();
        partitions = model.partitions();
        retentionMs = model.retentionMs();
        serializationFormat = model.serializationFormat() != null ? DomainEventSerializationFormat.valueOf(model.serializationFormat()) : null;
        compressionType = model.compressionType() != null ? DomainEventCompressionType.valueOf(model.compressionType()) : null;
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
        return id != null ? name : "New domain event";
    }

}
