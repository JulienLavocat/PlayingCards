import { CardsLibError } from "../src/CardsLibError";
import { Deck } from "../src/Deck";
import { DeckBuilder } from "../src/DeckBuilder";
import * as utils from "../src/utils";

describe("DeckBuilder", () => {
	describe("constructor()", () => {
		it("should create a shuffled deck", () => {
			const db = new DeckBuilder();
			expect((db as any).isShuffled).toBe(true);
		});

		it("should create a standard deck", () => {
			const db = new DeckBuilder();
			expect((db as any).type).toBe("standard");
		});

		it("should create a deck with one deck", () => {
			const db = new DeckBuilder();
			expect((db as any).params.deckCount).toBe(1);
		});
	});

	describe("unshuffled()", () => {
		it("should create an unshuffled deck", () => {
			const db = new DeckBuilder().unshuffled();
			expect((db as any).isShuffled).toBe(false);
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("deckCount()", () => {
		it("should create a deck with 2 decks", () => {
			const db = new DeckBuilder().deckCount(2);
			expect((db as any).params.deckCount).toBe(2);
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("blackjack()", () => {
		it("should create a blackjack deck", () => {
			const db = new DeckBuilder().blackjack();
			expect((db as any).type).toBe("blackjack");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("standardWithJokers()", () => {
		it("should create a standard deck with jokers", () => {
			const db = new DeckBuilder().standardWithJokers();
			expect((db as any).type).toBe("standardJokers");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("standard32()", () => {
		it("should create a standard 32 deck", () => {
			const db = new DeckBuilder().standard32();
			expect((db as any).type).toBe("standard32");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("standard32WithJokers()", () => {
		it("should create a standard 32 deck with jokers", () => {
			const db = new DeckBuilder().standard32WithJokers();
			expect((db as any).type).toBe("standard32Jokers");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("tarot()", () => {
		it("should create a tarot deck", () => {
			const db = new DeckBuilder().tarot();
			expect((db as any).type).toBe("tarot");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("rummy()", () => {
		it("should create a rummy deck", () => {
			const db = new DeckBuilder().rummy();
			expect((db as any).type).toBe("rummy");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("uno()", () => {
		it("should create an uno deck", () => {
			const db = new DeckBuilder().uno();
			expect((db as any).type).toBe("uno");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("empty()", () => {
		it("should create an empty deck", () => {
			const db = new DeckBuilder().empty();
			expect((db as any).type).toBe("empty");
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("custom()", () => {
		it("should create a custom deck", () => {
			const db = new DeckBuilder().custom(["AS", "2S"]);
			expect((db as any).type).toBe("custom");
			expect((db as any).params.cards).toEqual(["AS", "2S"]);
			expect(db).toBeInstanceOf(DeckBuilder);
		});
	});

	describe("build()", () => {
		it("should create a deck", () => {
			const deck = new DeckBuilder().build();
			expect(deck).toBeInstanceOf(Deck);
		});

		it("should create a deck with 2 decks", () => {
			const deck = new DeckBuilder().deckCount(2).build();
			expect(deck.getCards()).toHaveLength(104);
		});

		it("should create a deck with 2 decks and jokers", () => {
			const deck = new DeckBuilder()
				.deckCount(2)
				.standardWithJokers()
				.build();
			expect(deck.getCards()).toHaveLength(108);
		});

		it("should create a blackjack deck", () => {
			const deck = new DeckBuilder().blackjack().build();
			expect(deck.getCards()).toHaveLength(312);
		});

		it("should create a standard deck", () => {
			const deck = new DeckBuilder().build();
			expect(deck.getCards()).toHaveLength(52);
		});

		it("should create a standard deck with jokers", () => {
			const deck = new DeckBuilder().standardWithJokers().build();
			expect(deck.getCards()).toHaveLength(54);
		});

		it("should create a standard 32 deck", () => {
			const deck = new DeckBuilder().standard32().build();
			expect(deck.getCards()).toHaveLength(32);
		});

		it("should create a standard 32 deck with jokers", () => {
			const deck = new DeckBuilder().standard32WithJokers().build();
			expect(deck.getCards()).toHaveLength(34);
		});

		it("should create a tarot deck", () => {
			const deck = new DeckBuilder().tarot().build();
			expect(deck.getCards()).toHaveLength(78);
		});

		it("should create a rummy deck", () => {
			const deck = new DeckBuilder().rummy().build();
			expect(deck.getCards()).toHaveLength(108);
		});

		it("should create an uno deck", () => {
			const deck = new DeckBuilder().uno().build();
			expect(deck.getCards()).toHaveLength(54);
		});

		it("should create an empty deck", () => {
			const deck = new DeckBuilder().empty().build();
			expect(deck.getCards()).toHaveLength(0);
		});

		it("should create a custom deck", () => {
			const deck = new DeckBuilder().custom(["AS", "2S"]).build();
			expect(deck.getCards()).toHaveLength(2);
		});

		it("should create an unshuffled deck", () => {
			const shuffleSpy = jest.spyOn(utils, "shuffle");
			const deck = new DeckBuilder().unshuffled().build();
			expect(deck.getCards()).toHaveLength(52);
			expect(shuffleSpy).not.toHaveBeenCalled();
		});

		it("should create a shuffled deck", () => {
			const shuffleSpy = jest.spyOn(utils, "shuffle");
			const deck = new DeckBuilder().build();
			expect(deck.getCards()).toHaveLength(52);
			expect(shuffleSpy).toHaveBeenCalled();
		});

		it("should throw an error when an unknown deck type is used", () => {
			const deckBuilder = new DeckBuilder();
			(deckBuilder as any).type = "unknown";
			expect(() => deckBuilder.build()).toThrow(
				"Deck type unknown is not supported. Please use a custom deck type or submit a Pull Request"
			);
			expect(() => deckBuilder.build()).toThrow(CardsLibError);
		});
	});
});
