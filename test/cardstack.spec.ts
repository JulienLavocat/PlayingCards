import { CardStack } from "../src/CardStack";
import * as utils from "../src/utils";

describe("CardStack", () => {
	const cards = ["1", "2", "3", "4", "5", "6"].reverse();

	let stack: CardStack;

	beforeEach(() => {
		stack = new CardStack([...cards], false);
	});

	describe("constructor()", () => {
		it("should be defined", () => {
			expect(stack).toBeInstanceOf(CardStack);
		});

		it("should be created with 6 cards", () => {
			expect(stack.cards).toHaveLength(6);
		});

		it("should not be shuffled", () => {
			expect(stack.isShuffled).toBe(false);
		});
	});

	describe("draw()", () => {
		it("Should draw 2 cards from the top of a CardStack", () => {
			expect(stack.cards).toHaveLength(6);
			expect(stack.draw(2)).toStrictEqual(["1", "2"]);
			expect(stack.cards).toHaveLength(4);
		});
	});

	describe("drawBottom()", () => {
		it("Should draw 2 cards from the bottom of a CardStack", () => {
			expect(stack.cards).toHaveLength(6);
			expect(stack.drawBottom(2)).toEqual(["6", "5"]);
			expect(stack.cards).toHaveLength(4);
		});
	});

	describe("shuffle()", () => {
		it("Should shuffle a CardStack", () => {
			const shuffleSpy = jest.spyOn(utils, "shuffle");

			stack.shuffle();

			expect(stack.cards).toHaveLength(6);
			expect(stack.isShuffled).toBe(true);
			expect(shuffleSpy).toHaveBeenCalled();
		});
	});

	describe("add()", () => {
		it("Should add 2 cards to the top of a CardStack", () => {
			expect(stack.cards).toHaveLength(6);
			stack.add(["7", "8"]);
			expect(stack.cards).toHaveLength(8);
			expect(stack.cards[6]).toBe("7");
			expect(stack.cards[7]).toBe("8");
		});
	});

	describe("addBottom()", () => {
		it("Should add 2 cards to the bottom of a CardStack", () => {
			expect(stack.cards).toHaveLength(6);
			stack.addBottom(["7", "8"]);
			expect(stack.cards).toHaveLength(8);
			expect(stack.cards[0]).toBe("7");
			expect(stack.cards[1]).toBe("8");
		});
	});
});
