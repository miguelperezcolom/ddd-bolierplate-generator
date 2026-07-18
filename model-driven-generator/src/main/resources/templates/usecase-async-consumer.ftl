package ${project.packageName}.${module.slug}.infra.in.async;

import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.className}Command;
import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.className}UseCase;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class ${usecase.className}Consumer {

    final ${usecase.className}UseCase useCase;
    final ObjectMapper objectMapper;

    @Bean
    public Consumer<Message<String>> ${usecase.className?uncap_first?replace("[^a-zA-Z0-9]","",'r')}() {
        return message -> {
            var command = deserialize(message.getPayload());
            useCase.handle(command);
        };
    }

    @SneakyThrows
    private ${usecase.className}Command deserialize(String payload) {
        return objectMapper.readValue(payload, ${usecase.className}Command.class);
    }

}
