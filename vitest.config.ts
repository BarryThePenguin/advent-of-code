import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		testTimeout: 10_000,
		coverage: {
			include: ['src/**/*'],
			provider: 'v8',
			thresholds: {
				autoUpdate: true,
				branches: 99.08,
				functions: 93.52,
				lines: 94.2,
				statements: 94.2,
			},
		},
	},
});
