package com.riu.sagas.infra.out.persistence;

import com.riu.sagas.application.out.PaymentRepository;
import com.riu.sagas.domain.aggregates.payment.Payment;
import com.riu.sagas.domain.aggregates.payment.vo.PaymentId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentDBRepository implements PaymentRepository {

  final PaymentEntityRepository repository;

  @Override
  public Optional<Payment> findById(PaymentId id) {
    return repository.findById(id.value()).map(this::toDomain);
  }

  private Payment toDomain(PaymentEntity entity) {
    return new Payment(new PaymentId(entity.getId()), entity.getValue());
  }

  private PaymentEntity toEntity(Payment domain) {
    return new PaymentEntity(
        domain.getId() != null ? domain.getId().value() : null, domain.getValue());
  }

  @Override
  public PaymentId save(Payment domain) {
    return new PaymentId(repository.save(toEntity(domain)).getId());
  }

  @Override
  public void deleteAllById(List<PaymentId> selectedIds) {
    repository.deleteAllById(selectedIds.stream().map(PaymentId::value).toList());
  }
}
