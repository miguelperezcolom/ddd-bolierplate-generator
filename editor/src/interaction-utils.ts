import type {
  InteractionMessageKind,
  InteractionMessageRef,
  InteractionParticipantRef,
  InteractionRef,
  ModuxModel,
} from './model.js';
import type { ModuxCommand } from './commands.js';
import { slug } from './ids.js';

/**
 * Pure helpers for the «Secuencias» (interactions) view: participant derivation,
 * message numbering and ordering, kind inference, backing checks, materialization
 * commands and the mermaid export. No DOM, no Lit — unit-testable.
 */

/** Lifelines of the diagram: the declared ones, then any message endpoint not listed. */
export function deriveParticipants(interaction: InteractionRef): InteractionParticipantRef[] {
  const declared = interaction.participants ?? [];
  const seen = new Set(declared.map((p) => p.ref));
  const extras: InteractionParticipantRef[] = [];
  for (const m of interaction.messages) {
    for (const ref of [m.fromRef, m.toRef]) {
      if (!seen.has(ref)) {
        seen.add(ref);
        extras.push({ ref, name: ref, type: 'UNKNOWN' });
      }
    }
  }
  return [...declared, ...extras];
}

/**
 * UML numbering from position + depth: top-level messages run 1, 2, 3…; a message
 * with depth d continues the counter of level d (1.1, 1.2, 2.1…). A level opened
 * without its parent still numbers sanely (gaps default to 1).
 */
export function messageNumbers(messages: InteractionMessageRef[]): string[] {
  const counters: number[] = [];
  return messages.map((m) => {
    const d = Math.max(0, m.depth ?? 0);
    for (let i = 0; i < d; i++) counters[i] = counters[i] || 1;
    counters[d] = (counters[d] || 0) + 1;
    counters.length = d + 1;
    return counters.join('.');
  });
}

/** ref → participant type for every catalog element (external use cases ride as EXTERNAL_SYSTEM). */
export function catalogTypeOf(model: ModuxModel): Map<string, string> {
  const map = new Map<string, string>();
  for (const a of model.actors ?? []) map.set(a.id, 'ACTOR');
  for (const app of model.uiApps ?? []) map.set(app.id, 'APP');
  for (const p of model.pages ?? []) map.set(p.id, 'PAGE');
  for (const bc of model.boundedContexts) {
    for (const u of bc.useCases ?? []) map.set(u.id, 'USE_CASE');
    for (const rm of bc.readModels ?? []) map.set(rm.id, 'READ_MODEL');
    for (const ds of bc.domainServices ?? []) map.set(ds.id, 'DOMAIN_SERVICE');
    for (const qs of bc.queryServices ?? []) map.set(qs.id, 'QUERY_SERVICE');
  }
  for (const a of model.aggregates ?? []) map.set(a.id, 'AGGREGATE');
  for (const x of model.externalSystems) {
    map.set(x.id, 'EXTERNAL_SYSTEM');
    for (const u of x.useCases ?? []) map.set(u.id, 'EXTERNAL_SYSTEM');
  }
  for (const api of model.apis ?? []) {
    map.set(api.id, 'API');
    for (const op of api.operations) map.set(op.id, 'API_OPERATION');
  }
  for (const g of model.aiAgents ?? []) map.set(g.id, 'AI_AGENT');
  for (const p of model.processes ?? []) map.set(p.id, 'PROCESS');
  for (const w of model.workflows ?? []) map.set(w.id, 'WORKFLOW');
  return map;
}

