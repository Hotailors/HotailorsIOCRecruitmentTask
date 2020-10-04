import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { IFunctionService } from "./services/pokemonsServices/IFunctionService";
import { Container } from "inversify";
import {reqSchema} from "./reqSchema";
import {ValidationError} from "joi";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {
    ctx.res = {
        headers: { "Content-Type": "application/json" },
    };

    const validationError: ValidationError = reqSchema.validate(req.query).error;

    if (validationError && validationError.message) {
        ctx.res.body = {msg: validationError.message};
        ctx.res.status = 422;

        return ctx.res;
    }

    const container: Container = getContainer();
    const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
    logger.init(ctx, "1");

    const functionService: IFunctionService<any> =
        container.get<IFunctionService<any>>(COMMON_TYPES.IPokeapiService);

    ctx.res.body = await functionService.processMessageAsync(req.query);
    ctx.res.status = 200;

    return ctx.res;
};

export default httpTrigger;
