import { Deck } from "../src/Deck";
import { expect } from "chai";
import "mocha";
import { CardStack } from '../src/CardStack';

describe("CardStack", () => {

	const cards = ["1", "2", "3", "4", "5", "6"];

	it("Should create a valid CardStack", () => {
		const stack = new CardStack([...cards], false);
		expect(stack).to.be.an.instanceOf(CardStack);
		expect(stack.cards.length).to.equals(6);
	});

	it("Should draw 2 cards from the top of a CardStack", () => {
		const stack = new CardStack([...cards], false);

		expect(stack).to.be.an.instanceOf(CardStack);
		expect(stack.cards.length).to.equals(6);
		expect(stack.draw(2)).to.eql(["1", "2"]);
	});

	it("Should draw 2 cards from the bottom of a CardStack", () => {
		const stack = new CardStack([...cards], false);

		expect(stack).to.be.an.instanceOf(CardStack);
		expect(stack.cards.length).to.equals(6);
		expect(stack.drawBottom(2)).to.eql(["5", "6"]);
	});

	it("Should shuffle a CardStack", () => {
		const stack = new CardStack([...cards], false);
		stack.shuffle();

		expect(stack).to.be.an.instanceOf(CardStack);
		expect(stack.cards.length).to.equals(6);
		expect(stack.isShuffled).to.equals(true);
	});
});