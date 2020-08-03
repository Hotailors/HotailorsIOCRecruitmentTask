import { inject, injectable } from "inversify";

import { HttpService } from "./HttpService";
import { IPokemonService } from "./IPokemonService";
import { IPokemon } from "../interfaces/IPokemon";
import { COMMON_TYPES } from "../../ioc/commonTypes";

@injectable()
export class PokemonService implements IPokemonService {

    @inject(COMMON_TYPES.IHttpService)
    private readonly _httpService: HttpService;

    public async getByIdsAndType(ids: string[], type: string): Promise<string[]> {
        const allPokemons: IPokemon[] = await this.getByIds(ids);
        const filteredByType: IPokemon[] = this.filterByType(allPokemons, type);
        const pokemonNames: string[] = this.getPokemonNames(filteredByType);
        return pokemonNames;
    }

    public getByIds(ids: string[]): Promise<any> {
        const promises: Array<Promise<IPokemon>> = ids.map((id) => this.getById(id));
        return Promise.all(promises);
    }

    public getById(id: string): Promise<IPokemon> {
        return this._httpService.get<IPokemon>(`pokemon/${id}`);
    }

    private filterByType(pokemons: IPokemon[], type: string): IPokemon[] {
        return pokemons.filter((pokemon) => pokemon.types.some(({ type: { name } }) => name === type));
    }

    private getPokemonNames(pokemons: IPokemon[]): string[] {
        return pokemons.map((pokemon) => pokemon.name);
    }
}
