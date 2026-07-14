package io.mateu.modux.modeldrivengenerator.infra.in.ui;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Static bridge into the Spring context for the classes MATEU instantiates by
 * reflection (the @UI app shell): they cannot receive constructor injection,
 * but their route logic still needs a couple of beans.
 */
@Component
public class SpringBeans implements ApplicationContextAware {

    private static ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }

    public static <T> T get(Class<T> type) {
        return context.getBean(type);
    }
}
