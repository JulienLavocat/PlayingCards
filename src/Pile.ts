import { CardStack } from './CardStack';
export class Pile {

	public name: string;
	public createdAt: Date;
	public updatedAt: Date;

	private cardStack: CardStack;

	constructor(name: string, shuffle: boolean = false) {
		this.name = name;
		this.cardStack = new CardStack([], shuffle);
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	shuffle() {
		this.updatedAt = new Date();
		this.cardStack.shuffle();
	}

	add(cards: string[] | string) {
		if(typeof cards === "string")
			this.cardStack.add([cards]);
		else
			this.cardStack.add(cards);
	}
	addBottom(cards: string[] | string) {
		if(typeof cards === "string")
			this.cardStack.addBottom([cards]);
		else
			this.cardStack.addBottom(cards);
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