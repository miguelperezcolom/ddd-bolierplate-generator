// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://modux.mateu.io',
	integrations: [
		starlight({
			title: 'Modux',
			description: 'Model-driven code generation framework for enterprise information systems built with DDD',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/miguelperezcolom/modux' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Spec-Driven Development', slug: 'getting-started/spec-driven-development' },
						{ label: 'Enterprise Information Systems', slug: 'getting-started/enterprise-systems' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Editing the Spec File', slug: 'getting-started/yaml-editing' },
						{ label: 'CI/CD Integration', slug: 'getting-started/cicd' },
					],
				},
				{
					label: 'User Manual',
					items: [
						{ label: 'Overview', slug: 'manual/overview' },
						{ label: 'Workspace', slug: 'manual/workspace' },
						{ label: 'Projects', slug: 'manual/projects' },
						{ label: 'Services', slug: 'manual/services' },
						{ label: 'Modules', slug: 'manual/modules' },
						{ label: 'Flows', slug: 'manual/flows' },
						{ label: 'Aggregates', slug: 'manual/aggregates' },
						{ label: 'Event Sourcing', slug: 'manual/event-sourcing' },
						{ label: 'Entities & Value Objects', slug: 'manual/entities-and-value-objects' },
						{ label: 'Operations', slug: 'manual/operations' },
						{ label: 'Use Cases', slug: 'manual/use-cases' },
						{ label: 'Model Mappings', slug: 'manual/model-mappings' },
						{ label: 'Business Rules', slug: 'manual/business-rules' },
						{ label: 'Domain Events', slug: 'manual/domain-events' },
						{ label: 'Sagas', slug: 'manual/sagas' },
						{ label: 'Projections & Read Models', slug: 'manual/projections' },
						{ label: 'Gateways', slug: 'manual/gateways' },
						{ label: 'Subscriptions', slug: 'manual/subscriptions' },
						{ label: 'Scheduled Triggers', slug: 'manual/scheduled-triggers' },
						{ label: 'Roles & Security', slug: 'manual/roles' },
						{ label: 'Pages', slug: 'manual/pages' },
						{ label: 'Components', slug: 'manual/components' },
						{ label: 'UI Adapters', slug: 'manual/ui-adapters' },
						{ label: 'UI Shells', slug: 'manual/ui-shells' },
						{ label: 'Generating Code', slug: 'manual/generating-code' },
						{ label: 'System Evolution', slug: 'manual/system-evolution' },
						{ label: 'Views & Large Models', slug: 'manual/views-and-large-models' },
						{ label: 'E2E Tests (Playwright)', slug: 'manual/e2e-tests' },
						{ label: 'AI-Assisted Completion', slug: 'manual/ai-completion' },
						{ label: 'MCP Authoring Server', slug: 'manual/mcp-authoring' },
						{ label: 'Starter Recipes', slug: 'manual/recipes' },
						{ label: 'Importing Existing Specs', slug: 'manual/importers' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Architecture', slug: 'reference/architecture' },
						{ label: 'End-to-End Flows', slug: 'reference/flows' },
						{ label: 'Generated Code Structure', slug: 'reference/generated-code' },
						{ label: 'Architecture Patterns', slug: 'reference/patterns' },
						{ label: 'Examples Catalog', slug: 'reference/examples' },
						{ label: 'Maven Plugin', slug: 'reference/maven-plugin' },
					],
				},
			],
		}),
	],
});
