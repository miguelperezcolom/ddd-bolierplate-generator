package com.riu.sagas.domain.aggregates.booking;

import com.riu.sagas.domain.aggregates.booking.vo.BookingId;

public interface BookingOperationContext {

  BookingId id();

  void id(BookingId id);

  String locator();

  void locator(String locator);

  String leadName();

  void leadName(String leadName);

  String comments();

  void comments(String comments);
}
