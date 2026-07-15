package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A reusable group of buttons, first-class: pages hook it to their toolbar or
 * bottom bar, and a group can nest other groups. The buttons are what later
 * wires to a use case, a policy or an API operation.
 */
@Builder(toBuilder = true)
public record ButtonGroupEntity(
        String id,
        String name,
        List<GroupButtonEntity> buttons,
        /** Nested groups, by reference. */
        List<String> groupIds
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public ButtonGroupEntity {
        if (buttons == null) buttons = List.of();
        if (groupIds == null) groupIds = List.of();
    }
}
