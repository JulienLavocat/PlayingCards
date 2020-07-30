import * as utils from '../utils';
import { Deck } from '../Deck';
import { generators } from '../utils/decks/index';

const deck = Deck.builder()
	.unshuffled()
	.custom(["TestCard1", "TestCard2"])
	.deckCount(2)
	//.standard32()
	.create();

deck.shuffle();

console.log(deck.cards);

//console.log(deck.draw(1));
console.log(deck.drawBottom(2))

console.log(deck.cards);