import { CheckGrammar } from "./helper";

type A = CheckGrammar<"qual é a mesa">; // true
// -> informação (é)

type B = CheckGrammar<"eu quero reservar">; // true
// -> pedido (quero)

type C = CheckGrammar<"eu quero reservar uma mesa">; // true
// -> pedido (quero)

type D = CheckGrammar<"quero pedir um lanche"> // true
// -> pedido (quero)

type E = CheckGrammar<"eu reservo">; // true
//

type F = CheckGrammar<"x reserva">; // false
// -> não faz parte da gramática

type G = CheckGrammar<"quem é voce">; // true
// -> informação (é)
