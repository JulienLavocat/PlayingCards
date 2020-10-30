import { expect } from "chai";
import "mocha";
import { Deck } from "../src/Deck";

describe("Deck", () => {
	it("Should return a valid card array", () => {
		const deck = getDeck();
		expect(deck).to.be.an.instanceOf(Deck);
		expect(deck.getCards().length).to.equals(52);
	});

	it("Should return an unshuffled deck", () => {
		const deck = getDeck();
		expect(deck).to.be.an.instanceOf(Deck);
		expect(deck.isShuffled()).to.equals(false);
	});

	it("Should shuffle a deck", () => {
		const deck = getDeck();
		deck.shuffle();

		expect(deck).to.be.an.instanceOf(Deck);
		expect(deck.isShuffled()).to.equals(true);
	});

	it("Should draw 2 card", () => {
		const deck = getDeck();
		expect(deck).to.be.an.instanceOf(Deck);
		expect(deck.draw(2)).to.eql(["AS", "2S"]);
	});

	it("Should draw 2 card at the bottom of the deck", () => {
		const deck = getDeck();
		expect(deck).to.be.an.instanceOf(Deck);
		expect(deck.drawBottom(2)).to.eql(["QH", "KH"]);
	});

	it("Should return the correct amount of cards remaining", () => {
		const deck = getDeck();
		expect(deck).to.be.an.instanceOf(Deck);
		expect(deck.drawBottom(2)).to.eql(["QH", "KH"]);
		expect(deck.remaining()).to.equals(50);
	});
});

function getDeck() {
	return Deck.builder().unshuffled().create();
}