/** ref → display name for every catalog element (participants override it). */
export function catalogNameOf(model: ModuxModel): Map<string, string> {
  const map = new Map<string, string>();
  const put = (id: string, name: string) => map.set(id, name);
  for (const a of model.actors ?? []) put(a.id, a.name);
  for (const app of model.uiApps ?? []) put(app.id, app.name);
  for (const p of model.pages ?? []) put(p.id, p.name);
  for (const bc of model.boundedContexts) {
    for (const u of bc.useCases ?? []) put(u.id, u.name);
    for (const rm of bc.readModels ?? []) put(rm.id, rm.name);
    for (const ds of bc.domainServices ?? []) put(ds.id, ds.name);
    for (const qs of bc.queryServices ?? []) put(qs.id, qs.name);
    for (const ev of bc.domainEvents ?? []) put(ev.id, ev.name);
    for (const ev of bc.applicationEvents ?? []) put(ev.id, ev.name);
  }
  for (const a of model.aggregates ?? []) put(a.id, a.name);
  for (const x of model.externalSystems) {
    put(x.id, x.name);
    for (const u of x.useCases ?? []) put(u.id, `${x.name} · ${u.name}`);
  }
  for (const api of model.apis ?? []) {
    put(api.id, api.name);
    for (const op of api.operations) put(op.id, `${api.name} · ${op.name}`);
  }
  for (const g of model.aiAgents ?? []) put(g.id, g.name);
  for (const p of model.processes ?? []) put(p.id, p.name);
  for (const w of model.workflows ?? []) put(w.id, w.name);
  return map;
}

/** The event a participant emits with this name, if any (domain or application). */
function eventIdByName(model: ModuxModel, name: string): string | null {
  for (const bc of model.boundedContexts) {
    const hit =
      (bc.domainEvents ?? []).find((e) => e.name === name) ??
      (bc.applicationEvents ?? []).find((e) => e.name === name);
    if (hit) return hit.id;
  }
  return null;
}

/** The use case / query service's owning bounded context (flows target contexts). */
function owningBoundedContextOf(model: ModuxModel, ref: string): string | null {
  const bc = model.boundedContexts.find(
    (m) =>
      (m.useCases ?? []).some((u) => u.id === ref) ||
      (m.queryServices ?? []).some((q) => q.id === ref) ||
      (m.readModels ?? []).some((r) => r.id === ref),
  );
  return bc?.id ?? null;
}

/**
 * The kind of a fresh message dragged from `from` to `to`: EVENT when the model
 * already carries an event link between them (its label is the event name),
 * otherwise inferred from the target's type.
 */
export function inferMessageKind(
  model: ModuxModel,
  from: InteractionParticipantRef,
  to: InteractionParticipantRef,
): { kind: InteractionMessageKind; label?: string } {
  const types = catalogTypeOf(model);
  // The projection keys a flow's emitter by triggerAggregateId only (use-case
  // emitters resolve through the emission-based path below).
  const direct = model.flows.find(
    (f) =>
      f.archetype === 'TRIGGERS' &&
      f.triggerEvent &&
      f.targetUseCaseId === to.ref &&
      f.triggerAggregateId === from.ref,
  );
  if (direct) return { kind: 'EVENT', label: direct.triggerEvent };
  // Emission-based: from emits E and some TRIGGERS flow lands E on `to`.
  const emitted = [
    ...(model.emissions ?? []),
    ...(model.useCaseEmissions ?? []),
  ].filter((e) => e.sourceId === from.ref);
  for (const em of emitted) {
    const name = catalogNameOf(model).get(em.domainEventId);
    if (!name) continue;
    const flow = model.flows.find(
      (f) => f.archetype === 'TRIGGERS' && f.triggerEvent === name && f.targetUseCaseId === to.ref,
    );
    if (flow) return { kind: 'EVENT', label: name };
    const sub = (model.subscriptions ?? []).find(
      (s) =>
        s.eventName === name &&
        (s.actions ?? []).some((a) => a.type === 'CallUseCase' && a.useCaseId === to.ref),
    );
    if (sub) return { kind: 'EVENT', label: name };
  }
  const toType = to.type !== 'UNKNOWN' ? to.type : (types.get(to.ref) ?? 'UNKNOWN');
  if (toType === 'QUERY_SERVICE' || toType === 'READ_MODEL') return { kind: 'QUERY' };
  if (toType === 'EXTERNAL_SYSTEM') return { kind: 'EXTERNAL' };
  return { kind: 'COMMAND' };
}

