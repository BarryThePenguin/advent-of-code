const digits = /-?\d+/g;

const positiveDigits = /\d+/g;

const characters = /\w+/g;

export function lines(input: string, separator = '\n') {
	return input.split(separator);
}

export function integers(input: string) {
	return input.matchAll(digits).map(Number);
}

export function positiveIntegers(input: string) {
	return input.matchAll(positiveDigits).map(Number);
}

export function words(input: string) {
	return input.matchAll(characters).map(String);
}
