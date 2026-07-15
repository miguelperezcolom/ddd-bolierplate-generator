/** The palette: what NEW elements exist, labelled and grouped for humans. */
export const PALETTE_GROUPS = [
  'Estratégico', 'Dominio', 'Distribución', 'APIs', 'Sistema externo', 'IA',
  'Orquestación', 'UI', 'Modelos', 'Layouts', 'Componentes',
  ];

export interface PaletteItem {
  type: string;
  label: string;
  child?: boolean;
  symbol: string;
  color: string;
  /** Section header the item renders under in the «Nuevos» tab. */
  group: string;
}

export const PALETTE_NEW: PaletteItem[] = [
  { type: 'boundedContext', label: 'Contexto', symbol: 'component', color: '#94a3b8', group: 'Estratégico' },
  { type: 'actor', label: 'Actor', symbol: 'person', color: '#64748b', group: 'Estratégico' },
  { type: 'note', label: 'Nota', symbol: 'note', color: '#ca8a04', group: 'Estratégico' },
  { type: 'area', label: 'Área', symbol: 'area', color: '#64748b', group: 'Estratégico' },
  { type: 'project-reference', label: 'Proyecto (catálogo)', symbol: 'component', color: '#334155', group: 'Estratégico' },
  { type: 'external-system', label: 'Sistema externo', symbol: 'component', color: '#64748b', group: 'Estratégico' },
  { type: 'identity-provider', label: 'IdP (identidad)', symbol: 'key', color: '#ca8a04', group: 'Estratégico' },
  { type: 'ai-agent', label: 'Agente IA', symbol: 'robot', color: '#9333ea', group: 'IA' },
  { type: 'external-ai-agent', label: 'Agente IA externo', symbol: 'robot', color: '#9333ea', group: 'IA' },
  { type: 'mcp-gateway', label: 'Gateway MCP', symbol: 'plug', color: '#7c3aed', group: 'IA' },
  { type: 'rag', label: 'RAG', symbol: 'lens', color: '#0e7490', group: 'IA' },
  { type: 'api', label: 'API', child: true, symbol: 'interface', color: '#4f46e5', group: 'APIs' },
  { type: 'proxy-api', label: 'Proxy API', symbol: 'interface', color: '#0e7490', group: 'APIs' },
  { type: 'workflow', label: 'Workflow', symbol: 'process', color: '#6d28d9', group: 'Orquestación' },
  { type: 'workflow-step', label: 'Paso de workflow', child: true, symbol: 'gear', color: '#6d28d9', group: 'Orquestación' },
  { type: 'workflow-join', label: 'Join', child: true, symbol: 'flow', color: '#6d28d9', group: 'Orquestación' },
  { type: 'workflow-split', label: 'Split', child: true, symbol: 'flow', color: '#6d28d9', group: 'Orquestación' },
  { type: 'etl-flow', label: 'Flujo ETL (integrador)', child: true, symbol: 'gear', color: '#0f766e', group: 'Orquestación' },
  { type: 'etl-transform', label: 'Transformación ETL', child: true, symbol: 'gear', color: '#0f766e', group: 'Orquestación' },
  { type: 'aggregate', label: 'Agregado', child: true, symbol: 'aggregate', color: '#8b5cf6', group: 'Dominio' },
  { type: 'invariant', label: 'Invariante', child: true, symbol: 'shield', color: '#0f766e', group: 'Dominio' },
  { type: 'use-case', label: 'Caso de uso', child: true, symbol: 'usecase', color: '#06b6d4', group: 'Dominio' },
  { type: 'use-case-step', label: 'Paso de caso de uso', child: true, symbol: 'gear', color: '#06b6d4', group: 'Dominio' },
  { type: 'policy', label: 'Policy', child: true, symbol: 'usecase', color: '#a855f7', group: 'Dominio' },
  { type: 'domain-event', label: 'Evento de dominio', child: true, symbol: 'event', color: '#f59e0b', group: 'Dominio' },
  { type: 'application-event', label: 'Evento de aplicación', child: true, symbol: 'event', color: '#eab308', group: 'Dominio' },
  { type: 'read-model', label: 'Read model', child: true, symbol: 'readmodel', color: '#10b981', group: 'Dominio' },
  { type: 'domain-service', label: 'Servicio de dominio', child: true, symbol: 'gear', color: '#f43f5e', group: 'Dominio' },
  { type: 'query-service', label: 'Query service', child: true, symbol: 'lens', color: '#0284c7', group: 'Dominio' },
  { type: 'scheduled-trigger', label: 'Trigger programado', child: true, symbol: 'clock', color: '#d97706', group: 'Dominio' },
  { type: 'notification', label: 'Notificación', child: true, symbol: 'event', color: '#db2777', group: 'Dominio' },
  { type: 'document', label: 'Documento/Informe', child: true, symbol: 'readmodel', color: '#475569', group: 'Dominio' },
  { type: 'api-operation', label: 'Operación de API', child: true, symbol: 'usecase', color: '#4f46e5', group: 'APIs' },
  { type: 'external-use-case', label: 'Operación externa', child: true, symbol: 'usecase', color: '#64748b', group: 'Sistema externo' },
  { type: 'external-table', label: 'Tabla externa', child: true, symbol: 'readmodel', color: '#a16207', group: 'Sistema externo' },
  { type: 'mcp-server', label: 'Servidor MCP', child: true, symbol: 'robot', color: '#9333ea', group: 'Sistema externo' },
  { type: 'service', label: 'Servicio (despliegue)', symbol: 'gear', color: '#334155', group: 'Distribución' },
  { type: 'module', label: 'Módulo', child: true, symbol: 'component', color: '#334155', group: 'Distribución' },
  { type: 'ui', label: 'UI', symbol: 'interface', color: '#0ea5e9', group: 'UI' },
  { type: 'ui-app', label: 'App', symbol: 'component', color: '#0ea5e9', group: 'UI' },
  { type: 'ui-app-orchestrator', label: 'Orquestador', symbol: 'process', color: '#0ea5e9', group: 'UI' },
  { type: 'ui-app-masterdetail', label: 'Maestro-detalle', symbol: 'component', color: '#0ea5e9', group: 'UI' },
  { type: 'ui-app-vieweditor', label: 'Vista-editor', symbol: 'process', color: '#c026d3', group: 'UI' },
  { type: 'page', label: 'Página', child: true, symbol: 'interface', color: '#0284c7', group: 'UI' },
  { type: 'menu-item', label: 'Opción de menú', child: true, symbol: 'process', color: '#0ea5e9', group: 'UI' },
  { type: 'button-group', label: 'Grupo de botones', symbol: 'usecase', color: '#0e7490', group: 'UI' },
  { type: 'ui-button', label: 'Botón', child: true, symbol: 'usecase', color: '#0e7490', group: 'UI' },
  { type: 'ui-page-crud', label: 'CRUD', child: true, symbol: 'lens', color: '#0284c7', group: 'UI' },
  { type: 'ui-page-wizard', label: 'Wizard', child: true, symbol: 'flow', color: '#0284c7', group: 'UI' },
  { type: 'ui-wizard-step', label: 'Paso de wizard', child: true, symbol: 'flow', color: '#7c3aed', group: 'UI' },
  { type: 'ui-model', label: 'Modelo', symbol: 'readmodel', color: '#8b5cf6', group: 'UI' },
  { type: 'model-field', label: 'Campo', child: true, symbol: 'gear', color: '#a78bfa', group: 'Modelos' },
  { type: 'transformation', label: 'Transformación', symbol: 'gear', color: '#ea580c', group: 'Modelos' },
  { type: 'custom-code', label: 'Custom code', symbol: 'gear', color: '#0f172a', group: 'Modelos' },
  // Diseño: the Mateu layout vocabulary…
  { type: 'cmp:verticalLayout', label: 'Layout · Vertical', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:horizontalLayout', label: 'Layout · Horizontal', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:formLayout', label: 'Layout · Form', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:splitLayout', label: 'Layout · Split', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:tabLayout', label: 'Layout · Tabs', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:tab', label: 'Layout · Pestaña', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:accordionLayout', label: 'Layout · Acordeón', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:card', label: 'Layout · Card', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:gridLayout', label: 'Layout · Grid', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:boardLayout', label: 'Layout · Board', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:dashboardLayout', label: 'Layout · Dashboard', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:masterDetailLayout', label: 'Layout · Master-detail', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:foldoutLayout', label: 'Layout · Foldout', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:carouselLayout', label: 'Layout · Carrusel', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  { type: 'cmp:appLayout', label: 'Layout · App', symbol: 'component', color: '#0ea5e9', group: 'Layouts' },
  // …and the components that live inside those layouts.
  { type: 'cmp:form', label: 'Componente · Formulario', symbol: 'interface', color: '#0284c7', group: 'Componentes' },
  { type: 'cmp:listing', label: 'Componente · Listado', symbol: 'lens', color: '#0284c7', group: 'Componentes' },
  { type: 'cmp:button', label: 'Componente · Botón', symbol: 'usecase', color: '#0284c7', group: 'Componentes' },
  { type: 'cmp:field', label: 'Componente · Campo', symbol: 'gear', color: '#0284c7', group: 'Componentes' },
  { type: 'cmp:text', label: 'Componente · Texto', symbol: 'readmodel', color: '#0284c7', group: 'Componentes' },
  { type: 'cmp:metricCard', label: 'Componente · Métrica', symbol: 'event', color: '#0284c7', group: 'Componentes' },
  { type: 'cmp:menuBar', label: 'Componente · Menú', symbol: 'process', color: '#0284c7', group: 'Componentes' },
  ];

  /** Every element of the model, grouped for the palette's «Catálogo» tab. */
