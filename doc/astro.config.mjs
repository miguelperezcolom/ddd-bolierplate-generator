// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://modux.mateu.io',
	integrations: [
		starlight({
			title: 'Modux',
			description: 'Spec-driven code generation framework for Domain-Driven Design systems',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/miguelperezcolom/modux' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'User Manual',
					items: [
						{ label: 'Overview', slug: 'manual/overview' },
						{ label: 'Projects', slug: 'manual/projects' },
						{ label: 'Services', slug: 'manual/services' },
						{ label: 'Modules', slug: 'manual/modules' },
						{ label: 'Aggregates', slug: 'manual/aggregates' },
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
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Architecture', slug: 'reference/architecture' },
						{ label: 'Generated Code Structure', slug: 'reference/generated-code' },
						{ label: 'Architecture Patterns', slug: 'reference/patterns' },
					],
				},
			],
		}),
	],
});
