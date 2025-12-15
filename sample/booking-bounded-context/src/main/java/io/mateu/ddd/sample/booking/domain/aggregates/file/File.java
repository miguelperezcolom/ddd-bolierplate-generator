package io.mateu.ddd.sample.booking.domain.aggregates.file;

import io.mateu.ddd.domain.AbstractAggregateRoot;
import io.mateu.ddd.sample.booking.domain.aggregates.booking.valueobjects.BookingId;
import io.mateu.ddd.sample.booking.domain.aggregates.file.valueobjects.FileId;
import io.mateu.ddd.sample.booking.domain.aggregates.shared.valueobjects.Amount;
import lombok.Builder;
import lombok.With;

import java.util.List;

@Builder@With
public class File extends AbstractAggregateRoot {

    FileId id;

    List<BookingId> bookingIds;

    Amount salePrice;

}
