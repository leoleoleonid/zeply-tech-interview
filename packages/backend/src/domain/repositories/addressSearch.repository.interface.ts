import {AddressSearch} from "../model/addressSearch";

export const ADDRESS_SEARCH_REPOSITORY_TOKEN = 'ADDRESS_SEARCH_REPOSITORY_TOKEN';

export interface AddressSearchRepositoryInterface {
    insert(address: string): Promise<void>;
    isAlreadyExist(address: string): Promise<boolean>;
    findTop(limit): Promise<AddressSearch[]>;
    updateScore(address: string): Promise<void>;
}
