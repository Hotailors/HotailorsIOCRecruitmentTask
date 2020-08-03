import { Container } from "inversify";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import getContainer from "../ioc/inversify.config";
import { QUERY_PARAMS } from "./constants/queryParams";
import { IPokemonService } from "./services/IPokemonService";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {
    const container: Container = getContainer();
    
    const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
    logger.init(ctx, "1");

    const url: URL = new URL(req.url);
    const pokemonIds: string[] = [...new Set(url.searchParams.getAll(QUERY_PARAMS.ID))];
    const pokemonType: string = url.searchParams.get(QUERY_PARAMS.TYPE)?.trim() ?? "";

    if (!pokemonType) {
        const error: string = "The type argument was not provided.";
        logger.error(error);
        ctx.res = {
            body: { error },
            status: 400,
        };
        return ctx.res;
    }

    if (!pokemonIds.length) {
        const error: string = "The ids arguments was not provided.";
        logger.error(error);
        ctx.res = {
            body: { error },
            status: 400,
            headers: { "Content-Type": "application/json" },
        };
        return ctx.res;
    }

    const invalidIds: string[] = pokemonIds.filter((id) => id !== String(Number(id)));
    if (invalidIds.length) {
        const error: string = `Invalid ids: ${JSON.stringify(invalidIds)}`;
        logger.error(error);
        ctx.res = {
            body: { error },
            status: 400,
            headers: { "Content-Type": "application/json" },
        };
        return ctx.res;
    }

    try {
        const pokemonService: IPokemonService = container.get<IPokemonService>(COMMON_TYPES.IPokemonService);
        const response: string[] = await pokemonService.getByIdsAndType(pokemonIds, pokemonType);

        logger.info(`Recived data of ${response.length} pokemons.`);

        ctx.res = {
            body: response,
            status: 200,
            headers: { "Content-Type": "application/json" },
        };
        return ctx.res;
    } catch (err) {
        const error: string = `Error while getting pokemons: ${err.toString()}`;
        logger.error(error);
        ctx.res = {
            body: { error },
            status: 502,
            headers: { "Content-Type": "application/json" },
        };
        return ctx.res;
    }
    
};

export default httpTrigger;
