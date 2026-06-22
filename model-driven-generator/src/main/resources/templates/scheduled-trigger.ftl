package ${project.packageName}.${module.slug}.infra.in.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ${trigger.name?cap_first}Scheduler {

    // TODO: inject use case ${trigger.useCaseId!'(not set)'}

    @Scheduled(cron = "${r"${"}${trigger.name?upper_case?replace(" ","_")}_CRON:${trigger.cronExpression!'0 * * * * *'}${"}"}")
    public void execute() {
        // TODO: call use case
        // ${trigger.useCaseId!'// useCaseId not configured'}
    }
}
