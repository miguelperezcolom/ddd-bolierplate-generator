package ${project.packageName}.${module.slug}.infra.in.rest;

import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}Command;
import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<#assign apiVer = (usecase.apiVersion?? && usecase.apiVersion?has_content)?then(usecase.apiVersion, 'v1')>
<#if !apiVer?starts_with("v")><#assign apiVer = "v" + apiVer></#if>
<#assign basePath = usecase.restPath!('/' + usecase.name?lower_case?replace("[^a-z0-9]","-",'r'))>
@RestController
@RequestMapping("/${apiVer}${basePath}")
@RequiredArgsConstructor
public class ${usecase.name?cap_first}Controller {

    final ${usecase.name?cap_first}UseCase useCase;

    @${((usecase.restHttpMethod)!'POST')?lower_case?cap_first}Mapping
    public ResponseEntity<Void> handle(@RequestBody ${usecase.name?cap_first}Command command) {
        useCase.handle(command);
        return ResponseEntity.ok().build();
    }

}
