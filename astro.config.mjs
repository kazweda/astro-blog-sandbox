// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
	site: 'https://kazweda.github.io',
	base: '/astro-blog-sandbox',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'astro-blog-sandbox',
			description: 'Observation sandbox for Astro trailingSlash behavior with endpoint-like paths',
			plugins: [starlightBlog()],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kazweda/astro-blog-sandbox' }],
			sidebar: [
				{
					label: 'Observation',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Behavior Notes', slug: 'guides/repro' },
					],
				},
			],
		}),
	],
});
