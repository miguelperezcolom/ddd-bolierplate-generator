package com.riu.sagas.application.usecases.booking.create;

public record CreateBookingCommand(String locator, String leadName, String comments) {}
