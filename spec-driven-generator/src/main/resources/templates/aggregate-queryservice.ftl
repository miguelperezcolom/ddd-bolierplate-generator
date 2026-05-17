package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.query;

import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.query.dto.${aggregate.name}Dto;
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.query.dto.${aggregate.name}Row;

public interface ${aggregate.name}QueryService extends QueryService<${aggregate.name}Dto, ${aggregate.name}Row, Long> {
}
