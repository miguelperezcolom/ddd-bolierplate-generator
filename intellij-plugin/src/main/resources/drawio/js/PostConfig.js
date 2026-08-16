/**
 * Copyright (c) 2006-2024, JGraph Holdings Ltd
 * Copyright (c) 2006-2024, draw.io AG
 */
// null'ing of global vars need to be after init.js
window.ICONSEARCH_PATH = null;
window.ICON_SERVICE_PATH = null;

// ==== MODUX ADDITION (not part of stock draw.io) ============================================
// Replaces draw.io's default shape palettes with a SINGLE palette of exactly the strategic elements
// modux can GENERATE — you cannot draw something the DSL cannot express. Each shape is a real
// ArchiMate-3 stencil and carries a `moduxType` attribute, so the host's `fromMx` types it directly.
//
// We wrap Sidebar.prototype.init (not the ?p= plugin registry, which embed mode ignores for
// security): PostConfig runs after app.min.js and before App.main, so the class exists and every
// sidebar built afterwards gets ours. After the stock palettes are built we clear them and add only
// Modux — restrict, not merely append.
(function () {
  if (typeof Sidebar === 'undefined') return;
  var ARCHI = 'html=1;outlineConnect=0;whiteSpace=wrap;shape=mxgraph.archimate3.application;';
  var SHAPES = [
    { kind: 'boundedContext', label: 'Bounded Context', w: 150, h: 75, style: ARCHI + 'appType=comp;archiType=square;fillColor=#99ffff;' },
    { kind: 'system', label: 'System', w: 160, h: 100, style: ARCHI + 'appType=grouping;archiType=square;dashed=1;fillColor=none;' },
    { kind: 'externalSystem', label: 'External System', w: 150, h: 75, style: ARCHI + 'appType=comp;archiType=square;fillColor=#EBEBEB;' },
    { kind: 'actor', label: 'Actor', w: 75, h: 100, style: ARCHI + 'appType=actor;archiType=square;fillColor=#ffff99;' }
  ];

  function installModuxPalette(sb) {
    // Hide the stock palettes (keep draw.io's internal refs intact — clearing container innerHTML
    // breaks addPalette's rendering), then add Modux at the top.
    try {
      Object.keys(sb.palettes || {}).forEach(function (k) {
        (sb.palettes[k] || []).forEach(function (el) { if (el && el.style) el.style.display = 'none'; });
      });
    } catch (e) { /* keep going */ }
    try {
      sb.addPalette('modux', 'Modux (ArchiMate)', true, function (content) {
        SHAPES.forEach(function (s) {
          var doc = mxUtils.createXmlDocument();
          var obj = doc.createElement('object');
          obj.setAttribute('label', s.label);
          obj.setAttribute('moduxType', s.kind); // the primary signal fromMx reads
          var cell = new mxCell(obj, new mxGeometry(0, 0, s.w, s.h), s.style);
          cell.vertex = true;
          content.appendChild(sb.createVertexTemplateFromCells([cell], s.w, s.h, s.label, true, null, true));
        });
      });
      if (window.console) console.log('modux palette installed (' + Object.keys(sb.palettes).length + ' palettes)');
    } catch (e) { if (window.console) console.warn('modux palette failed: ' + e); }
  }

  var origInit = Sidebar.prototype.init;
  Sidebar.prototype.init = function () {
    if (typeof origInit === 'function') {
      try { origInit.apply(this, arguments); } catch (e) { /* keep going */ }
    }
    var sb = this;
    // Defer past the current init stack so the graph/editor are ready for createVertexTemplateFromCells.
    if (window.setTimeout) window.setTimeout(function () { installModuxPalette(sb); }, 300);
    else installModuxPalette(sb);
  };
})();
// ==== end MODUX ADDITION ====================================================================
