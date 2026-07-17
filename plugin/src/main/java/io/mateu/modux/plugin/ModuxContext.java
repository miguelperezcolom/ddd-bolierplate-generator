package io.mateu.modux.plugin;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Bootstraps the generator's Spring context for mojo executions.
 *
 * <p>Mojos used to register the exact bean classes they needed, which broke every time a use
 * case grew a new collaborator (the bean graph is wired by constructor injection). Instead we
 * scan the generator's application and outbound-infrastructure packages and mark every bean
 * definition lazy: only the use case a mojo actually pulls — plus its transitive dependencies —
 * is instantiated. The inbound infrastructure (web UI, REST) is intentionally out of scope.
 */
final class ModuxContext {

    private static final String[] SCAN_PACKAGES = {
            "io.mateu.modux.modeldrivengenerator.application",
            "io.mateu.modux.modeldrivengenerator.infra.out"
    };

    private ModuxContext() {}

    static AnnotationConfigApplicationContext create() {
        var ctx = new AnnotationConfigApplicationContext();
        ctx.scan(SCAN_PACKAGES);
        var beanFactory = ctx.getDefaultListableBeanFactory();
        for (var name : beanFactory.getBeanDefinitionNames()) {
            beanFactory.getBeanDefinition(name).setLazyInit(true);
        }
        ctx.refresh();
        return ctx;
    }
}
