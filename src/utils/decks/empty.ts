import { DeckQuery } from './deckQuery';
import { DeckParams } from './deckParams';

export const CARDS: string[] = [];

export default function(params: DeckQuery): DeckParams {
	return {
		type: "empty",
		count: params.deckCount,
		cards: []
	};
};
