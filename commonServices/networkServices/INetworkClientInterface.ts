import {ILogger} from "../iLogger";

export interface IResponseInterface {
    data: any;
}

export interface INetworkClientInterface {
    _logger: ILogger;

    fetch(url: string): Promise<IResponseInterface | void>;
}
