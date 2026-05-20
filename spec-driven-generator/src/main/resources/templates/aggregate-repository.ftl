package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.out;

import ${project.packageName}.application.out.Repository;
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;

public interface ${aggregate.name}Repository extends Repository<${aggregate.name}, ${aggregate.name}Id> {
}
