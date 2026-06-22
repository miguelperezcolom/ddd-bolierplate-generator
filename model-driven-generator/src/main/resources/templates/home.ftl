package ${project.packageName}.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
<#list menuModules as m>
import ${project.packageName}.${m.slug}.infra.in.ui.menu.${m.className};
</#list>

@UI("")
@Title("${service.name}")
public class Home {

<#list menuModules as m>
    @Menu
    ${m.className} ${m.field};
</#list>

}
