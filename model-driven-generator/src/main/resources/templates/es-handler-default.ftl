<#assign mpkg = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.custom;

import ${project.packageName}.${mpkg}.infra.out.persistence.${aggregate.name}EventSourcing;
import ${project.packageName}.${mpkg}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import ${project.packageName}.${mpkg}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Developer-owned event-sourcing logic for ${aggregate.name}: how operations turn into domain events,
 * and how the (decoded) event stream folds back into aggregate state. Scaffolded once by Modux and
 * never overwritten.
 */
@Component
public class Default${aggregate.name}EventSourcing implements ${aggregate.name}EventSourcing {

    @Override
    public List<Object> eventsOf(${aggregate.name} aggregate) {
        // TODO: return the domain events produced by the aggregate's latest change (instances of the
        // {Event}Event records in domain.events). While this is empty, no events are appended and reads
        // use the current-state snapshot.
        return List.of();
    }

    @Override
    public ${aggregate.name} replay(${aggregate.name}Id id, List<Object> events) {
        // TODO: fold the decoded domain events to rebuild the aggregate, e.g.:
        //   ${aggregate.name} state = null;
        //   for (var event : events) {
        //       if (event instanceof SomeEvent e) { state = ...; }
        //   }
        //   return state;
        // Returning null falls back to the current-state snapshot.
        return null;
    }
}
