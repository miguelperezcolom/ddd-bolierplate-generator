import { describe, it, expect } from 'vitest';
import type { InteractionRef, ModuxModel } from '../model.js';
import {
  computeBacked,
  deriveParticipants,
  inferMessageKind,
  insertMessageAt,
  interactionToMermaid,
  lookupFor,
  materializeCommands,
  messageNumbers,
  moveMessage,
  removeMessage,
  saveInteractionCommand,
  withoutParticipant,
} from '../interaction-utils.js';
import { baseModel } from '../views/__tests__/fixtures.js';

const model = (overrides: Partial<ModuxModel> = {}): ModuxModel =>
  baseModel({
    boundedContexts: [
      {
        id: 'mod-booking',
        name: 'Booking',
        subdomainType: 'CORE',
        useCases: [
          { id: 'uc-book', name: 'Reservar' },
          { id: 'uc-notify', name: 'Notificar' },
        ],
        queryServices: [{ id: 'qs-list', name: 'Listado' }],
        readModels: [{ id: 'rm-list', name: 'ReservasView' }],
        domainEvents: [{ id: 'ev-confirmed', name: 'BookingConfirmed' }],
      },
    ],
    aggregates: [{ id: 'agg-booking', name: 'Booking', boundedContextId: 'mod-booking' }],
    actors: [{ id: 'huesped', name: 'Huésped' }],
    pages: [{ id: 'page-checkin', name: 'Check-in' }],
    apis: [
      {
        id: 'api-booking',
        name: 'Booking API',
        operations: [{ id: 'op-create', name: 'POST /bookings' }],
      },
    ],
    externalSystems: [
      { id: 'ext-pms', name: 'PMS', useCases: [{ id: 'ext-uc-save', name: 'Grabar' }] },
    ],
    ...overrides,
  });

const interaction = (overrides: Partial<InteractionRef> = {}): InteractionRef => ({
  id: 'int-1',
  name: 'Reserva online',
  messages: [],
  ...overrides,
});

describe('deriveParticipants', () => {
  it('keeps the declared order and appends message-only refs in first-use order', () => {
    const i = interaction({
      participants: [{ ref: 'a', name: 'A', type: 'ACTOR' }],
      messages: [
        { id: 'm1', fromRef: 'a', toRef: 'b', kind: 'COMMAND' },
        { id: 'm2', fromRef: 'c', toRef: 'a', kind: 'COMMAND' },
        { id: 'm3', fromRef: 'b', toRef: 'c', kind: 'COMMAND' },
      ],
    });
    expect(deriveParticipants(i).map((p) => p.ref)).toEqual(['a', 'b', 'c']);
    expect(deriveParticipants(i)[1]).toEqual({ ref: 'b', name: 'b', type: 'UNKNOWN' });
  });
});

describe('messageNumbers', () => {
  it('numbers flat messages 1, 2, 3', () => {
    const nums = messageNumbers([
      { id: 'a', fromRef: 'x', toRef: 'y', kind: 'COMMAND' },
      { id: 'b', fromRef: 'x', toRef: 'y', kind: 'COMMAND' },
      { id: 'c', fromRef: 'x', toRef: 'y', kind: 'COMMAND' },
    ]);
    expect(nums).toEqual(['1', '2', '3']);
  });

  it('nests by depth and restarts the nested counter per parent', () => {
    const nums = messageNumbers([
      { id: 'a', fromRef: 'x', toRef: 'y', kind: 'COMMAND' },
      { id: 'b', fromRef: 'x', toRef: 'y', kind: 'COMMAND', depth: 1 },
      { id: 'c', fromRef: 'x', toRef: 'y', kind: 'COMMAND', depth: 2 },
      { id: 'd', fromRef: 'x', toRef: 'y', kind: 'COMMAND', depth: 1 },
      { id: 'e', fromRef: 'x', toRef: 'y', kind: 'COMMAND' },
      { id: 'f', fromRef: 'x', toRef: 'y', kind: 'COMMAND', depth: 1 },
    ]);
    expect(nums).toEqual(['1', '1.1', '1.1.1', '1.2', '2', '2.1']);
  });
});

