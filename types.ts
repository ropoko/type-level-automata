import { Tokenize } from "./helper";

export type Pronoum =
	"qual"
	| "quem"
	| "que"
	| "onde"
	| "voce"
	| "eu"
	| "tu"
	| "ele"
	| "ela"
	| "nos"
	| "eles"
	| "elas"
;

export type Article =
	"o"
	| "a"
	| "este"
	| "um"
	| "uma"
;

export type Noun =
	"mesa"
	| "lanche"
	| "preco"
	| "endereco"
;

// meaning based on verbs
export type Verb =
	"reservar"
	| "querer"
	| "ser" // -> (é) informação
	| "encontrar" // -> localização
	| "pedir" // -> pedido | desejo
	| "saber" // -> informação
;

export type Conjugation<V extends Verb> =
	V extends "reservar" ? "reservar" | "reservo" | "reservas" | "reserva" | "reservamos" | "reservam" :
	V extends "querer" ? "querer" | "quero" | "queres" | "quer" | "queremos" | "querem" :
	V extends "ser" ? "ser" | "sou" | "és" | "é" | "somos" | "são" :
	V extends "encontrar" ? "encontrar" | "encontro" | "encontras" | "encontra" | "encontramos" | "encontram" :
	V extends "pedir" ? "pedir" | "peço" | "pedes" | "pede" | "pedimos" | "pedem" :
	V extends "saber" ? "saber" | "sei" | "sabes" | "sabe" | "sabemos" | "sabem" :
	never
;

export type Name = `${Article} ${Noun}`;

// Solve the number of verbs in a sentence so typescript can infer the correct type
type FilterVerbs<Tokens extends Array<string>> = Tokens extends [infer First, ...infer Rest] ?
	(First extends Conjugation<Verb> ? [First, ...FilterVerbs<Rest extends Array<string> ? Rest : []>] : FilterVerbs<Rest extends Array<string> ? Rest : []>) : []
;

export type ResolveVerbalPredicate<S extends string> =
	FilterVerbs<Tokenize<S>>['length'] extends 1 ? Conjugation<Verb> : `${Conjugation<Verb>} ${Conjugation<Verb>}`
;

export type Frase<S extends string> =
	`${Name} ${ResolveVerbalPredicate<S>}`
	| `${ResolveVerbalPredicate<S>} ${Name}`
	| `${Pronoum} ${ResolveVerbalPredicate<S>}`
	| `${Pronoum} ${ResolveVerbalPredicate<S>} ${Name}`
	| `${Pronoum} ${ResolveVerbalPredicate<S>} ${Pronoum}`
;
