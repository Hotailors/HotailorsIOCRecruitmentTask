import {id, inject, injectable} from "inversify";
import { IFunctionService } from "./pokemonsServices/IFunctionService";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { ILogger } from "../../commonServices/iLogger";
import {IResponseInterface} from "../../commonServices/networkServices/INetworkClientInterface";

export interface IPokemonQueryInterface {
    id: string;
    type: string;
}

export interface IPokemonapiTypeInterface {
    type: {
        name: string;
    };
}

export interface IPokemonInterface {
    id: number;
    name: string;
    types: IPokemonapiTypeInterface[];
}

@injectable()
export abstract class FunctionService implements IFunctionService<any> {
    public url: string;
    public ids: number[];

    @inject(COMMON_TYPES.ILogger)
    protected readonly _logger: ILogger;

    abstract async processMessageAsync(query: IPokemonQueryInterface): Promise<any>

    public parseIds(idsList: string, separator?: string): void {
        this.ids = idsList.split(separator ?? ',').map((val: string) => Number(val));
    }

    abstract async fetchPokemons(): Promise<IPokemonInterface[]>
}
