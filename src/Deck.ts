import { DeckParams } from "./utils/decks/deckParams";
import { deckGenerators } from "./utils";
import { DeckBuilder } from "./DeckBuilder";
import { CardsLibError } from "./CardsLibError";
import { CardStack } from "./CardStack";
import { Pile } from "./Pile";
import { shuffle } from "./utils/shuffle";

/**
 * Represents a deck of cards
 */
export class Deck {
	/**
	 * The moment the deck was created
	 */
	public createdAt: Date;
	/**
	 * The moment the deck was last updated (draw, shuffle, reset, ...)
	 */
	public updatedAt: Date;

	private type: string;
	private count: number;
	private baseCards?: string[];

	private cardStack: CardStack;
	private piles: { [key: string]: Pile };

	/**
	 * Returns a new DeckBuilder instance
	 */
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

		piles?.forEach((pile) => (this.piles[pile] = new Pile(pile)));

		this.cardStack = new CardStack(opts.cards, shuffle);
	}

	/**
	 * Reset a deck, recreating it's card content. This method can be used when you need to reuse a deck or when it's empty.
	 * @param shuffle (Optionnal) Shall the deck be shuffled
	 */
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
					`Unsupported deck type "${this.type}". Please use a custom deck type or submit a Pull Request`
				);

			cards = deckGenerator({
				deckCount: this.count,
			}).cards;
		}

		this.cardStack = new CardStack(cards, shuffle);
	}

	/**
	 * Shuffle the remaining cards in the deck
	 */
	shuffle() {
		this.updatedAt = new Date();
		this.cardStack.shuffle();
	}

	/**
	 * Add cards at the top of the deck
	 * @param cards cards to add
	 */
	add(cards: string[]) {
		this.cardStack.add(cards);
	}
	/**
	 * Add cards at the bottom of the deck
	 * @param cards cards to add
	 */
	addBottom(cards: string[]) {
		this.cardStack.addBottom(cards);
	}

	/**
	 * Draw one or more cards from the top of the deck
	 * @param amount (Optionnal) amount of cards to draw, defaults to 1
	 */
	draw(amount: number = 1) {
		this.updatedAt = new Date();
		return this.cardStack.draw(amount);
	}
	/**
	 * Draw one or more cards from the bottom of the deck
	 * @param amount (Optionnal) amount of cards to draw, defaults to 1
	 */
	drawBottom(amount: number = 1) {
		this.updatedAt = new Date();
		return this.cardStack.drawBottom(amount);
	}

	/**
	 * Returns if the deck is shuffled
	 */
	isShuffled() {
		return this.cardStack.isShuffled;
	}
	/**
	 * Return how many cards are left in the deck
	 */
	remaining() {
		return this.cardStack.cards.length;
	}
	/**
	 * Return the cards array used by the deck, you should normaly not have to use this.
	 */
	getCards() {
		return this.cardStack.cards;
	}

	/**
	 * Get or create a pile of cards in the deck.
	 * @param name Name of the pile
	 */
	getPile(name: string) {
		let pile = this.piles[name];
		if (pile) return pile;

		this.piles[name] = new Pile(name);
		return this.piles[name];
	}
}
