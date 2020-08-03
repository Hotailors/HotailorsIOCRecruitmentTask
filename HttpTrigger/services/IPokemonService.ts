export interface IPokemonService {
    getByIdsAndType(ids: string[], type: string): Promise<any>;
}