/** typeOf/nameOf resolvers for one interaction: its participants win, the catalog fills in. */
export function lookupFor(
  model: ModuxModel,
  interaction: InteractionRef,
): { typeOf(ref: string): string; nameOf(ref: string): string } {
  const types = catalogTypeOf(model);
  const names = catalogNameOf(model);
  const declared = new Map((interaction.participants ?? []).map((p) => [p.ref, p]));
  return {
    typeOf: (ref) =>
      declared.get(ref)?.type && declared.get(ref)!.type !== 'UNKNOWN'
        ? declared.get(ref)!.type
        : (types.get(ref) ?? declared.get(ref)?.type ?? 'UNKNOWN'),
    nameOf: (ref) => declared.get(ref)?.name ?? names.get(ref) ?? ref,
  };
}

/** Insert at a clamped index (order = position). Returns a fresh array. */
export function insertMessageAt(
  messages: InteractionMessageRef[],
  message: InteractionMessageRef,
  index: number,
): InteractionMessageRef[] {
  const at = Math.max(0, Math.min(messages.length, index));
  const next = [...messages];
  next.splice(at, 0, message);
  return next;
}

/** Move one message to a new index. Returns a fresh array (same order if unknown id). */
export function moveMessage(
  messages: InteractionMessageRef[],
  id: string,
  toIndex: number,
): InteractionMessageRef[] {
  const from = messages.findIndex((m) => m.id === id);
  if (from < 0) return messages;
  const next = messages.filter((m) => m.id !== id);
  const at = Math.max(0, Math.min(next.length, toIndex));
  next.splice(at, 0, messages[from]);
  return next;
}

/** Drop one message. Returns a fresh array. */
export function removeMessage(
  messages: InteractionMessageRef[],
  id: string,
): InteractionMessageRef[] {
  return messages.filter((m) => m.id !== id);
}

/** Drop a lifeline and every message touching it. Returns a fresh interaction. */
export function withoutParticipant(interaction: InteractionRef, ref: string): InteractionRef {
  return {
    ...interaction,
    participants: (interaction.participants ?? []).filter((p) => p.ref !== ref),
    messages: interaction.messages.filter((m) => m.fromRef !== ref && m.toRef !== ref),
  };
}

