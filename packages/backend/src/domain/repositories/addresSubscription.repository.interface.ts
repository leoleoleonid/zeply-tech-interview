import {AddressSubscription} from "../model/addressSubscription";

export const ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN = 'ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN';

export interface AddressSubscriptionRepositoryInterface {
    add(address: string, userId: number): Promise<void>;
    findByUserId(userId: number): Promise<string[]>;
}
