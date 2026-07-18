<#assign ucSlug = usecase.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign ucClass = usecase.className>
<#function isGrid field><#return !(field.basicType?? && field.basicType) && (field.type!"") == "array" && field.modelId?? && gridClasses?? && gridClasses[field.modelId]??></#function>
<#assign hasGrids = false>
<#if inputModel?? && inputModel.fields?has_content>
<#list inputModel.fields as field><#if isGrid(field)><#assign hasGrids = true></#if></#list>
</#if>
package ${project.packageName}.${module.slug}.infra.in.ui.pages.${ucSlug};

<#if hasGrids>
import com.fasterxml.jackson.databind.ObjectMapper;
</#if>
import ${project.packageName}.${module.slug}.application.usecases.${ucSlug}.${ucClass}Command;
<#if outputModel??>
import ${project.packageName}.${module.slug}.application.usecases.${ucSlug}.${ucClass}Result;
</#if>
import ${project.packageName}.${module.slug}.application.usecases.${ucSlug}.${ucClass}UseCase;
import io.mateu.uidl.StyleConstants;
import io.mateu.uidl.annotations.Button;
<#if hasGrids>
import io.mateu.uidl.annotations.InlineEditing;
</#if>
import io.mateu.uidl.annotations.Label;
import io.mateu.uidl.annotations.Notice;
import io.mateu.uidl.annotations.Stereotype;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.ButtonStyle;
import io.mateu.uidl.data.FieldStereotype;
import io.mateu.uidl.data.Message;
import io.mateu.uidl.data.State;
<#if hasGrids>
import lombok.SneakyThrows;
</#if>
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
<#if hasGrids>
import java.util.ArrayList;
</#if>
import java.util.List;

/**
 * UI page of the ${usecase.name} use case (exposedAsUi): the fields are its command, the
 * primary action executes it. View model only — the behaviour lives in the use case.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
@Title("${usecase.title!usecase.className}")
@Style(StyleConstants.CONTAINER)
public class ${ucClass}Page {

<#if inputModel?? && inputModel.fields?has_content>
<#list inputModel.fields as field>
<#assign lbl = (field.label?? && field.label?has_content)?then('@Label("' + field.label + '")\n    ', '')>
<#if field.basicType?? && field.basicType>
    <#if field.type == "integer">
    ${lbl}Integer ${field.name};
    <#elseif field.type == "number" || field.type == "money">
    ${lbl}BigDecimal ${field.name};
    <#elseif field.type == "bool">
    ${lbl}Boolean ${field.name};
    <#elseif field.type == "date">
    ${lbl}LocalDate ${field.name};
    <#elseif field.type == "time">
    ${lbl}LocalTime ${field.name};
    <#elseif field.type == "dateTime">
    ${lbl}LocalDateTime ${field.name};
    <#elseif field.type == "array" || field.type == "json">
    ${lbl}@Stereotype(FieldStereotype.textarea)
    String ${field.name};
    <#else>
    ${lbl}String ${field.name};
    </#if>
<#elseif isGrid(field)>
    ${lbl}@InlineEditing
    @Stereotype(FieldStereotype.grid)
    List<${gridClasses[field.modelId]}> ${field.name} = new ArrayList<>();
<#else>
    ${lbl}String ${field.name}Id;
</#if>
</#list>
<#else>
    Long id;
</#if>

    @Notice(theme = "success", fullWidth = true)
    String resultado = "";

    private final ${ucClass}UseCase useCase;
<#if hasGrids>
    private final ObjectMapper objectMapper;
</#if>

    @Button(buttonStyle = ButtonStyle.primary)
<#if hasGrids>
    @SneakyThrows
</#if>
    public Object ${usecase.className?uncap_first}() {
<#assign args><#if inputModel?? && inputModel.fields?has_content><#list inputModel.fields as field><#if field.basicType?? && field.basicType>${field.name}<#elseif isGrid(field)>objectMapper.writeValueAsString(${field.name})<#else>${field.name}Id</#if><#sep>, </#sep></#list><#else>id</#if></#assign>
<#if outputModel??>
        ${ucClass}Result result = useCase.handle(new ${ucClass}Command(${args}));
        resultado = <#list outputModel.fields![] as f>"${(f.label?? && f.label?has_content)?then(f.label, f.name?cap_first)}: " + result.${f.name}<#if !(f.basicType?? && f.basicType) && (f.type!"") != "array">Id</#if>()<#sep> + " · " + </#sep></#list><#if !(outputModel.fields?? && outputModel.fields?has_content)>String.valueOf(result)</#if>;
<#else>
        useCase.handle(new ${ucClass}Command(${args}));
        resultado = "${usecase.name} ejecutado";
</#if>
        return List.of(new Message("${usecase.title!usecase.className}: hecho"), new State(this));
    }

}
