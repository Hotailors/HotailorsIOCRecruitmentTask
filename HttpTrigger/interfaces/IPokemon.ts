export interface IPokemonType {
    slot: number;
    type: {
        name: string;
    };
}

export interface IPokemon {
    id: number;
    name: string;
    types: IPokemonType[];
}
