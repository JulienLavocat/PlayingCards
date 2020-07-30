import { DeckParams } from './utils/decks/deckParams';
import {deckGenerators, shuffle as shuffleArray} from "./utils";
import { DeckBuilder } from './DeckBuilder';
import { CardsLibError } from './CardsLibError';

export class Deck {

	private type: string;
	private count: number;
	private remaining: number;
	public cards: string[];
	private shuffled: boolean;
	private piles: any;
	private baseCards?: string[];
	public createdAt: Date;
	public updatedAt: Date;

	static builder() {
		return new DeckBuilder();
	}

	constructor(opts: DeckParams, shuffle = false, piles?: string[]) {
		this.type = opts.type;
		this.count = opts.count;
		this.remaining = opts.cards.length;
		this.cards = opts.cards;
		this.shuffled = shuffle;
		this.baseCards = opts.baseCards;
		this.piles = {};
		this.createdAt = new Date();
		this.updatedAt = new Date();

		piles?.forEach(pile => this.piles[pile] = {});

		if (this.shuffled) shuffleArray(this.cards);
	}

	reset() {
		this.cards = [];

		if (this.type === "custom" && this.baseCards) {
			for (let i = 0; i < this.count; i++)
				this.cards.push.apply(this.cards, this.baseCards);
		} else {
			const deckGenerator = deckGenerators[this.type];
			if (!deckGenerator)
				throw new CardsLibError("Deck type " + this.type + "is not supported. Please use a custom deck type or submit a Pull Request");

			this.cards = deckGenerator({
				deckCount: this.count
			}).cards;
		}

		this.cards = shuffleArray(this.cards);
		this.remaining = this.cards.length;
		this.shuffled = true;
	}

	shuffle() {
		this.cards = shuffleArray(this.cards);
		this.shuffled = true;
	}

	draw(amount: number = 1) {
		amount = Math.min(this.remaining, amount);
		this.remaining = this.cards.length - amount;
		return this.cards.splice(0, amount);
	}
	drawBottom(amount: number = 1) {
		amount = Math.min(this.remaining, amount);
		this.remaining = this.cards.length - amount;
		return this.cards.splice(-1, amount);
	}
}