/** Does the model already realize this message? (Same rules the lint applies.) */
export function computeBacked(
  model: ModuxModel,
  message: InteractionMessageRef,
  typeOf: (ref: string) => string,
): boolean {
  const from = message.fromRef;
  const to = message.toRef;
  const fromType = typeOf(from);
  const toType = typeOf(to);
  switch (message.kind) {
    case 'COMMAND': {
      if (fromType === 'USE_CASE' && toType === 'USE_CASE')
        return (model.useCaseCalls ?? []).some((c) => c.sourceId === from && c.targetId === to);
      if (fromType === 'USE_CASE' && toType === 'AGGREGATE')
        return (model.aggregateCalls ?? []).some((c) => c.sourceId === from && c.targetId === to);
      if (fromType === 'ACTOR' && (toType === 'USE_CASE' || toType === 'QUERY_SERVICE'))
        return (model.actorUses ?? []).some((c) => c.actorId === from && c.targetId === to);
      if (fromType === 'API_OPERATION' && toType === 'USE_CASE')
        return (model.apis ?? []).some((a) =>
          a.operations.some((o) => o.id === from && o.targetUseCaseId === to),
        );
      if (fromType === 'EXTERNAL_SYSTEM' && toType === 'USE_CASE')
        return (model.externalCalls ?? []).some(
          (c) => c.externalSystemId === from && c.useCaseId === to,
        );
      if ((fromType === 'PAGE' || fromType === 'APP') && toType === 'USE_CASE') {
        const page = (model.pages ?? []).find((p) => p.id === from);
        if (page && (page.buttons ?? []).some((b) => b.useCaseId === to)) return true;
        const app = (model.uiApps ?? []).find((a) => a.id === from);
        const walk = (items?: { useCaseId?: string; children?: unknown[] }[]): boolean =>
          (items ?? []).some(
            (i) => i.useCaseId === to || walk(i.children as { useCaseId?: string }[] | undefined),
          );
        return !!app && walk(app.menuItems);
      }
      if (fromType === 'AI_AGENT' && toType === 'USE_CASE')
        return (model.agentUses ?? []).some((c) => c.agentId === from && c.useCaseId === to);
      return false;
    }
    case 'QUERY': {
      if (fromType === 'USE_CASE' && toType === 'QUERY_SERVICE')
        return (model.queryCalls ?? []).some((c) => c.sourceId === from && c.targetId === to);
      if (fromType === 'ACTOR' && toType === 'QUERY_SERVICE')
        return (model.actorUses ?? []).some((c) => c.actorId === from && c.targetId === to);
      if (fromType === 'AI_AGENT' && toType === 'QUERY_SERVICE')
        return (model.agentQueryUses ?? []).some(
          (c) => c.agentId === from && c.queryServiceId === to,
        );
      if (fromType === 'PAGE' && toType === 'QUERY_SERVICE')
        return (model.pages ?? []).some((p) => p.id === from && p.listingQueryServiceId === to);
      if (toType === 'READ_MODEL')
        return (model.projections ?? []).some((p) => p.readModelId === to);
      return false;
    }
    case 'EVENT': {
      const label = message.label ?? '';
      const eventId = eventIdByName(model, label);
      const emitted =
        (!!eventId &&
          [...(model.emissions ?? []), ...(model.useCaseEmissions ?? [])].some(
            (e) => e.sourceId === from && e.domainEventId === eventId,
          )) ||
        // an aggregate-operation emission keyed by NAME (flows reference names, not ids)
        model.flows.some(
          (f) =>
            f.archetype === 'TRIGGERS' &&
            f.triggerEvent === label &&
            f.triggerAggregateId === from,
        );
      const consumed =
        model.flows.some(
          (f) => f.archetype === 'TRIGGERS' && f.triggerEvent === label && f.targetUseCaseId === to,
        ) ||
        (model.subscriptions ?? []).some(
          (s) =>
            s.eventName === label &&
            (s.actions ?? []).some((a) => a.type === 'CallUseCase' && a.useCaseId === to),
        );
      return emitted && consumed;
    }
    case 'EXTERNAL': {
      if (fromType === 'USE_CASE' && toType === 'EXTERNAL_SYSTEM') {
        const direct = (model.externalUseCaseCalls ?? []).some(
          (c) => c.sourceId === from && c.targetId === to,
        );
        if (direct) return true;
        const system = model.externalSystems.find((x) => x.id === to);
        return !!system?.useCases?.some((u) =>
          (model.externalUseCaseCalls ?? []).some(
            (c) => c.sourceId === from && c.targetId === u.id,
          ),
        );
      }
      return false;
    }
  }
}

/**
 * The «✨ materialize» fix: the EXISTING commands that build the mechanism
 * realizing this message. `commands` empty + `hint` = it is wired by hand
 * somewhere else (the hint says where).
 */
