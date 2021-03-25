import {Deck, Pile} from "../index";
import { CardStack } from '../CardStack';

const deck = Deck.builder()
	//.unshuffled()
	//.custom(["TestCard1", "TestCard2"])
	//.deckCount(2)
	//.standard32()
	.uno()
	.create();

const pile = deck.getPile("test");

console.log(deck.getCards());

const stack2 = new CardStack(deck.draw(2), false);
console.log(stack2.draw(1));

const stack = new CardStack(deck.drawBottom(2), false);
console.log(stack.draw(1));

console.log(deck.drawBottom(2));

pile.add(deck.draw(3));
console.log(pile.getCards());
pile.addBottom(deck.draw(1));
console.log(pile.getCards());
console.log(pile.draw());
