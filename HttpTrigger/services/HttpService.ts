import { inject, injectable } from "inversify";
import { AxiosInstance, AxiosRequestConfig } from "axios";

import { IHttpService } from "./IHttpService";
import { POKE_API_URL } from "../constants";
import { IAxios } from "../interfaces/IAxios";
import { COMMON_TYPES } from "../../ioc/commonTypes";

@injectable()
export class HttpService implements IHttpService {
    private readonly _axios: AxiosInstance;

    constructor(@inject(COMMON_TYPES.IAxios) axios: IAxios) {
        this._axios = axios.create({
            baseURL: POKE_API_URL,
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this._axios.get<T>(url, config);
        return data;
    }
}
