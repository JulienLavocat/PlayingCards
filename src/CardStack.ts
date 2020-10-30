import { shuffle as shuffleArray } from "./utils";

export class CardStack {
	public cards: string[];
	public isShuffled: boolean;

	constructor(cards: string[], shuffled: boolean) {
		this.cards = cards;
		this.isShuffled = shuffled;
		if (this.isShuffled) shuffleArray(this.cards);
	}

	shuffle() {
		this.cards = shuffleArray(this.cards);
		this.isShuffled = true;
	}

	draw(amount: number) {
		return this.cards.splice(0, amount);
	}
	drawBottom(amount: number) {
		return this.cards.splice(-amount);
	}
}
