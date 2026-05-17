package ${project.packageName}.${module.slug}.infra.in.rest;

import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}Command;
import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${usecase.restPath!'/' + usecase.name?lower_case?replace("[^a-z0-9]","-",'r')}")
@RequiredArgsConstructor
public class ${usecase.name?cap_first}Controller {

    final ${usecase.name?cap_first}UseCase useCase;

    @${(usecase.restHttpMethod?upper_case!'POST')?cap_first}Mapping
    public ResponseEntity<Void> handle(@RequestBody ${usecase.name?cap_first}Command command) {
        useCase.handle(command);
        return ResponseEntity.ok().build();
    }

}
