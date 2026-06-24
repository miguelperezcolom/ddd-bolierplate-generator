package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case};

/**
 * Business invariants for {@link ${aggregate.name}} — a hook implemented in the developer-owned
 * custom module. Throw an exception to reject an invalid state.
 */
public interface ${aggregate.name}Invariants {

    void check(${aggregate.name}Context context);
}
