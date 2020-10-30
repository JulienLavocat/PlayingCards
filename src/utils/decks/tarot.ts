import { DeckQuery } from "./deckQuery";
import { DeckParams } from "./deckParams";
export const CARDS = [
	"AS",
	"2S",
	"3S",
	"4S",
	"5S",
	"6S",
	"7S",
	"8S",
	"9S",
	"0S",
	"JS",
	"CS",
	"QS",
	"KS",
	"AD",
	"2D",
	"3D",
	"4D",
	"5D",
	"6D",
	"7D",
	"8D",
	"9D",
	"0D",
	"JD",
	"CD",
	"QD",
	"KD",
	"AC",
	"2C",
	"3C",
	"4C",
	"5C",
	"6C",
	"7C",
	"8C",
	"9C",
	"0C",
	"JC",
	"CC",
	"QC",
	"KC",
	"AH",
	"2H",
	"3H",
	"4H",
	"5H",
	"6H",
	"7H",
	"8H",
	"9H",
	"0H",
	"JH",
	"CH",
	"QH",
	"KH",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"Excuse",
];

export default function (params: DeckQuery): DeckParams {
	const cards: string[] = [];

	for (let i = 0; i < params.deckCount; i++) cards.push.apply(cards, CARDS);

	return {
		type: "tarot",
		count: params.deckCount,
		cards: cards,
	};
}
