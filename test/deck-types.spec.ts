import { Deck } from "../src/Deck";
import { expect } from "chai";
import "mocha";

describe("Deck Types", () => {
	it("Should create a standard deck", () => {
		const deck = Deck.builder().unshuffled().create();
		testDeck(deck, 52, ["AS", "2S", "3S"], ["JH", "QH", "KH"]);
	});

	it("Should create a standard32 deck", () => {
		const deck = Deck.builder().unshuffled().standard32().create();
		testDeck(deck, 32, ["AS", "7S", "8S"], ["JH", "QH", "KH"]);
	});

	it("Should create a standard with jokers deck", () => {
		const deck = Deck.builder().standardWithJokers().unshuffled().create();

		testDeck(deck, 54, ["AS", "2S", "3S"], ["KH", "J", "J"]);
	});

	it("Should create a standard32 with jokers deck", () => {
		const deck = Deck.builder()
			.unshuffled()
			.standard32WithJokers()
			.create();

		testDeck(deck, 34, ["AS", "7S", "8S"], ["KH", "J", "J"]);
	});

	it("Should create a custom deck", () => {
		const customCards = [
			"CustomTest 1",
			"CustomTest 2",
			"CustomTest 3",
			"CustomTest 4",
			"CustomTest 5",
			"CustomTest 6",
		];

		const deck = Deck.builder().unshuffled().custom(customCards).create();
		testDeck(
			deck,
			6,
			["CustomTest 1", "CustomTest 2", "CustomTest 3"],
			["CustomTest 4", "CustomTest 5", "CustomTest 6"]
		);
	});

	it("Should create a blackjack deck", () => {
		const deck = Deck.builder().blackjack().unshuffled().create();
		testDeck(deck, 312, ["AS", "2S", "3S"], ["JH", "QH", "KH"]);
	});

	it("Should create an empty deck", () => {
		const deck = Deck.builder().unshuffled().empty().create();
		testDeck(deck, 0, [], []);
	});

	it("Should create a rummy deck", () => {
		const deck = Deck.builder().rummy().unshuffled().create();
		testDeck(deck, 108, ["AS", "2S", "3S"], ["KH", "J", "J"]);
	});

	it("Should create a tarot deck", () => {
		const deck = Deck.builder().tarot().unshuffled().create();
		testDeck(deck, 78, ["AS", "2S", "3S"], ["20", "21", "Excuse"]);

		deck.reset();
		//testing if some tarrot-exclusive cards are present
		expect(deck.getCards()).to.include.members(["CS", "Excuse", "1", "2", "21"]);
	});
});

function testDeck(
	deck: Deck,
	lengthTest: number,
	topTest: string[],
	bottomTest: string[]
) {
	expect(deck.isShuffled()).to.equals(false);
	expect(deck.getCards().length).to.equals(lengthTest);
	expect(deck.draw(3)).to.eql(topTest);
	expect(deck.drawBottom(3)).to.eql(bottomTest);
}
