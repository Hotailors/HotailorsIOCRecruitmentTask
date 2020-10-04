import "reflect-metadata";
import {Container} from "inversify";
import {COMMON_TYPES} from "./commonTypes";

import {Logger} from "../commonServices/logger";
import {ILogger} from "../commonServices/iLogger";
import { IFunctionService } from "../HttpTrigger/services/pokemonsServices/IFunctionService";
import { PokeapiService } from "../HttpTrigger/services/pokemonsServices/PokeapiService";
import { IAxiosService } from "../commonServices/networkServices/IAxiosService";
import {INetworkClientInterface} from "../commonServices/networkServices/INetworkClientInterface";

const getContainer: (() => Container) = (): Container => {
    const container: Container = new Container();

    container
        .bind<ILogger>(COMMON_TYPES.ILogger)
        .to(Logger)
        .inSingletonScope();

    container
        .bind<IFunctionService<any>>(COMMON_TYPES.IPokeapiService)
        .to(PokeapiService);

    container
        .bind<INetworkClientInterface>(COMMON_TYPES.IAxiosService)
        .to(IAxiosService)
        .inSingletonScope();

    return container;
};

export default getContainer;
