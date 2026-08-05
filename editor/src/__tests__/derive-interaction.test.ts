/**
 * The chain that follows from an entry point.
 *
 * Ported from `DeriveInteractionUseCase`, which used to answer a `/interactions/derive` request.
 * It reads nothing the editor is not already holding, so the round trip was the only reason an
 * answer could fail to arrive — and it did fail, silently, which is how the endpoint ended up
 * deleted with the capability stranded behind it.
 */

import { describe, expect, it } from 'vitest';
import { DerivationError, deriveInteraction } from '../derive-interaction.js';
import type { ModuxModel } from '../model.js';

/** A model built the way the projection hands it over. */
function model(extra: Partial<ModuxModel> = {}): ModuxModel {
  return {
    boundedContexts: [{
      id: 'bc-res',
      name: 'Reservas',
      useCases: [
        {
          id: 'uc-reservar',
          name: 'Reservar',
          steps: [
            { id: 's1', type: 'CallAggregateOperation', aggregateId: 'agg-reserva', operationId: 'op-confirmar' },
            { id: 's2', type: 'CallQueryService', queryServiceId: 'qs-dispo' },
            { id: 's3', type: 'PublishDomainEvent', domainEventId: 'ev-creada' },
          ],
        },
        { id: 'uc-cobrar', name: 'Cobrar', steps: [] },
      ],
      domainEvents: [{ id: 'ev-creada', name: 'ReservaCreada' }],
      applicationEvents: [],
      domainServices: [],
      readModels: [],
    }],
    aggregates: [{
      id: 'agg-reserva', name: 'Reserva', boundedContextId: 'bc-res',
      operations: [{ id: 'op-confirmar', name: 'confirmar' }],
    }],
    relations: [],
    externalSystems: [],
    flows: [],
    ...extra,
  } as unknown as ModuxModel;
}

const chain = (m: ModuxModel, kind: 'USE_CASE' | 'API_OPERATION' | 'EVENT', ref: string) =>
  deriveInteraction(m, kind, ref).messages
    .map((msg) => `${msg.fromRef}→${msg.toRef}:${msg.kind}@${msg.depth}`);

describe('deriving from a use case', () => {
  it('walks the pipeline in its declared order', () => {
    expect(chain(model(), 'USE_CASE', 'uc-reservar')).toEqual([
      'uc-reservar→agg-reserva:COMMAND@0',
      'uc-reservar→qs-dispo:QUERY@0',
    ]);
  });

  /** An operation's own name reads better than the aggregate's when the step names one. */
  it('labels an aggregate call with the operation it calls', () => {
    const [first] = deriveInteraction(model(), 'USE_CASE', 'uc-reservar').messages;

    expect(first.label).toBe('confirmar()');
  });

  it('recurses into a called use case, one level deeper', () => {
    const m = model();
    m.boundedContexts[0].useCases![0].steps = [
      { id: 's1', type: 'CallUseCase', useCaseId: 'uc-cobrar' },
    ];
    m.boundedContexts[0].useCases![1].steps = [
      { id: 's2', type: 'CallAggregateOperation', aggregateId: 'agg-reserva' },
    ];

    expect(chain(m, 'USE_CASE', 'uc-reservar')).toEqual([
      'uc-reservar→uc-cobrar:COMMAND@0',
      'uc-cobrar→agg-reserva:COMMAND@1',
    ]);
  });

  /**
   * A cycle is real — the call happens — so the message that closes it IS emitted. What must not
   * happen is following it, which would not end.
   */
  it('emits the message that closes a cycle but does not follow it', () => {
    const m = model();
    m.boundedContexts[0].useCases![0].steps = [
      { id: 's1', type: 'CallUseCase', useCaseId: 'uc-cobrar' },
    ];
    m.boundedContexts[0].useCases![1].steps = [
      { id: 's2', type: 'CallUseCase', useCaseId: 'uc-reservar' },
    ];

    expect(chain(m, 'USE_CASE', 'uc-reservar')).toEqual([
      'uc-reservar→uc-cobrar:COMMAND@0',
      'uc-cobrar→uc-reservar:COMMAND@1',
    ]);
  });

  it('says so for a use case that is not there', () => {
    expect(() => deriveInteraction(model(), 'USE_CASE', 'uc-fantasma'))
      .toThrow(DerivationError);
  });

  /** Read, transform and custom steps do something, but not to anybody else. */
  it('emits nothing for a step that talks to no one', () => {
    const m = model();
    m.boundedContexts[0].useCases![0].steps = [{ id: 's1', type: 'Custom' }];

    expect(chain(m, 'USE_CASE', 'uc-reservar')).toEqual([]);
  });
});