describe('message ordering helpers', () => {
  const msgs = [
    { id: 'a', fromRef: 'x', toRef: 'y', kind: 'COMMAND' as const },
    { id: 'b', fromRef: 'x', toRef: 'y', kind: 'COMMAND' as const },
    { id: 'c', fromRef: 'x', toRef: 'y', kind: 'COMMAND' as const },
  ];

  it('insertMessageAt clamps the index', () => {
    const m = { id: 'n', fromRef: 'x', toRef: 'y', kind: 'COMMAND' as const };
    expect(insertMessageAt(msgs, m, 99).map((x) => x.id)).toEqual(['a', 'b', 'c', 'n']);
    expect(insertMessageAt(msgs, m, -3).map((x) => x.id)).toEqual(['n', 'a', 'b', 'c']);
    expect(insertMessageAt(msgs, m, 1).map((x) => x.id)).toEqual(['a', 'n', 'b', 'c']);
  });

  it('moveMessage reorders without losing messages', () => {
    expect(moveMessage(msgs, 'a', 2).map((x) => x.id)).toEqual(['b', 'c', 'a']);
    expect(moveMessage(msgs, 'c', 0).map((x) => x.id)).toEqual(['c', 'a', 'b']);
    expect(moveMessage(msgs, 'zzz', 1)).toBe(msgs); // unknown id: untouched
  });

  it('removeMessage drops exactly one', () => {
    expect(removeMessage(msgs, 'b').map((x) => x.id)).toEqual(['a', 'c']);
  });

  it('withoutParticipant drops the lifeline and its messages', () => {
    const i = interaction({
      participants: [
        { ref: 'x', name: 'X', type: 'ACTOR' },
        { ref: 'y', name: 'Y', type: 'USE_CASE' },
      ],
      messages: [
        { id: 'a', fromRef: 'x', toRef: 'y', kind: 'COMMAND' },
        { id: 'b', fromRef: 'y', toRef: 'y', kind: 'COMMAND' },
      ],
    });
    const next = withoutParticipant(i, 'x');
    expect(next.participants?.map((p) => p.ref)).toEqual(['y']);
    expect(next.messages.map((m) => m.id)).toEqual(['b']);
  });
});

describe('inferMessageKind', () => {
  const p = (ref: string, type = 'UNKNOWN') => ({ ref, name: ref, type });

  it('is EVENT when a TRIGGERS flow already links the pair (label = event name)', () => {
    const m = model({
      flows: [
        {
          id: 'f1',
          name: 'x',
          sourceId: 'mod-booking',
          targetId: 'mod-booking',
          archetype: 'TRIGGERS',
          triggerAggregateId: 'agg-booking',
          triggerEvent: 'BookingConfirmed',
          targetUseCaseId: 'uc-notify',
        },
      ],
    });
    expect(inferMessageKind(m, p('agg-booking', 'AGGREGATE'), p('uc-notify', 'USE_CASE'))).toEqual({
      kind: 'EVENT',
      label: 'BookingConfirmed',
    });
  });

  it('is EVENT via an emission plus a subscription', () => {
    const m = model({
      useCaseEmissions: [{ sourceId: 'uc-book', domainEventId: 'ev-confirmed' }],
      subscriptions: [
        {
          id: 's1',
          name: 'sub',
          eventName: 'BookingConfirmed',
          actions: [{ type: 'CallUseCase', useCaseId: 'uc-notify' }],
        },
      ],
    });
    expect(inferMessageKind(m, p('uc-book', 'USE_CASE'), p('uc-notify', 'USE_CASE'))).toEqual({
      kind: 'EVENT',
      label: 'BookingConfirmed',
    });
  });

  it('falls back to the target type', () => {
    const m = model();
    expect(inferMessageKind(m, p('a'), p('qs-list', 'QUERY_SERVICE')).kind).toBe('QUERY');
    expect(inferMessageKind(m, p('a'), p('rm-list', 'READ_MODEL')).kind).toBe('QUERY');
    expect(inferMessageKind(m, p('a'), p('ext-pms', 'EXTERNAL_SYSTEM')).kind).toBe('EXTERNAL');
    expect(inferMessageKind(m, p('a'), p('uc-book', 'USE_CASE')).kind).toBe('COMMAND');
    // UNKNOWN participant types resolve against the catalog
    expect(inferMessageKind(m, p('a'), p('qs-list')).kind).toBe('QUERY');
  });
});

