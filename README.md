# @piigo/playingcards

> Playing Cards package with support for most commons deck types and piles.

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i @piigo/playingcards
```

```bash
yarn add @piigo/playingcards
```

## Supported Deck Types

Currently, the lib only supports the following deck types :

 - standard (52 cards, without jokers)
 - standardWithJokers (standard deck with 2 jokers)
 - standard32 (32 cards deck without jokers)
 - standard32WithJokers (34 cards deck with jokers)
 - blackjack
 - tarot
 - rummy
 - uno
 - empty (no cards in deck)
 - custom with this you can pass an array of strings representing the cards you want to use.

## Usage

### Creating a deck

```js

const deck = Deck.builder()	// Get a new instance of DeckBuilder
	.unshuffled()		// By default the deck is created and shuffled, this tells the deck builder to not shuffle the deck
	.standardWithJokers()	// The type of deck you want to play with, defaults to a standard deck if not supplied, see supported deck types
	.create();

```

### Using a deck

```js

const deck = Deck.builder().create();

// Draw a card
deck.draw();

// Draw multiple cards
deck.draw(4);

// Draw n cards from the bottom of the deck
deck.drawBottom(n);

// Add cards to the top of the deck
deck.add(["Cards array to add"]);

// Add cards to the bottom of the deck
deck.addBottom(["Cards array to add"]);

// Shuffle the deck
deck.shuffle();

// Reset the deck
deck.reset(shouldTheDeckBeShuffled)

// See if the deck is shuffled or not
deck.isShuffled();

// Get how many cards remains in the deck
deck.remaining();

// Get or create a new pile of cards in the deck (can represent a hand, discard pile, etc...)
deck.getPile("pileName");

// Get the cards array used by the deck, you should normally not have to use this except for logging purposes
deck.getCards();

```

### Using a Pile

```js

const pile = Deck.builder().create().getPile("discard");

// Draw a card
pile.draw();

// Draw multiple cards
pile.draw(4);

// Draw n cards from the bottom of the pile
pile.drawBottom(n);

// Add cards to the top of the pile
pile.add(["Cards array to add"]);

// Add cards to the bottom of the pile
pile.addBottom(["Cards array to add"]);

// Shuffle the pile
pile.shuffle();

// See if the pile is shuffled or not
pile.isShuffled();

// Get how many cards remains in the pile
pile.remaining();

// Get the cards array used by the pile, you should normally not have to use this except for logging purposes
pile.getCards();

```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/@piigo/playingcards
[npm-url]: https://www.npmjs.com/package/@piigo/playingcards
