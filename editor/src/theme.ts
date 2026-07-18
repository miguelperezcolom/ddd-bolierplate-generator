import { css } from 'lit';

/**
 * The editor's palette, as CSS custom properties (they pierce shadow boundaries
 * by inheritance, so defining them on the host covers every descendant surface).
 * Light defaults mirror the standalone look; under mateu's dark mode
 * (`:host([dark])`) they map onto Vaadin's Lumo variables — with hard fallbacks
 * for when the wrapper is not Vaadin — so the editor dresses like its wrapper.
 */
export const MODUX_THEME = css`
  :host {
    --modux-canvas-bg: #fafafa;
    --modux-surface: #ffffff;
    --modux-surface-2: #f1f5f9;
    --modux-border: #e2e8f0;
    --modux-border-strong: #cbd5e1;
    --modux-text: #334155;
    --modux-text-dim: #64748b;
    --modux-text-faint: #94a3b8;
    --modux-node-fill: #ffffff;
    --modux-node-stroke: #94a3b8;
    --modux-edge: #64748b;
    --modux-primary: #2563eb;
    --modux-primary-soft: rgba(37, 99, 235, 0.08);
    --modux-primary-text: #ffffff;
    --modux-dots: #e2e8f0;
    --modux-guide: #ec4899;
    --modux-note-fill: #fef9c3;
    --modux-danger: #dc2626;
    --modux-derive: #a855f7;
    --modux-input-bg: #ffffff;
  }
  :host([dark]) {
    --modux-canvas-bg: var(--lumo-base-color, #181a1b);
    --modux-surface: var(--lumo-contrast-5pct, #1f2123);
    --modux-surface-2: var(--lumo-contrast-10pct, #26282b);
    --modux-border: var(--lumo-contrast-20pct, #3a3d42);
    --modux-border-strong: var(--lumo-contrast-30pct, #4b4f55);
    --modux-text: var(--lumo-body-text-color, #e8e9ea);
    --modux-text-dim: var(--lumo-secondary-text-color, #a8adb4);
    --modux-text-faint: var(--lumo-tertiary-text-color, #7d838b);
    --modux-node-fill: var(--lumo-contrast-5pct, #232527);
    --modux-node-stroke: var(--lumo-contrast-40pct, #6b7280);
    --modux-edge: var(--lumo-secondary-text-color, #9aa1a9);
    --modux-primary: var(--lumo-primary-color, #60a5fa);
    --modux-primary-soft: var(--lumo-primary-color-10pct, rgba(96, 165, 250, 0.14));
    --modux-primary-text: var(--lumo-primary-contrast-color, #ffffff);
    --modux-dots: var(--lumo-contrast-10pct, #2c2f33);
    --modux-guide: #f472b6;
    --modux-note-fill: #453d10;
    --modux-danger: var(--lumo-error-color, #f87171);
    --modux-derive: #c084fc;
    --modux-input-bg: var(--lumo-base-color, #181a1b);
  }
`;
