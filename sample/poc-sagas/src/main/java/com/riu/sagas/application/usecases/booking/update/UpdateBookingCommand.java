package com.riu.sagas.application.usecases.booking.update;

public record UpdateBookingCommand(String id, String locator, String leadName, String comments) {}
