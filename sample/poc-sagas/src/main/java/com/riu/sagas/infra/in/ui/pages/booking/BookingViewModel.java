package com.riu.sagas.infra.in.ui.pages.booking;

import io.mateu.uidl.annotations.HiddenInCreate;
import io.mateu.uidl.annotations.ReadOnly;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import com.riu.sagas.application.query.dto.BookingDto;
import com.riu.sagas.application.usecases.booking.create.CreateBookingCommand;
import com.riu.sagas.application.usecases.booking.create.CreateBookingUseCase;
import com.riu.sagas.application.usecases.booking.update.UpdateBookingCommand;
import com.riu.sagas.application.usecases.booking.update.UpdateBookingUseCase;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class BookingViewModel
    implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

  @HiddenInCreate @ReadOnly String id;

  @NotEmpty String locator;

  @NotEmpty String leadName;

  @NotEmpty String comments;

  final CreateBookingUseCase createBookingUseCase;
  final UpdateBookingUseCase updateBookingUseCase;

  @Override
  public String create(HttpRequest httpRequest) {
    return createBookingUseCase.handle(new CreateBookingCommand(locator, leadName, comments));
  }

  @Override
  public void save(HttpRequest httpRequest) {
    updateBookingUseCase.handle(new UpdateBookingCommand(id, locator, leadName, comments));
  }

  @Override
  public String id() {
    return id;
  }

  public BookingViewModel load(BookingDto dto) {
    id = dto.id();
    locator = dto.locator();
    leadName = dto.leadName();
    comments = dto.comments();
    return this;
  }

  @Override
  public String toString() {
    return id != null ? String.valueOf(locator) : "New Booking";
  }
}
