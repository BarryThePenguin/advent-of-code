enum MarkerLength {
	packet = 4,
	message = 14,
}

class Marker<T> {
	items: T[] = [];

	constructor(protected maxLength: number) {}

	get packet() {
		return new Set(this.items);
	}

	get value() {
		if (this.packet.size === this.maxLength) {
			return this.items.join('');
		}

		return false;
	}

	add(element: T) {
		this.items.push(element);

		if (this.items.length > this.maxLength) {
			this.items.shift();
		}
	}

	position(signal: string) {
		if (this.value) {
			return signal.indexOf(this.value) + this.maxLength;
		}

		return undefined;
	}
}

class Device {
	lockOn(signal: string, markerLength: number) {
		let index = 0;
		const marker = new Marker<string>(markerLength);

		while (marker.value === false && index < signal.length) {
			const character = signal.at(index);
			index++;

			if (character) {
				marker.add(character);
			}
		}

		return marker.position(signal);
	}
}

export const partOne = (input: string) => {
	const device = new Device();
	return device.lockOn(input, MarkerLength.packet);
};

export const partTwo = (input: string) => {
	const device = new Device();
	return device.lockOn(input, MarkerLength.message);
};
