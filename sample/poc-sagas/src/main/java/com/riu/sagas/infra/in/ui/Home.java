package com.riu.sagas.infra.in.ui;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
import com.riu.sagas.infra.in.ui.pages.payment.PaymentCrudOrchestrator;
import com.riu.sagas.infra.in.ui.pages.booking.BookingCrudOrchestrator;

@UI("")
@Title("My App")
public class Home {

  @Menu PaymentCrudOrchestrator payments;
  @Menu BookingCrudOrchestrator bookings;
}
