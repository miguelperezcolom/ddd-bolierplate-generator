package com.riu.sagas.application.query;

import com.riu.sagas.application.query.dto.BookingDto;
import com.riu.sagas.application.query.dto.BookingRow;

public interface BookingQueryService extends QueryService<BookingDto, BookingRow, Long> {}