export function materializeCommands(
  model: ModuxModel,
  message: InteractionMessageRef,
  typeOf: (ref: string) => string,
  nameOf: (ref: string) => string,
): { commands: ModuxCommand[]; hint?: string } {
  const from = message.fromRef;
  const to = message.toRef;
  const fromType = typeOf(from);
  const toType = typeOf(to);
  const hand = (where: string) => ({
    commands: [] as ModuxCommand[],
    hint: `Este enlace se cablea a mano: ${where}`,
  });
  switch (message.kind) {
    case 'COMMAND': {
      if (fromType === 'USE_CASE' && toType === 'USE_CASE')
        return { commands: [{ kind: 'add-use-case-call', sourceId: from, targetId: to }] };
      if (fromType === 'USE_CASE' && toType === 'AGGREGATE')
        return { commands: [{ kind: 'add-aggregate-call', sourceId: from, targetId: to }] };
      if (fromType === 'ACTOR' && (toType === 'USE_CASE' || toType === 'QUERY_SERVICE'))
        return { commands: [{ kind: 'add-actor-use', sourceId: from, targetId: to }] };
      if (fromType === 'API_OPERATION' && toType === 'USE_CASE') {
        const api = (model.apis ?? []).find((a) => a.operations.some((o) => o.id === from));
        return api
          ? {
              commands: [
                { kind: 'set-api-operation-target', apiId: api.id, id: from, targetUseCaseId: to },
              ],
            }
          : hand('la operación no cuelga de ninguna API del catálogo');
      }
      if (fromType === 'PAGE' || fromType === 'APP')
        return hand('un botón (o entrada de menú) apuntando al caso de uso, en la ficha de la página/app');
      return hand(`conecta ${nameOf(from)} → ${nameOf(to)} en el mapa del sistema`);
    }
    case 'QUERY': {
      if (fromType === 'USE_CASE' && toType === 'QUERY_SERVICE')
        return { commands: [{ kind: 'add-query-call', sourceId: from, targetId: to }] };
      if (fromType === 'ACTOR' && toType === 'QUERY_SERVICE')
        return { commands: [{ kind: 'add-actor-use', sourceId: from, targetId: to }] };
      if (fromType === 'PAGE')
        return hand('el listing de la página apuntando al query service, en la ficha de la página');
      return hand(`conecta ${nameOf(from)} → ${nameOf(to)} en el mapa del sistema`);
    }
    case 'EXTERNAL': {
      if (fromType === 'USE_CASE' && toType === 'EXTERNAL_SYSTEM')
        return { commands: [{ kind: 'add-external-uc-call', sourceId: from, targetId: to }] };
      return hand(`conecta ${nameOf(from)} → ${nameOf(to)} en el mapa del sistema`);
    }
    case 'EVENT': {
      const label = message.label ?? '';
      if (toType !== 'USE_CASE')
        return hand('el destino de un evento debe ser un caso de uso (la suscripción reacciona)');
      const eventId = eventIdByName(model, label);
      if (!eventId)
        return hand(`el evento «${label}» no existe en el catálogo — créalo primero en su contexto`);
      const commands: ModuxCommand[] = [];
      const emitted = [...(model.emissions ?? []), ...(model.useCaseEmissions ?? [])].some(
        (e) => e.sourceId === from && e.domainEventId === eventId,
      );
      if (!emitted) commands.push({ kind: 'add-emission', sourceId: from, targetId: eventId });
      const flowExists = model.flows.some(
        (f) => f.archetype === 'TRIGGERS' && f.triggerEvent === label && f.targetUseCaseId === to,
      );
      if (!flowExists) {
        const targetBc = owningBoundedContextOf(model, to) ?? '';
        commands.push({
          kind: 'add-flow',
          id: `flow-${slug(label)}-${slug(nameOf(to))}`,
          name: nameOf(to),
          archetype: 'TRIGGERS',
          triggerAggregateId: fromType === 'AGGREGATE' ? from : '',
          triggerDomainServiceId: fromType === 'DOMAIN_SERVICE' ? from : undefined,
          triggerUseCaseId: fromType === 'USE_CASE' ? from : undefined,
          triggerEvent: label,
          targetId: targetBc,
          targetUseCaseId: to,
        });
      }
      return commands.length
        ? { commands }
        : hand('el evento ya está emitido y suscrito — falta asociarlo a este mensaje');
    }
  }
}

/**
 * The FLAT save-interaction command the server expects: explicit fields only —
 * client-only `backed`/`depth`/`participants`/`ephemeral` are stripped — and
 * `messages` always present (an omitted list would keep the stored one).
 */
export function saveInteractionCommand(i: InteractionRef): ModuxCommand {
  return {
    kind: 'save-interaction',
    id: i.id ?? '',
    name: i.name,
    description: i.description,
    triggerKind: i.triggerKind ?? null,
    triggerRef: i.triggerRef ?? null,
    messages: (i.messages ?? []).map((m) => ({
      id: m.id,
      fromRef: m.fromRef,
      toRef: m.toRef,
      kind: m.kind,
      label: m.label,
      guard: m.guard,
    })),
  };
}

