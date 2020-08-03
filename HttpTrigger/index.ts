import { Container } from "inversify";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {
    const container: Container = getContainer();
    
    const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
    logger.init(ctx, "1");

    ctx.res = {
        body: "ok",
        status: 200,
        headers: { "Content-Type": "application/json" },
    };
    return ctx.res;
};

export default httpTrigger;
