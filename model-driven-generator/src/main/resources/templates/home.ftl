package ${project.packageName}.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
<#list service.modules as module>
<#list module.aggregates as aggregate>
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.in.ui.pages.${aggregate.name?lower_case}.${aggregate.name}CrudOrchestrator;
</#list>
</#list>

@UI("")
@Title("${service.name}")
public class Home {

<#list service.modules as module>
<#list module.aggregates as aggregate>
    @Menu
    ${aggregate.name}CrudOrchestrator ${aggregate.name?lower_case}s;
</#list>
</#list>

}
