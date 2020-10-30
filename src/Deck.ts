import { DeckParams } from "./utils/decks/deckParams";
import { deckGenerators } from "./utils";
import { DeckBuilder } from "./DeckBuilder";
import { CardsLibError } from "./CardsLibError";
import { CardStack } from "./CardStack";

export class Deck {
	public createdAt: Date;
	public updatedAt: Date;

	private type: string;
	private count: number;
	private baseCards?: string[];

	private cardStack: CardStack;
	private piles: { [key: string]: CardStack };

	static builder() {
		return new DeckBuilder();
	}

	constructor(opts: DeckParams, shuffle = false, piles?: string[]) {
		this.type = opts.type;
		this.count = opts.count;
		this.baseCards = opts.baseCards;
		this.piles = {};
		this.createdAt = new Date();
		this.updatedAt = new Date();

		piles?.forEach((pile) => (this.piles[pile] = new CardStack([], false)));

		this.cardStack = new CardStack(opts.cards, shuffle);
	}

	reset(shuffle: boolean = false) {
		this.updatedAt = new Date();

		let cards: string[] = [];

		if (this.type === "custom" && this.baseCards) {
			for (let i = 0; i < this.count; i++)
				cards.push.apply(cards, this.baseCards);
		} else {
			const deckGenerator = deckGenerators[this.type];
			if (!deckGenerator)
				throw new CardsLibError(
					"Deck type " +
						this.type +
						"is not supported. Please use a custom deck type or submit a Pull Request"
				);

			cards = deckGenerator({
				deckCount: this.count,
			}).cards;
		}

		this.cardStack = new CardStack(cards, shuffle);
	}

	shuffle() {
		this.updatedAt = new Date();
		this.cardStack.shuffle();
	}

	draw(amount: number = 1) {
		this.updatedAt = new Date();
		return this.cardStack.draw(amount);
	}
	drawBottom(amount: number = 1) {
		this.updatedAt = new Date();
		return this.cardStack.drawBottom(amount);
	}

	isShuffled() {
		return this.cardStack.isShuffled;
	}
	remaining() {
		return this.cardStack.cards.length;
	}
	getCards() {
		return this.cardStack.cards;
	}
}
