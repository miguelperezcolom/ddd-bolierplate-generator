import { chromium } from '/home/mperezco/IdeaProjects/node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8194/');
await page.evaluate(async () => {
  await import('/modux-editor/modux-editor.js');
  const el = document.createElement('modux-editor-connected');
  el.setAttribute('base', '/modux/editor');
  document.body.appendChild(el);
});
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const find = (node, tag) => {
    if (!node) return null;
    if (node.tagName?.toLowerCase() === tag) return node;
    for (const k of [...(node.shadowRoot?.querySelectorAll('*') ?? []), ...node.querySelectorAll('*')]) {
      const hit = find(k, tag); if (hit) return hit;
    }
    return null;
  };
  const ed = find(document.querySelector('modux-editor-connected'), 'modux-editor');
  ed._yugo = false; ed._tilt = false;
  const scene = ed.sceneFor('context-map');
  const api = (ed.model.apis ?? []).find((a) => a.id === 'api-tridion');
  return {
    publisher: api?.publishedByExternalSystemId ?? null,
    apiNode: scene.nodes.find((n) => n.id === 'api-tridion') ?? 'AUSENTE',
    rnetKids: scene.nodes.filter((n) => n.parentId === 'ext-rnet').map((n) => `${n.id}(${n.kind})`),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
