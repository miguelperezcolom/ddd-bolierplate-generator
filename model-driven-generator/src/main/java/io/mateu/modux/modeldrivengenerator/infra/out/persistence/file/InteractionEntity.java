package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionTriggerKind;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * An interaction (secuencia): an ORDERED chain of messages between participants of the
 * catalog (actors, pages, use cases, aggregates, query services, external systems…) that
 * together tell one scenario end to end ("the guest confirms the online check-in and
 * housekeeping gets notified"). It generates NO runtime component — it is intent +
 * documentation + verification riding on top of the declared mechanisms (steps, flows,
 * subscriptions, wiring): a reading layer, never a second topology. Participants are not
 * declared apart; they are derived from the messages. See docs/design/sequence-scenarios.md.
 */
@Builder(toBuilder = true)
public record InteractionEntity(
        String id,
        String name,
        String description,
        /** What kicks the scenario off; null when not decided yet. */
        InteractionTriggerKind triggerKind,
        /** The trigger element id (or the event NAME when triggerKind is EVENT); null allowed. */
        String triggerRef,
        List<InteractionMessageEntity> messages
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public InteractionEntity {
        if (messages == null) messages = List.of();
    }
}
