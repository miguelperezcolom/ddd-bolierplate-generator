import type { ModuxModel } from '../model.js';

/**
 * Demo model loosely based on sample/hla-booking (booking write-side coexisting
 * with the legacy PMS). Standalone fixture: the real host will project this
 * JSON from the model store.
 */
export const demoModel: ModuxModel = {
  boundedContexts: [
    {
      id: 'mod-booking',
      name: 'Booking',
      subdomainType: 'CORE',
      serviceId: 'svc-booking',
      useCases: [
        { id: 'uc-book', name: 'Reservar' },
        { id: 'uc-cancel', name: 'Cancelar reserva' },
        { id: 'uc-notify', name: 'Notificar confirmación', policy: true },
      ],
      queryServices: [{ id: 'qs-booking-list', name: 'Listado de reservas' }],
      domainEvents: [{ id: 'ev-booking-confirmed', name: 'BookingConfirmed' }],
    },
    { id: 'mod-valoracion', name: 'Valoración', subdomainType: 'SUPPORTING', serviceId: 'svc-readside' },
    { id: 'mod-distribution', name: 'Distribution', subdomainType: 'SUPPORTING', serviceId: 'svc-distribution' },
    { id: 'mod-notificaciones', name: 'Notificaciones', subdomainType: 'GENERIC', serviceId: 'svc-notificaciones' },
  ],
  externalSystems: [
    {
      id: 'ext-rumbo',
      name: 'Rumbo (PMS legado)',
      useCases: [{ id: 'ext-uc-grabar-pms', name: 'Grabar reserva' }],
    },
    { id: 'ext-easytravel', name: 'EasyTravelAPI' },
  ],
  actors: [{ id: 'huesped', name: 'Huésped' }],
  actorUses: [{ actorId: 'huesped', targetId: 'uc-book' }],
  aggregateCalls: [{ sourceId: 'uc-book', targetId: 'agg-booking' }],
  queryCalls: [{ sourceId: 'uc-book', targetId: 'qs-booking-list' }],
  externalUseCaseCalls: [{ sourceId: 'uc-notify', targetId: 'ext-uc-grabar-pms' }],
  useCaseEmissions: [{ sourceId: 'uc-book', domainEventId: 'ev-booking-confirmed' }],
  relations: [
    { sourceId: 'mod-valoracion', targetId: 'mod-booking', type: 'OPEN_HOST_SERVICE' },
    { sourceId: 'mod-booking', targetId: 'mod-notificaciones', type: 'CUSTOMER_SUPPLIER' },
  ],
  flows: [
    {
      id: 'flow-booking-confirmed-notifies',
      name: 'BookingConfirmed → email',
      sourceId: 'mod-booking',
      targetId: 'mod-notificaciones',
      archetype: 'NOTIFIES',
    },
    {
      id: 'flow-booking-materializes-distribution',
      name: 'BookingConfirmed materializa listado',
      sourceId: 'mod-booking',
      targetId: 'mod-distribution',
      archetype: 'MATERIALIZES',
    },
    {
      id: 'flow-callback-rumbo',
      name: 'Callback confirmación PMS',
      sourceId: 'ext-rumbo',
      targetId: 'mod-booking',
      archetype: 'TRIGGERS',
    },
    {
      id: 'flow-confirmed-triggers-notify',
      name: 'BookingConfirmed → Notificar confirmación',
      sourceId: 'mod-booking',
      targetId: 'mod-booking',
      archetype: 'TRIGGERS',
      triggerAggregateId: 'agg-booking',
      triggerEvent: 'BookingConfirmed',
      targetUseCaseId: 'uc-notify',
    },
  ],
  aggregates: [
    { id: 'agg-booking', name: 'Booking', boundedContextId: 'mod-booking' },
    { id: 'agg-quote', name: 'Quote', boundedContextId: 'mod-valoracion' },
    { id: 'agg-listing', name: 'BookingListing', boundedContextId: 'mod-distribution' },
    { id: 'agg-notification', name: 'Notification', boundedContextId: 'mod-notificaciones' },
  ],
  entities: [
    { id: 'ent-booking-line', name: 'BookingLine', aggregateId: 'agg-booking' },
    { id: 'ent-holder', name: 'Holder', aggregateId: 'agg-booking' },
    { id: 'ent-quote-line', name: 'QuoteLine', aggregateId: 'agg-quote' },
  ],
  aggregateReferences: [
    { sourceAggregateId: 'agg-booking', targetAggregateId: 'agg-quote', label: 'quoteToken' },
    { sourceAggregateId: 'agg-listing', targetAggregateId: 'agg-booking', label: 'bookingId' },
  ],
  processes: [
    {
      id: 'proc-book',
      name: 'Reservar',
      triggerAggregateId: 'agg-booking',
      triggerEvent: 'BookingRequested',
      ownerBoundedContextId: 'mod-booking',
      onCompletionEventName: 'BookingConfirmed',
      sla: 'P1D',
      steps: [
        {
          id: 'step-book-pms',
          name: 'Grabar en PMS',
          type: 'AUTOMATED',
          useCaseId: 'uc-book',
          compensationUseCaseId: 'uc-cancel-pms',
        },
        {
          id: 'step-review',
          name: 'Revisión manual',
          type: 'HUMAN',
          roleId: 'booking-agent',
          deadline: 'PT4H',
        },
      ],
    },
  ],
  interactions: [
    {
      id: 'int-reserva-online',
      name: 'Reserva online',
      description: 'El huésped reserva desde la web y la reserva se confirma contra el PMS',
      triggerKind: 'ACTOR',
      triggerRef: 'huesped',
      participants: [
        { ref: 'huesped', name: 'Huésped', type: 'ACTOR' },
        { ref: 'uc-book', name: 'Reservar', type: 'USE_CASE' },
        { ref: 'uc-cancel', name: 'Cancelar reserva', type: 'USE_CASE' },
        { ref: 'agg-booking', name: 'Booking', type: 'AGGREGATE' },
        { ref: 'qs-booking-list', name: 'Listado de reservas', type: 'QUERY_SERVICE' },
        { ref: 'uc-notify', name: 'Notificar confirmación', type: 'USE_CASE' },
        { ref: 'ext-rumbo', name: 'Rumbo (PMS legado)', type: 'EXTERNAL_SYSTEM' },
      ],
      messages: [
        { id: 'msg-1', fromRef: 'huesped', toRef: 'uc-book', kind: 'COMMAND', label: 'reserva(request)' },
        { id: 'msg-2', fromRef: 'uc-book', toRef: 'agg-booking', kind: 'COMMAND', label: 'book()', depth: 1 },
        {
          id: 'msg-3',
          fromRef: 'uc-book',
          toRef: 'qs-booking-list',
          kind: 'QUERY',
          label: 'disponibilidad(fechas)',
          depth: 1,
        },
        { id: 'msg-4', fromRef: 'agg-booking', toRef: 'uc-notify', kind: 'EVENT', label: 'BookingConfirmed' },
        {
          id: 'msg-5',
          fromRef: 'uc-notify',
          toRef: 'ext-rumbo',
          kind: 'EXTERNAL',
          label: 'POST /reservas',
          depth: 1,
        },
        {
          id: 'msg-6',
          fromRef: 'huesped',
          toRef: 'uc-cancel',
          kind: 'COMMAND',
          label: 'cancela(reservaId)',
          guard: 'dentro de plazo',
          backed: false,
        },
      ],
    },
    {
      id: 'int-alta-ota',
      name: 'Alta desde OTA',
      participants: [
        { ref: 'ext-easytravel', name: 'EasyTravelAPI', type: 'EXTERNAL_SYSTEM' },
        { ref: 'uc-book', name: 'Reservar', type: 'USE_CASE' },
      ],
      messages: [
        {
          id: 'msg-a',
          fromRef: 'ext-easytravel',
          toRef: 'uc-book',
          kind: 'COMMAND',
          label: 'reservaOTA(payload)',
          backed: false,
        },
      ],
    },
  ],
};
