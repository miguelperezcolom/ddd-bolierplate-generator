package ${project.packageName}.${module.slug}.infra.in.rest;

import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.className}Command;
<#if outputModel??>
import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.className}Result;
</#if>
import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.className}UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<#assign apiVer = (usecase.apiVersion?? && usecase.apiVersion?has_content)?then(usecase.apiVersion, 'v1')>
<#if !apiVer?starts_with("v")><#assign apiVer = "v" + apiVer></#if>
<#assign basePath = usecase.restPath!('/' + usecase.name?lower_case?replace("[^a-z0-9]","-",'r'))>
@RestController
@RequestMapping("/${apiVer}${basePath}")
@RequiredArgsConstructor
public class ${usecase.className}Controller {

    final ${usecase.className}UseCase useCase;

    @${((usecase.restHttpMethod)!'POST')?lower_case?cap_first}Mapping
<#if outputModel??>
    public ResponseEntity<${usecase.className}Result> handle(@RequestBody ${usecase.className}Command command) {
        return ResponseEntity.ok(useCase.handle(command));
    }
<#else>
    public ResponseEntity<Void> handle(@RequestBody ${usecase.className}Command command) {
        useCase.handle(command);
        return ResponseEntity.ok().build();
    }
</#if>

}
