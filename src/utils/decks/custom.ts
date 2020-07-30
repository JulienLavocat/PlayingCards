import { DeckQuery } from './deckQuery';
import { DeckParams } from './deckParams';
import { CardsLibError } from '../../CardsLibError';

export default function(params: DeckQuery): DeckParams {
	const CARDS = params.cards;

	if(!CARDS)
		throw new CardsLibError("Property cards is required when creating a custom deck");

	const cards: string[] = [];
	for (let i = 0; i < params.deckCount; i++) cards.push.apply(cards, CARDS);

	return {
		type: "custom",
		count: params.deckCount,
		cards: cards,
		baseCards: CARDS
	};
};
