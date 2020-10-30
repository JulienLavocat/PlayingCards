import { DeckQuery } from "./deckQuery";
import { DeckParams } from "./deckParams";
export const CARDS = [
	"AS",
	"7S",
	"8S",
	"9S",
	"0S",
	"JS",
	"QS",
	"KS",
	"AD",
	"7D",
	"8D",
	"9D",
	"0D",
	"JD",
	"QD",
	"KD",
	"AC",
	"7C",
	"8C",
	"9C",
	"0C",
	"JC",
	"QC",
	"KC",
	"AH",
	"7H",
	"8H",
	"9H",
	"0H",
	"JH",
	"QH",
	"KH",
	"J",
	"J",
];

export default function (params: DeckQuery): DeckParams {
	const cards: string[] = [];

	for (let i = 0; i < params.deckCount; i++) cards.push.apply(cards, CARDS);

	return {
		type: "standard32Jokers",
		count: params.deckCount,
		cards: cards,
	};
}
