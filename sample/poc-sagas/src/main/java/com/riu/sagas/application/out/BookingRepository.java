package com.riu.sagas.application.out;

import com.riu.sagas.domain.aggregates.booking.Booking;
import com.riu.sagas.domain.aggregates.booking.vo.BookingId;

public interface BookingRepository extends Repository<Booking, BookingId> {}
