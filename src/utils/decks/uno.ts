import { DeckParams } from "./deckParams";
import { DeckQuery } from "./deckQuery";

export const CARDS = [
	"RSkip",
	"RReverse",
	"R+2",
	"R0",
	"R1",
	"R2",
	"R3",
	"R4",
	"R5",
	"R6",
	"R7",
	"R8",
	"R9",
	"YSkip",
	"YReverse",
	"Y+2",
	"Y0",
	"Y1",
	"Y2",
	"Y3",
	"Y4",
	"Y5",
	"Y6",
	"Y7",
	"Y8",
	"Y9",
	"GSkip",
	"GReverse",
	"G+2",
	"G0",
	"G1",
	"G2",
	"G3",
	"G4",
	"G5",
	"G6",
	"G7",
	"G8",
	"G9",
	"BSkip",
	"BReverse",
	"B+2",
	"B0",
	"B1",
	"B2",
	"B3",
	"B4",
	"B5",
	"B6",
	"B7",
	"B8",
	"B9",
	"WWild",
	"W+4",
];

export default function (params: DeckQuery): DeckParams {
	const cards: string[] = [];

	for (let i = 0; i < params.deckCount; i++) cards.push.apply(cards, CARDS);

	return {
		type: "uno",
		count: params.deckCount,
		cards,
	};
}
