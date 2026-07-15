package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;
import java.util.Set;

/**
 * A notification declared by intent: WHEN an event happens, TELL these roles
 * through these channels. The template (subject/body with placeholders) is the
 * spec; delivery plumbing (provider, retries) is a generation-time decision —
 * the project's emailProvider already names the transport.
 */
public record NotificationEntity(
        String id,
        String name,
        /** The bounded context that owns (and sends) it. */
        String ownerBoundedContextId,
        /** The domain/application event that fires it. */
        String eventId,
        /** EMAIL, SMS, PUSH, WEBHOOK. */
        List<String> channels,
        /** Roles notified (their contact derives from the subject's profile). */
        List<String> recipientRoleIds,
        /** Alternative/additional recipient, as an expression (e.g. resource.cliente.email). */
        String recipientExpression,
        /** Template: subject and body with {placeholders} over the event payload. */
        String subject,
        String body
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public static final Set<String> CHANNELS = Set.of("EMAIL", "SMS", "PUSH", "WEBHOOK");

    public NotificationEntity {
        if (channels == null) channels = List.of();
        if (recipientRoleIds == null) recipientRoleIds = List.of();
    }
}
