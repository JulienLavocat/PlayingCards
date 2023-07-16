import { CardStack } from "./CardStack";

/**
 * Represents a pile of cards
 */
export class Pile {
	/**
	 * Name of the pile
	 */
	private readonly name: string;
	/**
	 * The moment the deck was created
	 */
	private readonly createdAt: Date;
	/**
	 * The moment the deck was last updated (draw, shuffle, reset, ...)
	 */
	private updatedAt: Date;

	private cardStack: CardStack;

	constructor(name: string) {
		this.name = name;
		this.cardStack = new CardStack([], false);
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	/**
	 * Shuffle the remaining cards in the pile
	 */
	shuffle() {
		this.cardStack.shuffle();
		this.updatedAt = new Date();
	}

	/**
	 * Add cards at the top of the pile
	 * @param cards cards to add
	 */
	add(cards: string[]) {
		this.cardStack.add(cards);
		this.updatedAt = new Date();
	}
	/**
	 * Add cards at the bottom of the pile
	 * @param cards cards to add
	 */
	addBottom(cards: string[]) {
		this.cardStack.addBottom(cards);
		this.updatedAt = new Date();
	}

	/**
	 * Draw one or more cards from the top of the pile
	 * @param amount (Optionnal) amount of cards to draw, defaults to 1
	 */
	draw(amount: number = 1) {
		const result = this.cardStack.draw(amount);
		this.updatedAt = new Date();
		return result;
	}
	/**
	 * Draw one or more cards from the bottom of the pile
	 * @param amount (Optionnal) amount of cards to draw, defaults to 1
	 */
	drawBottom(amount: number = 1) {
		const result = this.cardStack.drawBottom(amount);
		this.updatedAt = new Date();
		return result;
	}

	/**
	 * Returns if the pile is shuffled
	 */
	isShuffled() {
		return this.cardStack.isShuffled;
	}
	/**
	 * Return how many cards are left in the pile
	 */
	remaining() {
		return this.cardStack.cards.length;
	}
	/**
	 * Return the cards array used by the pile, you should normaly not have to use this.
	 */
	getCards() {
		return this.cardStack.cards;
	}

	/**
	 * Return the name of the pile
	 * @returns the name of the pile
	 */
	getName() {
		return this.name;
	}

	/**
	 * Return the moment the pile was created
	 * @returns the moment the pile was created
	 */
	getCreatedAt() {
		return this.createdAt;
	}

	/**
	 * Return the moment the pile was last updated
	 * @returns the moment the pile was last updated
	 */
	getUpdatedAt() {
		return this.updatedAt;
	}
}
