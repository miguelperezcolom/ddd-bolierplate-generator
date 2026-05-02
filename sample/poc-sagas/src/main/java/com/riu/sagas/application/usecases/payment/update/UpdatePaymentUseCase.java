package com.riu.sagas.application.usecases.payment.update;

import com.riu.sagas.application.out.PaymentRepository;
import com.riu.sagas.domain.aggregates.payment.vo.PaymentId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdatePaymentUseCase {

  final PaymentRepository repository;

  @Transactional
  public void handle(UpdatePaymentCommand command) {
    var entity = repository.findById(new PaymentId(Long.valueOf(command.id()))).orElseThrow();
    entity.update(command.value());
    repository.save(entity);
  }
}
