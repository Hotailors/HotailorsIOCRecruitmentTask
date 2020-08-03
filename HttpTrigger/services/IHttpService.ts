import { AxiosRequestConfig } from "axios";

export interface IHttpService {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
