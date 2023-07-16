import { CardStack } from "../src/CardStack";
import { Pile } from "../src/Pile";
import * as utils from "../src/utils";

describe("Pile", () => {
	let pile: Pile;

	beforeEach(() => {
		pile = new Pile("test");
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe("constructor", () => {
		it("should create a pile", () => {
			expect(pile).toBeInstanceOf(Pile);
		});

		it("should create a pile with the provided name", () => {
			expect(pile.getName()).toBe("test");
		});

		it("should create a pile with an empty card stack", () => {
			expect(pile.getCards()).toHaveLength(0);
		});

		it("should create a pile with a creation date", () => {
			expect(pile.getCreatedAt()).toBeInstanceOf(Date);
		});

		it("should create a pile with an update date", () => {
			expect(pile.getUpdatedAt()).toBeInstanceOf(Date);
		});

		it("should create a pile with a creation date equal to the update date", () => {
			expect(pile.getCreatedAt()).toStrictEqual(pile.getUpdatedAt());
		});
	});

	describe("add", () => {
		it("should add a card to the pile", () => {
			pile.add(["AS"]);
			expect(pile.getCards()).toStrictEqual(["AS"]);
		});

		it("should add multiple cards to the pile", () => {
			pile.add(["AS", "2S"]);
			expect(pile.getCards()).toStrictEqual(["AS", "2S"]);
		});

		it("should update the update date", () => {
			const date = pile.getUpdatedAt();
			jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
			pile.add(["AS"]);
			expect(pile.getUpdatedAt()).not.toStrictEqual(date);
		});
	});

	describe("addBottom", () => {
		it("should add a card to the bottom of the pile", () => {
			pile.addBottom(["AS"]);
			expect(pile.getCards()).toStrictEqual(["AS"]);
		});

		it("should add multiple cards to the bottom of the pile", () => {
			pile.addBottom(["AS", "2S"]);
			expect(pile.getCards()).toStrictEqual(["AS", "2S"]);
		});

		it("should update the update date", () => {
			const date = pile.getUpdatedAt();
			jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
			pile.addBottom(["AS"]);
			expect(pile.getUpdatedAt()).not.toStrictEqual(date);
		});
	});

	describe("draw", () => {
		beforeEach(() => {
			pile.add(["AS", "2S", "3S"]);
		});

		it("should draw one card from the top of the pile", () => {
			expect(pile.draw()).toStrictEqual(["3S"]);
		});

		it("should draw multiple cards from the top of the pile", () => {
			expect(pile.draw(2)).toStrictEqual(["3S", "2S"]);
		});

		it("should update the update date", () => {
			const date = pile.getUpdatedAt();
			jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
			pile.draw();
			expect(pile.getUpdatedAt()).not.toStrictEqual(date);
		});
	});

	describe("drawBottom", () => {
		beforeEach(() => {
			pile.add(["AS", "2S", "3S"]);
		});

		it("should draw one card from the bottom of the pile", () => {
			expect(pile.drawBottom()).toStrictEqual(["AS"]);
		});

		it("should draw multiple cards from the bottom of the pile", () => {
			expect(pile.drawBottom(2)).toStrictEqual(["AS", "2S"]);
		});

		it("should update the update date", () => {
			const date = pile.getUpdatedAt();
			jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
			pile.drawBottom();
			expect(pile.getUpdatedAt()).not.toStrictEqual(date);
		});
	});

	describe("shuffle", () => {
		beforeEach(() => {
			pile.add(["AS", "2S", "3S"]);
		});

		it("should shuffle the pile", () => {
			const cards = pile.getCards();
			const shuffleSpy = jest.spyOn(utils, "shuffle");
			pile.shuffle();
			expect(shuffleSpy).toHaveBeenCalledWith(cards);
		});

		it("should update the update date", () => {
			const date = pile.getUpdatedAt();
			jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
			pile.shuffle();
			expect(pile.getUpdatedAt()).not.toStrictEqual(date);
		});
	});

	describe("isShuffled", () => {
		it("should return false if the pile is not shuffled", () => {
			expect(pile.isShuffled()).toBe(false);
		});

		it("should return true if the pile is shuffled", () => {
			pile.shuffle();
			expect(pile.isShuffled()).toBe(true);
		});
	});

	describe("getCards", () => {
		it("should return the cards in the pile", () => {
			pile.add(["AS", "2S", "3S"]);
			expect(pile.getCards()).toStrictEqual(["AS", "2S", "3S"]);
		});
	});

	describe("remaining", () => {
		it("should return the number of cards in the pile", () => {
			pile.add(["AS", "2S", "3S"]);
			expect(pile.remaining()).toBe(3);
		});
	});

	describe("getName", () => {
		it("should return the name of the pile", () => {
			expect(pile.getName()).toBe("test");
		});
	});

	describe("getCreatedAt", () => {
		it("should return the creation date of the pile", () => {
			expect(pile.getCreatedAt()).toBeInstanceOf(Date);
		});
	});

	describe("getUpdatedAt", () => {
		it("should return the update date of the pile", () => {
			expect(pile.getUpdatedAt()).toBeInstanceOf(Date);
		});
	});
});
