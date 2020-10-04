import {FunctionService, IPokemonapiTypeInterface, IPokemonInterface, IPokemonQueryInterface} from "../FunctionService";
import {COMMON_TYPES} from "../../../ioc/commonTypes";
import {inject} from "inversify";
import {INetworkClientInterface, IResponseInterface } from "../../../commonServices/networkServices/INetworkClientInterface";
import {pokemonsDTO} from "../dtos/pokemonsDTO";

export class PokeapiService extends FunctionService {
    public url: string = "https://pokeapi.co/api/v2/";

    @inject(COMMON_TYPES.IAxiosService)
    protected readonly _networkClient: INetworkClientInterface;

    public async processMessageAsync(query: IPokemonQueryInterface): Promise<any> {
        this.parseIds(query.id);

        const fetchedPokemons: IPokemonInterface[] = await this.fetchPokemons();

        const filteredPokemons: IPokemonInterface[] = fetchedPokemons.filter((res: any) => {
            const types: string = res.types.map((val: IPokemonapiTypeInterface) => val.type.name);
            return types.includes(query.type);
        });

        return {
            pokemons: filteredPokemons.map((pokemon: any) => pokemonsDTO(pokemon)),
        };
    }

    async fetchPokemons(): Promise<IPokemonInterface[]> {
        const promises: any[] = [];

        this.ids.map((val: number) => {
            const tmp: Promise<IResponseInterface | void> = this._networkClient.fetch(`${this.url}/pokemon/${val}`);
            promises.push(tmp);
        });

        return Promise.all(promises);
    }

}
