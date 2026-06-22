package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.usecases.${aggregate.name?lower_case}.delete;

import java.util.List;

public record Delete${aggregate.name}Command(List<String> ids) {
    }
