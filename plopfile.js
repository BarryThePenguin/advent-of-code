export default function plopfile(
	/** @type {import('plop').NodePlopAPI} */
	plop,
) {
	const today = new Date();
	plop.setGenerator('day', {
		description: 'Create files for day',
		prompts: [
			{
				type: 'number',
				name: 'year',
				message: 'What year is it?',
				default: today.getFullYear(),
			},
			{
				type: 'number',
				name: 'day',
				message: 'What day is it?',
				default: today.getDate(),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/{{year}}/day-{{day}}.ts',
				templateFile: 'plop-templates/day.ts',
			},
			{
				type: 'add',
				path: 'src/{{year}}/day-{{day}}.test.ts',
				templateFile: 'plop-templates/day-test.ts',
			},
			{
				type: 'add',
				path: 'input/{{year}}/day-{{day}}',
			},
		],
	});
}
