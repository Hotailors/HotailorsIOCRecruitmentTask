export interface IFunctionService<T> {
    url: string;
    ids: number[];
    processMessageAsync(message: T): Promise<any>;
}
