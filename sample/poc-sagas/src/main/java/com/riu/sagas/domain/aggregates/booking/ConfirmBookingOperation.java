package com.riu.sagas.domain.aggregates.booking;

@FunctionalInterface
public interface ConfirmBookingOperation {

  void execute(BookingOperationContext context);
}
