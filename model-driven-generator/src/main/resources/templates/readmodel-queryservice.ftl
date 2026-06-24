package ${project.packageName}.${module.slug}.application.query;

import ${project.packageName}.${module.slug}.application.query.readmodel.${className};

import java.util.List;
import java.util.Optional;

public interface ${className}QueryService {

    Optional<${className}> getById(String id);

    List<${className}> findAll();
}
