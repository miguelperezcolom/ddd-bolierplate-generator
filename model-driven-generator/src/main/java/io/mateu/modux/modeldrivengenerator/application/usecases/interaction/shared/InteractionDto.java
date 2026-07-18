package io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionMessageEntity;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * The interaction as the editor consumes it — same shape for the authored ones (the
 * {@code interactions} of the model projection) and for the derived ones (the
 * {@code /interactions/derive} endpoint). Participants are DERIVED from the messages
 * (first-appearance order); {@code backed} is computed by the
 * {@link InteractionBackingResolver}; {@code depth} is 0 on authored interactions and the
 * DFS nesting level on derived ones (activation bars). Derived interactions carry
 * {@code id: null} and {@code ephemeral: true}.
 */
public record InteractionDto(
        String id,
        boolean ephemeral,
        String name,
        String description,
        String triggerKind,
        String triggerRef,
        List<ParticipantDto> participants,
        List<MessageDto> messages
) {

    public record ParticipantDto(String ref, String name, String type) {}

    public record MessageDto(String id, String fromRef, String toRef, String kind,
                             String label, String guard, boolean backed, int depth) {}

    /** An AUTHORED interaction (persisted in the store): depth 0, backed recomputed. */
    public static InteractionDto authored(InteractionEntity entity, InteractionCatalog catalog) {
        var messages = entity.messages().stream()
                .map(m -> toDto(m, 0, catalog))
                .toList();
        return new InteractionDto(entity.id(), false, entity.name(), entity.description(),
                entity.triggerKind() == null ? null : entity.triggerKind().name(), entity.triggerRef(),
                participantsOf(messages, catalog), messages);
    }

    public static MessageDto toDto(InteractionMessageEntity message, int depth, InteractionCatalog catalog) {
        return new MessageDto(message.id(), message.fromRef(), message.toRef(),
                message.kind() == null ? null : message.kind().name(), message.label(), message.guard(),
                InteractionBackingResolver.isBacked(catalog, message), depth);
    }

    /** Participants in first-appearance order across the messages (from, then to, per message). */
    public static List<ParticipantDto> participantsOf(List<MessageDto> messages, InteractionCatalog catalog) {
        var byRef = new LinkedHashMap<String, ParticipantDto>();
        for (var message : messages) {
            for (var ref : List.of(message.fromRef(), message.toRef())) {
                if (ref == null || byRef.containsKey(ref)) continue;
                byRef.put(ref, new ParticipantDto(ref, catalog.nameOf(ref), catalog.typeOf(ref).name()));
            }
        }
        return List.copyOf(byRef.values());
    }
}