describe('computeBacked', () => {
  it('COMMAND uc→uc needs the use-case call', () => {
    const m = model({ useCaseCalls: [{ sourceId: 'uc-book', targetId: 'uc-notify' }] });
    const { typeOf } = lookupFor(m, interaction());
    const msg = { id: 'm', fromRef: 'uc-book', toRef: 'uc-notify', kind: 'COMMAND' as const };
    expect(computeBacked(m, msg, typeOf)).toBe(true);
    expect(computeBacked(m, { ...msg, toRef: 'qs-list' }, typeOf)).toBe(false);
  });

  it('COMMAND apiOperation→uc reads the operation wiring', () => {
    const wired = model();
    wired.apis![0].operations[0].targetUseCaseId = 'uc-book';
    const { typeOf } = lookupFor(wired, interaction());
    const msg = { id: 'm', fromRef: 'op-create', toRef: 'uc-book', kind: 'COMMAND' as const };
    expect(computeBacked(wired, msg, typeOf)).toBe(true);
    expect(computeBacked(model(), msg, lookupFor(model(), interaction()).typeOf)).toBe(false);
  });

  it('EVENT needs both the emission and the consumer', () => {
    const both = model({
      useCaseEmissions: [{ sourceId: 'uc-book', domainEventId: 'ev-confirmed' }],
      flows: [
        {
          id: 'f1',
          name: 'x',
          sourceId: 'mod-booking',
          targetId: 'mod-booking',
          archetype: 'TRIGGERS',
          triggerEvent: 'BookingConfirmed',
          targetUseCaseId: 'uc-notify',
        },
      ],
    });
    const msg = {
      id: 'm',
      fromRef: 'uc-book',
      toRef: 'uc-notify',
      kind: 'EVENT' as const,
      label: 'BookingConfirmed',
    };
    expect(computeBacked(both, msg, lookupFor(both, interaction()).typeOf)).toBe(true);
    expect(computeBacked(model(), msg, lookupFor(model(), interaction()).typeOf)).toBe(false);
  });

  it('EXTERNAL uc→external system is backed by a call to any of its use cases', () => {
    const m = model({ externalUseCaseCalls: [{ sourceId: 'uc-book', targetId: 'ext-uc-save' }] });
    const msg = { id: 'm', fromRef: 'uc-book', toRef: 'ext-pms', kind: 'EXTERNAL' as const };
    expect(computeBacked(m, msg, lookupFor(m, interaction()).typeOf)).toBe(true);
  });
});

describe('materializeCommands', () => {
  const lookup = (m: ModuxModel) => lookupFor(m, interaction());

  it('COMMAND uc→uc emits add-use-case-call', () => {
    const m = model();
    const { commands } = materializeCommands(
      m,
      { id: 'x', fromRef: 'uc-book', toRef: 'uc-notify', kind: 'COMMAND' },
      lookup(m).typeOf,
      lookup(m).nameOf,
    );
    expect(commands).toEqual([{ kind: 'add-use-case-call', sourceId: 'uc-book', targetId: 'uc-notify' }]);
  });

  it('COMMAND apiOperation→uc emits set-api-operation-target with the owning api', () => {
    const m = model();
    const { commands } = materializeCommands(
      m,
      { id: 'x', fromRef: 'op-create', toRef: 'uc-book', kind: 'COMMAND' },
      lookup(m).typeOf,
      lookup(m).nameOf,
    );
    expect(commands).toEqual([
      { kind: 'set-api-operation-target', apiId: 'api-booking', id: 'op-create', targetUseCaseId: 'uc-book' },
    ]);
  });

  it('EVENT emits add-emission + add-flow TRIGGERS, skipping what already exists', () => {
    const m = model({
      useCaseEmissions: [{ sourceId: 'uc-book', domainEventId: 'ev-confirmed' }],
    });
    const { commands } = materializeCommands(
      m,
      { id: 'x', fromRef: 'uc-book', toRef: 'uc-notify', kind: 'EVENT', label: 'BookingConfirmed' },
      lookup(m).typeOf,
      lookup(m).nameOf,
    );
    // emission already there → only the flow
    expect(commands).toHaveLength(1);
    expect(commands[0]).toMatchObject({
      kind: 'add-flow',
      archetype: 'TRIGGERS',
      triggerEvent: 'BookingConfirmed',
      triggerUseCaseId: 'uc-book',
      targetId: 'mod-booking',
      targetUseCaseId: 'uc-notify',
    });
  });

  it('EVENT with an aggregate emitter fills triggerAggregateId', () => {
    const m = model();
    const { commands } = materializeCommands(
      m,
      { id: 'x', fromRef: 'agg-booking', toRef: 'uc-notify', kind: 'EVENT', label: 'BookingConfirmed' },
      lookup(m).typeOf,
      lookup(m).nameOf,
    );
    expect(commands[0]).toEqual({ kind: 'add-emission', sourceId: 'agg-booking', targetId: 'ev-confirmed' });
    expect(commands[1]).toMatchObject({ kind: 'add-flow', triggerAggregateId: 'agg-booking' });
  });

  it('EVENT of an unknown event only hints', () => {
    const m = model();
    const { commands, hint } = materializeCommands(
      m,
      { id: 'x', fromRef: 'uc-book', toRef: 'uc-notify', kind: 'EVENT', label: 'Nope' },
      lookup(m).typeOf,
      lookup(m).nameOf,
    );
    expect(commands).toEqual([]);
    expect(hint).toContain('Nope');
  });

  it('page→uc is wired by hand: no commands, a hint saying where', () => {
    const m = model();
    const { commands, hint } = materializeCommands(
      m,
      { id: 'x', fromRef: 'page-checkin', toRef: 'uc-book', kind: 'COMMAND' },
      lookup(m).typeOf,
      lookup(m).nameOf,
    );
    expect(commands).toEqual([]);
    expect(hint).toContain('página');
  });
});