describe('an event forks one message per consumer', () => {
  const consumed = () => model({
    flows: [
      { id: 'f1', name: 'Notifica', archetype: 'TRIGGERS', sourceId: 'bc-res', targetId: 'bc-fac',
        triggerEvent: 'ReservaCreada', targetUseCaseId: 'uc-cobrar' },
    ],
    subscriptions: [
      { id: 'sub-1', name: 'Auditoría', eventName: 'ReservaCreada',
        actions: [{ type: 'CallUseCase', useCaseId: 'uc-cobrar' }] },
    ],
    workflows: [{ id: 'wf-1', name: 'Checkin', triggerEvent: 'ReservaCreada', steps: [] }],
  } as Partial<ModuxModel>);

  it('reaches every kind of consumer, once each', () => {
    expect(chain(consumed(), 'USE_CASE', 'uc-reservar')).toEqual([
      'uc-reservar→agg-reserva:COMMAND@0',
      'uc-reservar→qs-dispo:QUERY@0',
      // the same use case is reached by the flow and by the subscription: one arrow, not two
      'uc-reservar→uc-cobrar:EVENT@0',
      'uc-reservar→wf-1:EVENT@0',
    ]);
  });

  /** Events are matched by NAME, and a name does not care about case or padding. */
  it('matches an event name regardless of case and padding', () => {
    const m = consumed();
    m.subscriptions![0].eventName = '  reservacreada ';

    expect(chain(m, 'USE_CASE', 'uc-reservar')).toContain('uc-reservar→uc-cobrar:EVENT@0');
  });

  it('starts from the declared emitter when derived from the event itself', () => {
    const m = consumed();
    m.emissions = [{ sourceId: 'agg-reserva', domainEventId: 'ev-creada' }];

    expect(chain(m, 'EVENT', 'ReservaCreada')).toEqual([
      'agg-reserva→uc-cobrar:EVENT@0',
      'agg-reserva→wf-1:EVENT@0',
    ]);
  });

  /** Nobody declares the emitter: the event's own name stands in, so the arrows still draw. */
  it('uses the event name as the source when no one claims to emit it', () => {
    expect(chain(consumed(), 'EVENT', 'ReservaCreada')).toEqual([
      'ReservaCreada→uc-cobrar:EVENT@0',
      'ReservaCreada→wf-1:EVENT@0',
    ]);
  });
});

describe('deriving from an API operation', () => {
  const withApi = () => model({
    apis: [{
      id: 'api-1', name: 'Booking',
      operations: [{ id: 'op-book', name: 'book', targetUseCaseId: 'uc-reservar' }],
    }],
  } as Partial<ModuxModel>);

  it('starts at the operation and expands what it runs', () => {
    expect(chain(withApi(), 'API_OPERATION', 'op-book')).toEqual([
      'op-book→uc-reservar:COMMAND@0',
      'uc-reservar→agg-reserva:COMMAND@1',
      'uc-reservar→qs-dispo:QUERY@1',
    ]);
  });

  it('derives nothing from an operation wired to nothing', () => {
    const m = withApi();
    delete m.apis![0].operations[0].targetUseCaseId;

    expect(deriveInteraction(m, 'API_OPERATION', 'op-book').messages).toEqual([]);
  });

  it('says so for an operation that is not there', () => {
    expect(() => deriveInteraction(withApi(), 'API_OPERATION', 'op-fantasma'))
      .toThrow(/Operación de API desconocida/);
  });
});

describe('an external call reaches the system, not the operation', () => {
  it('draws the lifeline of the system offering it', () => {
    const m = model({
      externalSystems: [{ id: 'ext-pms', name: 'PMS', useCases: [{ id: 'ext-uc-1', name: 'book' }] }],
    } as Partial<ModuxModel>);
    m.boundedContexts[0].useCases![0].steps = [
      { id: 's1', type: 'CallExternalUseCase', externalUseCaseId: 'ext-uc-1' },
    ];

    expect(chain(m, 'USE_CASE', 'uc-reservar')).toEqual(['uc-reservar→ext-pms:EXTERNAL@0']);
  });
});

describe('the result', () => {
  it('is read-only and remembers where it came from', () => {
    const derived = deriveInteraction(model(), 'USE_CASE', 'uc-reservar');

    expect(derived).toMatchObject({
      id: null, ephemeral: true, name: 'Reservar',
      triggerKind: 'USE_CASE', triggerRef: 'uc-reservar',
    });
  });

  it('numbers the messages in walk order', () => {
    const derived = deriveInteraction(model(), 'USE_CASE', 'uc-reservar');

    expect(derived.messages.map((m) => m.id)).toEqual(['m1', 'm2']);
  });

  it('refuses an empty entry point', () => {
    expect(() => deriveInteraction(model(), 'USE_CASE', '  ')).toThrow(DerivationError);
  });
});
