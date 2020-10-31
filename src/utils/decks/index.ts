import standard, { CARDS as STANDARD_CARDS } from "./standard";
import standardJokers, {
	CARDS as STANDARD_JOKERS_CARDS,
} from "./standardJokers";
import blackjack, { CARDS as BLACKJACK_CARDS } from "./blackjack";
import tarot, { CARDS as TAROT_CARDS } from "./tarot";
import rummy, { CARDS as RUMMY_CARDS } from "./rummy";
import standard32, { CARDS as STANDARD32_CARDS } from "./standard32";
import standard32Jokers, {
	CARDS as STANDARD32_JOKERS_CARDS,
} from "./standard32Jokers";
import empty, { CARDS as EMPTY_CARDS } from "./empty";
import custom from "./custom";
import { DeckQuery } from "./deckQuery";
import { DeckParams } from "./deckParams";

export const generators: {
	[key: string]: (params: DeckQuery) => DeckParams;
} = {
	standard: standard,
	standardJokers: standardJokers,
	blackjack: blackjack,
	tarot: tarot,
	rummy: rummy,
	standard32: standard32,
	standard32Jokers: standard32Jokers,
	empty: empty,
	custom: custom,
};

export const cards = {
	standard: STANDARD_CARDS,
	standardJokers: STANDARD_JOKERS_CARDS,
	blackjack: BLACKJACK_CARDS,
	tarot: TAROT_CARDS,
	rummy: RUMMY_CARDS,
	standard32: STANDARD32_CARDS,
	standard32Jokers: STANDARD32_JOKERS_CARDS,
	empty: EMPTY_CARDS,
};

export type DeckTypes = "standard" | "standardJokers" | "blackjack" | "tarot" | "rummy" | "standard32" | "standard32Jokers" | "empty" | "custom";
