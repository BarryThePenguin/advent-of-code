import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*'],
			provider: 'v8',
			thresholds: {
				autoUpdate: true,
				branches: 99.16,
				functions: 94.92,
				lines: 93.63,
				statements: 93.63,
			},
		},
	},
});