describe('saveInteractionCommand — flat server envelope', () => {
  it('emits explicit flat fields and strips every client-only field', () => {
    const i = interaction({
      id: 'int-1',
      name: 'Reserva online',
      description: 'desc',
      triggerKind: 'ACTOR',
      triggerRef: 'huesped',
      ephemeral: true,
      participants: [{ ref: 'huesped', name: 'Huésped', type: 'ACTOR' }],
      messages: [
        {
          id: 'm1',
          fromRef: 'huesped',
          toRef: 'uc-book',
          kind: 'COMMAND',
          label: 'reserva()',
          guard: 'plazo',
          backed: false,
          depth: 2,
        },
      ],
    });
    const cmd = saveInteractionCommand(i);
    expect(cmd).toEqual({
      kind: 'save-interaction',
      id: 'int-1',
      name: 'Reserva online',
      description: 'desc',
      triggerKind: 'ACTOR',
      triggerRef: 'huesped',
      messages: [
        { id: 'm1', fromRef: 'huesped', toRef: 'uc-book', kind: 'COMMAND', label: 'reserva()', guard: 'plazo' },
      ],
    });
    // no client-only field leaks, at any level (the exact shape is asserted above)
    const json = JSON.stringify(cmd);
    for (const leaked of ['backed', 'depth', 'participants', 'ephemeral']) {
      expect(json).not.toContain(leaked);
    }
  });

  it('always carries messages (even empty) and nulls the absent trigger', () => {
    const cmd = saveInteractionCommand(interaction({ id: 'int-2', name: 'Vacía' }));
    expect(cmd).toMatchObject({
      kind: 'save-interaction',
      id: 'int-2',
      triggerKind: null,
      triggerRef: null,
      messages: [],
    });
  });

  it('keeps optional label/guard absent (undefined) when the message lacks them', () => {
    const cmd = saveInteractionCommand(
      interaction({ messages: [{ id: 'm', fromRef: 'a', toRef: 'b', kind: 'EVENT' }] }),
    );
    const msg = (cmd as { messages: Record<string, unknown>[] }).messages[0];
    expect(msg).toEqual({ id: 'm', fromRef: 'a', toRef: 'b', kind: 'EVENT', label: undefined, guard: undefined });
    expect(JSON.stringify(msg)).not.toContain('label');
  });
});

describe('interactionToMermaid', () => {  it('renders participants with safe aliases and typed arrows', () => {
    const i = interaction({
      participants: [
        { ref: 'huesped', name: 'Huésped', type: 'ACTOR' },
        { ref: 'uc-book', name: 'Reservar', type: 'USE_CASE' },
        { ref: 'uc-notify', name: 'Notificar', type: 'USE_CASE' },
      ],
      messages: [
        { id: 'a', fromRef: 'huesped', toRef: 'uc-book', kind: 'COMMAND', label: 'reserva()' },
        { id: 'b', fromRef: 'uc-book', toRef: 'uc-notify', kind: 'EVENT', label: 'BookingConfirmed', depth: 1 },
        { id: 'c', fromRef: 'uc-book', toRef: 'uc-book', kind: 'QUERY', guard: 'hay plazas' },
      ],
    });
    expect(interactionToMermaid(i)).toBe(
      [
        'sequenceDiagram',
        '  participant p1 as Huésped',
        '  participant p2 as Reservar',
        '  participant p3 as Notificar',
        '  p1->>p2: 1 reserva()',
        '  p2-->>p3: 1.1 BookingConfirmed',
        '  p2->>p2: 2 [hay plazas]',
      ].join('\n'),
    );
  });

  it('sanitizes names and texts that would break mermaid statements', () => {
    const i = interaction({
      participants: [
        { ref: 'a', name: 'GET /x: admin; v2', type: 'API_OPERATION' },
        { ref: 'b', name: 'B', type: 'USE_CASE' },
      ],
      messages: [
        { id: 'm', fromRef: 'a', toRef: 'b', kind: 'COMMAND', label: 'llama; ya\nvemos' },
      ],
    });
    const out = interactionToMermaid(i);
    expect(out).toContain('participant p1 as GET /x - admin  v2');
    expect(out).toContain('p1->>p2: 1 llama  ya vemos');
  });

  it('derives missing participants from the messages', () => {
    const i = interaction({
      messages: [{ id: 'a', fromRef: 'x', toRef: 'y', kind: 'EXTERNAL' }],
    });
    const out = interactionToMermaid(i);
    expect(out).toContain('participant p1 as x');
    expect(out).toContain('participant p2 as y');
    expect(out).toContain('p1->>p2: 1');
  });
});
