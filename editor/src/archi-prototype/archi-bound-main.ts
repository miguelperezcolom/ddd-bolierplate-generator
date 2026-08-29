/**
 * SPIKE: the Archi UX bound to a REAL modux model (aggregates view) with persistence.
 *
 * Proves the pipeline: real ModuxModel → real view builder (aggregatesScene) → Archi
 * shell → edits emit real modux commands → host applies them to the model → persisted
 * to localStorage. Reload restores everything. (Node positions persist as a view layout.)
 *
 * This is the browser stand-in for the IntelliJ plugin host (which would use the JCEF
 * bridge + `.modux/` files instead of localStorage, via the existing store/ide-fs).
 */
import './archi-shell.js';
import type { ArchiShell } from './archi-shell.js';
import type { ModuxModel } from '../model.js';
import type { DiagramLayout } from '../scene.js';
import type { ModuxCommand } from '../commands.js';
import { demoModel } from '../demo/demo-model.js';

const MK = 'archi-bound-model', LK = 'archi-bound-layout';

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
}

let model: ModuxModel = load<ModuxModel | null>(MK, null) ?? structuredClone(demoModel);
let layout: DiagramLayout = load<DiagramLayout>(LK, {});

/** Minimal command applier for the spike's operations (mirrors the demo host). */
function apply(cmd: ModuxCommand): void {
  switch (cmd.kind) {
    case 'rename-element': {
      const list =
        cmd.type === 'boundedContext' ? model.boundedContexts
        : cmd.type === 'aggregate' ? model.aggregates ?? []
        : cmd.type === 'entity' ? model.entities ?? []
        : model.valueObjects ?? [];
      const el = (list as { id: string; name: string }[]).find((x) => x.id === cmd.id);
      if (el) el.name = cmd.name;
      break;
    }
    case 'add-aggregate':
      (model.aggregates ??= []).push({ id: cmd.id, name: cmd.name, boundedContextId: cmd.boundedContextId ?? '' });
      break;
    case 'remove-aggregate':
      model.aggregates = (model.aggregates ?? []).filter((a) => a.id !== cmd.id);
      break;
    default: /* other commands not wired in this spike */ break;
  }
}

const shell = document.createElement('archi-shell') as ArchiShell;
shell.model = model;
shell.viewLayout = layout;
document.body.appendChild(shell);

shell.addEventListener('modux-command', (e) => {
  const { command } = (e as CustomEvent).detail as { command: ModuxCommand };
  apply(command);
  localStorage.setItem(MK, JSON.stringify(model));
  shell.model = { ...model }; // new ref → the shell re-derives the scene from the model
  log('command', command.kind);
});

shell.addEventListener('layout-changed', (e) => {
  layout = (e as CustomEvent).detail.layout as DiagramLayout;
  localStorage.setItem(LK, JSON.stringify(layout));
  log('layout', Object.keys(layout).length + ' posiciones');
});

// Tiny banner so it's obvious this is the bound (real-model) spike + a reset button.
const bar = document.createElement('div');
bar.style.cssText = 'position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:999;background:#0f172a;color:#cbd5e1;font:12px ui-sans-serif;padding:4px 10px;border-radius:8px;display:flex;gap:10px;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,.2)';
bar.innerHTML = '<b style="color:#38bdf8">SPIKE</b> modelo real (vista Agregados) · persiste en localStorage';
const reset = document.createElement('button');
reset.textContent = 'Reset';
reset.style.cssText = 'font:11px ui-sans-serif;border:1px solid #334155;background:#1e293b;color:#cbd5e1;border-radius:5px;padding:2px 8px;cursor:pointer';
reset.onclick = () => { localStorage.removeItem(MK); localStorage.removeItem(LK); location.reload(); };
bar.appendChild(reset);
document.body.appendChild(bar);

function log(kind: string, detail: unknown): void {
  // eslint-disable-next-line no-console
  console.log(`[archi-bound] ${kind}`, detail);
}
