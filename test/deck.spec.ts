import { CardStack } from "../src/CardStack";
import { CardsLibError } from "../src/CardsLibError";
import { Deck } from "../src/Deck";
import { Pile } from "../src/Pile";

describe("Deck", () => {
	let deck: Deck;

	beforeEach(() => {
		deck = Deck.builder().unshuffled().build();
	});

	describe("constructor", () => {
		it("should create a deck", () => {
			expect(deck).toBeInstanceOf(Deck);
		});

		it("Should return a valid card array", () => {
			expect(deck.getCards()).toHaveLength(52);
		});

		it("Should return an unshuffled deck", () => {
			const shuffleSpy = jest.spyOn(
				(deck as any).cardStack as CardStack,
				"shuffle"
			);
			expect(deck.isShuffled()).toBe(false);
			expect(shuffleSpy).not.toHaveBeenCalled();
		});

		it("should create a deck with one deck", () => {
			expect(deck.getCards()).toHaveLength(52);
		});

		it("should create a deck with two decks", () => {
			deck = Deck.builder().deckCount(2).build();
			expect(deck.getCards()).toHaveLength(104);
		});
	});

	describe("reset", () => {
		it("should reset the deck", () => {
			deck.draw(2);
			deck.reset();
			expect(deck.getCards()).toHaveLength(52);
		});

		it("should throw an error when an unsupported deck type is provided", () => {
			expect(() => {
				new Deck({
					cards: [],
					type: "unsupported" as any,
					count: 1,
				}).reset();
			}).toThrowError(CardsLibError);
		});

		it("should reset a custom deck", () => {
			deck = Deck.builder()
				.unshuffled()
				.custom(["1", "2", "3", "4", "5", "6"])
				.deckCount(2)
				.build();
			deck.draw(2);
			deck.reset();
			expect(deck.getCards()).toHaveLength(12);
		});
	});

	describe("add", () => {
		it("should add cards to the top of the deck", () => {
			deck.add(["AS", "2S"]);
			expect(deck.getCards()).toHaveLength(54);
			expect(deck.getCards()[0]).toBe("AS");
			expect(deck.getCards()[1]).toBe("2S");
		});
	});

	describe("addBottom", () => {
		it("should add cards to the bottom of the deck", () => {
			deck.addBottom(["AS", "2S"]);
			expect(deck.getCards()).toHaveLength(54);
			expect(deck.getCards()[0]).toBe("AS");
			expect(deck.getCards()[1]).toBe("2S");
		});
	});

	describe("getPile", () => {
		it("should create a pile", () => {
			const pile = deck.getPile("test");
			expect(pile).toBeInstanceOf(Pile);
		});

		it("should return an existing pile", () => {
			const pile = deck.getPile("test");
			expect(pile).toBeInstanceOf(Pile);
			expect(deck.getPile("test")).toBe(pile);
		});
	});

	describe("draw", () => {
		it("should draw one card", () => {
			const card = deck.draw();
			expect(card).toStrictEqual(["KH"]);
			expect(deck.remaining()).toBe(51);
		});

		it("should draw multiple cards", () => {
			const cards = deck.draw(2);
			expect(cards).toHaveLength(2);
			expect(cards[0]).toBe("KH");
			expect(cards[1]).toBe("QH");
			expect(deck.remaining()).toBe(50);
		});
	});

	describe("drawBottom", () => {
		it("should draw one card", () => {
			const card = deck.drawBottom();
			expect(card).toStrictEqual(["AS"]);
			expect(deck.remaining()).toBe(51);
		});

		it("should draw multiple cards", () => {
			const cards = deck.drawBottom(2);
			expect(cards).toHaveLength(2);
			expect(cards[0]).toBe("AS");
			expect(cards[1]).toBe("2S");
			expect(deck.remaining()).toBe(50);
		});
	});

	describe("remaining", () => {
		it("should return the number of cards remaining in the deck", () => {
			deck.draw(2);
			expect(deck.remaining()).toBe(50);
		});
	});

	describe("shuffle", () => {
		it("should shuffle the deck", () => {
			const shuffleSpy = jest.spyOn(
				(deck as any).cardStack as CardStack,
				"shuffle"
			);
			deck.shuffle();
			expect(shuffleSpy).toHaveBeenCalled();
		});
	});

	describe("isShuffled", () => {
		it("should return true if the deck is shuffled", () => {
			deck.shuffle();
			expect(deck.isShuffled()).toBe(true);
		});

		it("should return false if the deck is not shuffled", () => {
			expect(deck.isShuffled()).toBe(false);
		});
	});
});
