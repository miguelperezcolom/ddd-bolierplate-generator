package io.mateu.ddd.sample.booking.domain.aggregates.user;

import io.mateu.ddd.domain.AbstractAggregateRoot;
import io.mateu.ddd.sample.booking.domain.aggregates.user.valueobjects.UserEmail;
import io.mateu.ddd.sample.booking.domain.aggregates.user.valueobjects.UserId;
import io.mateu.ddd.sample.booking.domain.aggregates.user.valueobjects.UserName;
import lombok.Builder;
import lombok.With;

@Builder@With
public class User extends AbstractAggregateRoot {

    UserId id;

    UserName name;

    UserEmail email;

}
