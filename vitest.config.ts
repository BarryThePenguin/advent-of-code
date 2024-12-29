import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*'],
			provider: 'v8',
			thresholds: {
				autoUpdate: true,
				branches: 96.3,
				functions: 93.71,
				lines: 92.47,
				statements: 92.47,
			},
		},
	},
});
