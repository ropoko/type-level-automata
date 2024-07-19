import { Frase, ResolveVerbalPredicate } from "./types";

// verify if the sentence is grammatically correct
export type CheckGrammar<S extends string> = S extends Frase<ResolveVerbalPredicate<S>> ? true : false;

export type Tokenize<S extends string> = S extends `${infer T} ${infer Rest}` ? [T, ...Tokenize<Rest>] : [S];
