import { DeckTypes } from ".";

export interface DeckParams {
	type: DeckTypes;
	count: number;
	cards: string[];
	baseCards?: string[];
}
