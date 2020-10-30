import { Deck } from "../Deck";

const deck = Deck.builder()
	.unshuffled()
	//.custom(["TestCard1", "TestCard2"])
	//.deckCount(2)
	//.standard32()
	.create();

//deck.shuffle();

console.log(deck.remaining());

deck.reset(true);
console.log(deck.getCards());

console.log(deck.remaining());
