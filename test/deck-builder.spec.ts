import { Deck } from "../src/Deck";
import { expect } from "chai";
import "mocha";

describe("DeckBuilder", () => {

	it("Should create a deck", () => {
		const deck = Deck.builder().create();
		expect(deck).to.be.an.instanceOf(Deck);
	})
	it("Should create a deck with 3 times the cards", () => {
		const deck = Deck.builder().custom(["Card", "Card"]).deckCount(3).create();
		expect(deck.getCards().length).to.equals(6);
	});
	it("Should reset a deck", () => {
		const deck = Deck.builder().custom(["Card", "Card"]).deckCount(3).create();
		expect(deck.getCards().length).to.equals(6);
		deck.draw(2);
		expect(deck.getCards().length).to.equals(4);
		deck.reset();
		expect(deck.getCards().length).to.equals(6);
		expect(deck.getCards()).to.eql(["Card", "Card", "Card", "Card", "Card", "Card"]);
	});
	it("Should shuffle a deck", () => {
		// TODO
	});
});
