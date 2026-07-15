<#assign pageSlug = pageSlug!(page.name?lower_case?replace("[^a-z0-9]","",'r'))>
<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.pages.${pageSlug};

<#if ui??>
import io.mateu.uidl.annotations.UI;
</#if>
<#if pageRoute??>
import io.mateu.uidl.annotations.Route;
</#if>
import io.mateu.uidl.annotations.Title;
<#if page.favicon?has_content>
import io.mateu.uidl.annotations.FavIcon;
</#if>
<#if page.style?has_content>
import io.mateu.uidl.StyleConstants;
import io.mateu.uidl.annotations.Style;
</#if>
import io.mateu.uidl.interfaces.HttpRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
<#if pageModel?? && pageModel.fields?has_content>
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#list pageModel.fields as field>
<#if field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "dateTime"><#assign hasDateTime = true></#if>
<#if field.type == "number" || field.type == "money"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
</#if>

/**
 * Form page: ${page.name}
 * Route: ${page.route!''}
 * Generated from PageEntity id=${page.id}
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
<#if ui??>
<#assign uiPath = (ui.path?has_content)?then(ui.path, '')>
@UI(<#if ui.indexHtmlPath?has_content || ui.frontendComponentPath?has_content>value = "${uiPath}"<#if ui.indexHtmlPath?has_content>, indexHtmlPath = "${ui.indexHtmlPath}"</#if><#if ui.frontendComponentPath?has_content>, frontendComponentPath = "${ui.frontendComponentPath}"</#if><#else>"${uiPath}"</#if>)
</#if>
<#if pageRoute??>
@Route("${pageRoute}")
</#if>
@Title("${page.title!page.name}")
<#if page.favicon?has_content>
@FavIcon("${page.favicon}")
</#if>
<#if page.style?has_content>
@Style(StyleConstants.${page.style})
</#if>
public class ${pageClassName!(page.name?cap_first?replace("[^a-zA-Z0-9]","",'r') + "Page")} {

<#if pageModel?? && pageModel.fields?has_content>
<#list pageModel.fields as field>
<#if field.basicType>
    <#if field.type == "string" || field.type == "email" || field.type == "password" || field.type == "url" || field.type == "color" || field.type == "image" || field.type == "file" || field.type == "json">
    @NotEmpty
    String ${field.name};
    <#elseif field.type == "integer">
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
    <#else>
    String ${field.name};
    </#if>
<#else>
    String ${field.name}Id;
</#if>
</#list>
<#else>
    // TODO: add fields from model
</#if>

    public void save(HttpRequest httpRequest) {
        // TODO: implement save logic
    }

}
