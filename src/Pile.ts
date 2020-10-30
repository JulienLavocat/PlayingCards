import { CardStack } from './CardStack';

/**
 * Represents a pile of cards
 */
export class Pile {

	/**
	 * Name of the pile
	 */
	public name: string;
	/**
	 * The moment the deck was created
	 */
	public createdAt: Date;
	/**
	 * The moment the deck was last updated (draw, shuffle, reset, ...)
	 */
	public updatedAt: Date;

	private cardStack: CardStack;

	constructor(name: string, shuffle: boolean = false) {
		this.name = name;
		this.cardStack = new CardStack([], shuffle);
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	/**
	 * Shuffle the remaining cards in the pile
	 */
	shuffle() {
		this.updatedAt = new Date();
		this.cardStack.shuffle();
	}

	/**
	 * Add cards at the top of the pile
	 * @param cards cards to add
	 */
	add(cards: string[]) {
		this.cardStack.add(cards);
	}
	/**
	 * Add cards at the bottom of the pile
	 * @param cards cards to add
	 */
	addBottom(cards: string[]) {
		this.cardStack.addBottom(cards);
	}

	/**
	 * Draw one or more cards from the top of the pile
	 * @param amount (Optionnal) amount of cards to draw, defaults to 1
	 */
	draw(amount: number = 1) {
		this.updatedAt = new Date();
		return this.cardStack.draw(amount);
	}
	/**
	 * Draw one or more cards from the bottom of the pile
	 * @param amount (Optionnal) amount of cards to draw, defaults to 1
	 */
	drawBottom(amount: number = 1) {
		this.updatedAt = new Date();
		return this.cardStack.drawBottom(amount);
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

}