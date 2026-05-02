package com.riu.sagas.infra.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentEntityRepository extends JpaRepository<PaymentEntity, Long> {}
