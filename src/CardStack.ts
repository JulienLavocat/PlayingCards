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

	add(cards: string[]) {
		this.cards.push(...cards);
	}
	addBottom(cards: string[]) {
		this.cards.unshift(...cards);
	}

	draw(amount: number) {
		return this.cards.splice(-amount).reverse();
	}
	drawBottom(amount: number) {
		return this.cards.splice(0, amount);
	}
}
