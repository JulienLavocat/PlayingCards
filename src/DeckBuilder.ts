import { Deck } from "./Deck";
import { DeckParams } from "./utils/decks/deckParams";
import { deckGenerators } from "./utils";
import { CardsLibError } from "./CardsLibError";
import { DeckQuery } from "./utils/decks/deckQuery";

export class DeckBuilder {
	private params: DeckQuery;
	private isShuffled: boolean;
	private type: string;

	constructor() {
		this.isShuffled = true;
		this.type = "standard";
		this.params = {
			deckCount: 1,
		};
	}

	unshuffled() {
		this.isShuffled = false;
		return this;
	}

	deckCount(amount: number) {
		this.params.deckCount = amount;
		return this;
	}

	blackjack() {
		this.type = "blackjack";
		return this;
	}
	standardWithJokers() {
		this.type = "standardJokers";
		return this;
	}
	standard32() {
		this.type = "standard32";
		return this;
	}
	standard32WithJokers() {
		this.type = "standard32Jokers";
		return this;
	}
	tarot() {
		this.type = "tarot";
		return this;
	}
	rummy() {
		this.type = "rummy";
		return this;
	}
	uno() {
		this.type = "uno";
		return this;
	}
	empty() {
		this.type = "empty";
		return this;
	}
	custom(cards: string[]) {
		this.params.cards = cards;
		this.type = "custom";
		return this;
	}

	create(): Deck {
		const deckGenerator = deckGenerators[this.type];
		if (!deckGenerator)
			throw new CardsLibError(
				"Deck type " +
					this.type +
					"is not supported. Please use a custom deck type or submit a Pull Request"
			);

		return new Deck(deckGenerator(this.params), this.isShuffled);
	}
}
