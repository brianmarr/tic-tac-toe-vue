export class ai {
	constructor(names) {
		let seed = Math.floor(Math.random() * names.length);
		this.name = names[seed];
	}
	computeTurn(emptySquares) {
		let seed = Math.floor(Math.random() * emptySquares.length);
		return emptySquares[seed];
	}
}
