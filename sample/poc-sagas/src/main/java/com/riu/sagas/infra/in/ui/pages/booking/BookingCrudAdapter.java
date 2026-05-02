package com.riu.sagas.infra.in.ui.pages.booking;

import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.NoFilters;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.CrudAdapter;
import io.mateu.uidl.interfaces.HttpRequest;
import com.riu.sagas.application.query.BookingQueryService;
import com.riu.sagas.application.query.dto.BookingRow;
import com.riu.sagas.application.usecases.booking.delete.DeleteBookingCommand;
import com.riu.sagas.application.usecases.booking.delete.DeleteBookingUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class BookingCrudAdapter
    implements CrudAdapter<
        BookingViewModel, BookingViewModel, BookingViewModel, NoFilters, BookingRow, String> {

  final BookingViewModel viewModel;
  final DeleteBookingUseCase deleteBookingUseCase;
  final BookingQueryService queryService;

  @Override
  public ListingData<BookingRow> search(
      String searchText, NoFilters filters, Pageable pageable, HttpRequest httpRequest) {
    return queryService.findAll(searchText, filters, pageable);
  }

  @Override
  public void deleteAllById(List<String> selectedIds, HttpRequest httpRequest) {
    deleteBookingUseCase.handle(new DeleteBookingCommand(selectedIds));
  }

  @Override
  public BookingViewModel getView(String id, HttpRequest httpRequest) {
    return viewModel.load(queryService.getById(id).orElseThrow());
  }

  @Override
  public BookingViewModel getEditor(String id, HttpRequest httpRequest) {
    return viewModel.load(queryService.getById(id).orElseThrow());
  }

  @Override
  public BookingViewModel getCreationForm(HttpRequest httpRequest) {
    return viewModel;
  }
}
