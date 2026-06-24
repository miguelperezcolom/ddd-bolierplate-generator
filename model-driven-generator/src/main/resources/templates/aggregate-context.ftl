package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case};

/** Context passed to {@link ${aggregate.name}Invariants}; exposes the aggregate's state for inspection. */
public record ${aggregate.name}Context(${aggregate.name} ${aggregate.name?uncap_first}) {
}
