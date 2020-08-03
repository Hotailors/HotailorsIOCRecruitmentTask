import "reflect-metadata";
import axios from "axios";
import { Container } from "inversify";

import { COMMON_TYPES } from "./commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { IAxios } from "../HttpTrigger/interfaces/IAxios";
import { IHttpService } from "../HttpTrigger/services/IHttpService";
import { HttpService } from "../HttpTrigger/services/HttpService";
import { IPokemonService } from "../HttpTrigger/services/IPokemonService";
import { PokemonService } from "../HttpTrigger/services/PokemonService";

const getContainer: (() => Container) = (): Container => {
    const container: Container = new Container();
    
    container
        .bind<ILogger>(COMMON_TYPES.ILogger)
        .to(Logger)
        .inSingletonScope();
    
    container
        .bind<IAxios>(COMMON_TYPES.IAxios)
        .toConstantValue(axios);

    container
        .bind<IHttpService>(COMMON_TYPES.IHttpService)
        .to(HttpService);

    container
        .bind<IPokemonService>(COMMON_TYPES.IPokemonService)
        .to(PokemonService);

    return container;
};

export default getContainer;
