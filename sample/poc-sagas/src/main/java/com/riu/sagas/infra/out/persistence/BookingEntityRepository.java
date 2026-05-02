package com.riu.sagas.infra.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingEntityRepository extends JpaRepository<BookingEntity, Long> {}
