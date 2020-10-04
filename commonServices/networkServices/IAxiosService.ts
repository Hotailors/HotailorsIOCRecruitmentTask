import {inject, injectable} from "inversify";
import {INetworkClientInterface, IResponseInterface} from "./INetworkClientInterface";
import axios from "axios";
import {COMMON_TYPES} from "../../ioc/commonTypes";
import {ILogger} from "../iLogger";

@injectable()
export class IAxiosService implements INetworkClientInterface {
    @inject(COMMON_TYPES.ILogger)
    public readonly _logger: ILogger;

    public async fetch(url: string): Promise<IResponseInterface | void> {
        return axios.get(url)
            .then((res) => res.data)
            .catch((e) => {
                this._logger.error(e);
                throw e;
            });
    }
}
