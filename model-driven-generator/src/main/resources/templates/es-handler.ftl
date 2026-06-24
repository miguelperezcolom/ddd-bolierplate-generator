package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.out.persistence;

import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;

import java.util.List;

/**
 * The two-zone hook for the event-sourced ${aggregate.name} aggregate — the part that can't be derived
 * from the model. Implemented once in the developer-owned custom module by
 * {@code Default${aggregate.name}EventSourcing}.
 */
public interface ${aggregate.name}EventSourcing {

    /**
     * The domain events produced by the aggregate's latest change, to append to the event store.
     * Each is serialized to JSON; its class simple-name is stored as the event type.
     */
    List<Object> eventsOf(${aggregate.name} aggregate);

    /**
     * Rebuild ${aggregate.name} by folding its ordered event stream — the events are already decoded to
     * their domain types (via {@code ${aggregate.name}EventCodec}). Return {@code null} while
     * unimplemented; the repository then falls back to the current-state snapshot.
     */
    ${aggregate.name} replay(${aggregate.name}Id id, List<Object> events);
}
