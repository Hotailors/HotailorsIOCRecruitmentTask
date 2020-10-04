import {IPokemonInterface} from "../FunctionService";

export const pokemonsDTO: (value: IPokemonInterface) => string = (pokemon) => pokemon.name;
