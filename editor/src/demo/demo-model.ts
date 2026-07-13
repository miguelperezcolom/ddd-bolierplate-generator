import type { ModuxModel } from '../model.js';

/**
 * Demo model loosely based on sample/hla-booking (booking write-side coexisting
 * with the legacy PMS). Standalone fixture: the real host will project this
 * JSON from the model store.
 */
export const demoModel: ModuxModel = {
  boundedContexts: [
    { id: 'mod-booking', name: 'Booking', subdomainType: 'CORE', serviceId: 'svc-booking' },
    { id: 'mod-valoracion', name: 'Valoración', subdomainType: 'SUPPORTING', serviceId: 'svc-readside' },
    { id: 'mod-distribution', name: 'Distribution', subdomainType: 'SUPPORTING', serviceId: 'svc-distribution' },
    { id: 'mod-notificaciones', name: 'Notificaciones', subdomainType: 'GENERIC', serviceId: 'svc-notificaciones' },
  ],
  externalSystems: [
    { id: 'ext-rumbo', name: 'Rumbo (PMS legado)' },
    { id: 'ext-easytravel', name: 'EasyTravelAPI' },
  ],
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
};
