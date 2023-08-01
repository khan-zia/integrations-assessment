/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	cacheDir: './node_modules/.vite/interfaces-interview-assignment',

	server: {
		port: 4200,
		host: 'localhost',
	},

	preview: {
		port: 4300,
		host: 'localhost',
	},

	plugins: [
		react(),
		viteTsConfigPaths({
			root: './',
		}),
		svgr({
			svgrOptions: {
				plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
				svgoConfig: {
					plugins: ['preset-default', 'prefixIds'],
				},
			},
		}),
	],

	test: {
		globals: true,
		cache: {
			dir: './node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
});
