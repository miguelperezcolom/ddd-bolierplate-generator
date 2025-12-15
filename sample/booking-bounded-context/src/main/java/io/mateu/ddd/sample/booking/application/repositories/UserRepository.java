package io.mateu.ddd.sample.booking.application.repositories;

import io.mateu.ddd.sample.booking.domain.aggregates.user.User;
import io.mateu.ddd.sample.booking.domain.aggregates.user.valueobjects.UserId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Mono;

import java.util.List;

public interface UserRepository {

    Mono<User> findById(UserId id);

    Mono<User> save(User user);

    Mono<Page<User>> findAll(String searchText, Pageable pageable);

    Mono<Void> deleteAllById(List<UserId> ids);

}