/** Mermaid `sequenceDiagram` of the interaction (flat — returns kept simple). */
export function interactionToMermaid(interaction: InteractionRef): string {
  const participants = deriveParticipants(interaction);
  const alias = new Map(participants.map((p, i) => [p.ref, `p${i + 1}`]));
  // Mermaid statements end at ';' or newline; ':' breaks participant aliases.
  const clean = (s: string, strict = false) => {
    const flat = s.replace(/[\r\n;]+/g, ' ').trim();
    return strict ? flat.replace(/:/g, ' -') : flat;
  };
  const lines = ['sequenceDiagram'];
  for (const p of participants) {
    lines.push(`  participant ${alias.get(p.ref)} as ${clean(p.name, true)}`);
  }
  const numbers = messageNumbers(interaction.messages);
  interaction.messages.forEach((m, i) => {
    const from = alias.get(m.fromRef);
    const to = alias.get(m.toRef);
    if (!from || !to) return;
    const arrow = m.kind === 'EVENT' ? '-->>' : '->>';
    const text = [numbers[i], m.label ?? '', m.guard ? `[${m.guard}]` : '']
      .filter(Boolean)
      .join(' ');
    lines.push(`  ${from}${arrow}${to}: ${clean(text)}`);
  });
  return lines.join('\n');
}

/** Candidates for the «＋ Participante…» select, grouped for the toolbar. */
export function participantCatalog(
  model: ModuxModel,
): { ref: string; name: string; label: string; type: string; group: string }[] {
  const out: { ref: string; name: string; label: string; type: string; group: string }[] = [];
  const push = (ref: string, name: string, type: string, group: string, owner?: string) =>
    out.push({ ref, name, label: owner ? `${name} (${owner})` : name, type, group });
  for (const a of model.actors ?? []) push(a.id, a.name, 'ACTOR', 'Actores');
  for (const app of model.uiApps ?? []) push(app.id, app.name, 'APP', 'Apps');
  for (const p of model.pages ?? []) push(p.id, p.name, 'PAGE', 'Páginas');
  for (const bc of model.boundedContexts) {
    for (const u of bc.useCases ?? []) push(u.id, u.name, 'USE_CASE', 'Casos de uso', bc.name);
    for (const a of (model.aggregates ?? []).filter((x) => x.boundedContextId === bc.id))
      push(a.id, a.name, 'AGGREGATE', 'Agregados', bc.name);
    for (const ds of bc.domainServices ?? [])
      push(ds.id, ds.name, 'DOMAIN_SERVICE', 'Servicios de dominio', bc.name);
    for (const qs of bc.queryServices ?? [])
      push(qs.id, qs.name, 'QUERY_SERVICE', 'Query services', bc.name);
    for (const rm of bc.readModels ?? [])
      push(rm.id, rm.name, 'READ_MODEL', 'Read models', bc.name);
  }
  for (const x of model.externalSystems) push(x.id, x.name, 'EXTERNAL_SYSTEM', 'Sistemas externos');
  for (const api of model.apis ?? []) {
    push(api.id, api.name, 'API', 'APIs');
    for (const op of api.operations)
      push(op.id, `${api.name} · ${op.name}`, 'API_OPERATION', 'Operaciones API');
  }
  for (const g of model.aiAgents ?? []) push(g.id, g.name, 'AI_AGENT', 'Agentes');
  for (const p of model.processes ?? []) push(p.id, p.name, 'PROCESS', 'Procesos');
  for (const w of model.workflows ?? []) push(w.id, w.name, 'WORKFLOW', 'Workflows');
  return out;
}

/** Entry points the server can derive an interaction from (the «Derivar de:» select). */
export function derivationCandidates(
  model: ModuxModel,
): { kind: 'USE_CASE' | 'API_OPERATION' | 'EVENT'; ref: string; label: string }[] {
  const out: { kind: 'USE_CASE' | 'API_OPERATION' | 'EVENT'; ref: string; label: string }[] = [];
  for (const bc of model.boundedContexts) {
    for (const u of bc.useCases ?? [])
      out.push({ kind: 'USE_CASE', ref: u.id, label: `${u.name} (${bc.name})` });
    for (const e of [...(bc.domainEvents ?? []), ...(bc.applicationEvents ?? [])])
      // Events are keyed by NAME everywhere (flows, subscriptions): ref = name.
      out.push({ kind: 'EVENT', ref: e.name, label: `${e.name} (${bc.name})` });
  }
  for (const api of model.apis ?? [])
    for (const op of api.operations)
      out.push({
        kind: 'API_OPERATION',
        ref: op.id,
        label: `${op.httpMethod ? `${op.httpMethod} ` : ''}${op.name} (${api.name})`,
      });
  return out;
}
