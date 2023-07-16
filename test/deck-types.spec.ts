import { Deck } from "../src/Deck";
import { CARDS } from "../src/utils/decks/tarot";

describe("Deck Types", () => {
	it("Should create a standard deck", () => {
		const deck = Deck.builder().unshuffled().build();
		testDeck(deck, 52, ["KH", "QH", "JH"], ["AS", "2S", "3S"]);
	});

	it("Should create a standard32 deck", () => {
		const deck = Deck.builder().unshuffled().standard32().build();
		testDeck(deck, 32, ["KH", "QH", "JH"], ["AS", "7S", "8S"]);
	});

	it("Should create a standard with jokers deck", () => {
		const deck = Deck.builder().standardWithJokers().unshuffled().build();

		testDeck(deck, 54, ["J", "J", "KH"], ["AS", "2S", "3S"]);
	});

	it("Should create a standard32 with jokers deck", () => {
		const deck = Deck.builder().unshuffled().standard32WithJokers().build();

		testDeck(deck, 34, ["J", "J", "KH"], ["AS", "7S", "8S"]);
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

		const deck = Deck.builder().unshuffled().custom(customCards).build();
		testDeck(
			deck,
			6,
			["CustomTest 6", "CustomTest 5", "CustomTest 4"],
			["CustomTest 1", "CustomTest 2", "CustomTest 3"]
		);
	});

	it("Should create a blackjack deck", () => {
		const deck = Deck.builder().blackjack().unshuffled().build();
		testDeck(deck, 312, ["KH", "QH", "JH"], ["AS", "2S", "3S"]);
	});

	it("Should create an empty deck", () => {
		const deck = Deck.builder().unshuffled().empty().build();
		testDeck(deck, 0, [], []);
	});

	it("Should create a rummy deck", () => {
		const deck = Deck.builder().rummy().unshuffled().build();
		testDeck(deck, 108, ["J", "J", "KH"], ["AS", "2S", "3S"]);
	});

	it("Should create a tarot deck", () => {
		const deck = Deck.builder().tarot().unshuffled().build();
		testDeck(deck, 78, ["Excuse", "21", "20"], ["AS", "2S", "3S"]);

		deck.reset();
		//testing if some tarrot-exclusive cards are present
		expect(deck.getCards()).toEqual(CARDS);
	});
});

function testDeck(
	deck: Deck,
	lengthTest: number,
	topTest: string[],
	bottomTest: string[]
) {
	expect(deck.isShuffled()).toBe(false);
	expect(deck.getCards()).toHaveLength(lengthTest);
	expect(deck.draw(3)).toStrictEqual(topTest);
	expect(deck.drawBottom(3)).toStrictEqual(bottomTest);
}
