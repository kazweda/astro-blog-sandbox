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
			description: 'Minimal reproduction for starlight-blog feed-like path routing',
			plugins: [starlightBlog()],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kazweda/astro-blog-sandbox' }],
			sidebar: [
				{
					label: 'Reproduction',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Issue Summary', slug: 'guides/repro' },
					],
				},
			],
		}),
	],
});
