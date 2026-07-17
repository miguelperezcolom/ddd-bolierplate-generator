<#assign ucSlug = usecase.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign ucClass = usecase.name?cap_first>
package ${project.packageName}.${module.slug}.infra.in.ui.pages.${ucSlug};

import ${project.packageName}.${module.slug}.application.usecases.${ucSlug}.${ucClass}Command;
<#if outputModel??>
import ${project.packageName}.${module.slug}.application.usecases.${ucSlug}.${ucClass}Result;
</#if>
import ${project.packageName}.${module.slug}.application.usecases.${ucSlug}.${ucClass}UseCase;
import io.mateu.uidl.StyleConstants;
import io.mateu.uidl.annotations.Button;
import io.mateu.uidl.annotations.Notice;
import io.mateu.uidl.annotations.Stereotype;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.ButtonStyle;
import io.mateu.uidl.data.FieldStereotype;
import io.mateu.uidl.data.Message;
import io.mateu.uidl.data.State;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if inputModel?? && inputModel.fields?has_content>
<#list inputModel.fields as field>
<#if field.basicType?? && field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "dateTime"><#assign hasDateTime = true></#if>
<#if field.type == "number" || field.type == "money"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
<#if hasDate>
import java.time.LocalDate;
</#if>
<#if hasTime>
import java.time.LocalTime;
</#if>
<#if hasDateTime>
import java.time.LocalDateTime;
</#if>
<#if hasBigDecimal>
import java.math.BigDecimal;
</#if>
import java.util.List;

/**
 * UI page of the ${usecase.name} use case (exposedAsUi): the fields are its command, the
 * primary action executes it. View model only — the behaviour lives in the use case.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
@Title("${usecase.name?cap_first}")
@Style(StyleConstants.CONTAINER)
public class ${ucClass}Page {

<#if inputModel?? && inputModel.fields?has_content>
<#list inputModel.fields as field>
<#if field.basicType?? && field.basicType>
    <#if field.type == "integer">
    Integer ${field.name};
    <#elseif field.type == "number" || field.type == "money">
    BigDecimal ${field.name};
    <#elseif field.type == "bool">
    Boolean ${field.name};
    <#elseif field.type == "date">
    LocalDate ${field.name};
    <#elseif field.type == "time">
    LocalTime ${field.name};
    <#elseif field.type == "dateTime">
    LocalDateTime ${field.name};
    <#elseif field.type == "array" || field.type == "json">
    @Stereotype(FieldStereotype.textarea)
    String ${field.name};
    <#else>
    String ${field.name};
    </#if>
<#else>
    String ${field.name}Id;
</#if>
</#list>
<#else>
    String id;
</#if>

    @Notice(theme = "success", fullWidth = true)
    String resultado = "";

    private final ${ucClass}UseCase useCase;

    @Button(buttonStyle = ButtonStyle.primary)
    public Object ${usecase.name?uncap_first}() {
<#if outputModel??>
        ${ucClass}Result result = useCase.handle(new ${ucClass}Command(<#if inputModel?? && inputModel.fields?has_content><#list inputModel.fields as field><#if field.basicType?? && field.basicType>${field.name}<#else>${field.name}Id</#if><#sep>, </#sep></#list><#else>id</#if>));
        resultado = String.valueOf(result);
<#else>
        useCase.handle(new ${ucClass}Command(<#if inputModel?? && inputModel.fields?has_content><#list inputModel.fields as field><#if field.basicType?? && field.basicType>${field.name}<#else>${field.name}Id</#if><#sep>, </#sep></#list><#else>id</#if>));
        resultado = "${usecase.name} ejecutado";
</#if>
        return List.of(new Message("${usecase.name?cap_first}: hecho"), new State(this));
    }

}
