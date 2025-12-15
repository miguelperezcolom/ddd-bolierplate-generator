package io.mateu.ddd.sample.booking.domain.aggregates.booking;

import io.mateu.ddd.domain.AbstractAggregateRoot;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.PassengerEmail;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.BookingId;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.PassengerName;
import io.mateu.ddd.sample.booking.domain.aggregates.file.valueobjects.FileId;
import io.mateu.ddd.sample.booking.domain.aggregates.shared.valueobjects.Amount;
import lombok.Builder;
import lombok.With;

import java.util.List;

@Builder@With
public class Booking extends AbstractAggregateRoot {

    FileId fileId;

    BookingId id;

    PassengerName name;

    PassengerEmail email;

    Amount salePrice;

    List<BookingLine> lines;

}
