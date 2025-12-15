package io.mateu.ddd.sample.booking.infra.out.persistence.domaineventbus;

import lombok.Builder;
import lombok.Getter;
import lombok.With;
import org.springframework.data.annotation.Id;

@Builder@With
@Getter
public class DomainEventEntity {

    @Id
    String id;

    String json;

}
