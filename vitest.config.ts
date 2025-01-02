import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*'],
			provider: 'v8',
			thresholds: {
				autoUpdate: true,
				branches: 99.08,
				functions: 95.12,
				lines: 93.79,
				statements: 93.79,
			},
		},
	},
});
