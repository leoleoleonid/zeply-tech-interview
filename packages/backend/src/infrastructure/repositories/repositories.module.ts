import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {TransactionSearchEntity} from "../entities/transactionSearch.entity";
import {UserEntity} from "../entities/user.entity";
import {AddressSubscriptionEntity} from "../entities/addressSubscription.entity";
import {AddressSearchEntity} from "../entities/addressSearch.entity";
import {ADDRESS_SEARCH_REPOSITORY_TOKEN} from "../../domain/repositories/addressSearch.repository.interface";
import {AddressSearchRepository} from "./addressSearch.repository";
import {AddressSubscriptionRepository} from "./addressSubscription.repository";
import {ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN} from "../../domain/repositories/addresSubscription.repository.interface";
import {TransactionSearchRepository} from "./transactionSearch.repository";
import {TRANSACTION_SEARCH_REPOSITORY_TOKEN} from "../../domain/repositories/transactionSearch.repository.interface";
import {UserRepository} from "./user.repository";
import {USER_REPOSITORY_TOKEN} from "../../domain/repositories/user.repository.interface";

@Module({
    imports: [TypeOrmModule.forFeature([
        TransactionSearchEntity, UserEntity, AddressSubscriptionEntity, AddressSearchEntity
    ])],
    providers: [
        {provide: ADDRESS_SEARCH_REPOSITORY_TOKEN, useClass: AddressSearchRepository},
        {provide: ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN, useClass: AddressSubscriptionRepository},
        {provide: TRANSACTION_SEARCH_REPOSITORY_TOKEN, useClass: TransactionSearchRepository},
        {provide: USER_REPOSITORY_TOKEN, useClass: UserRepository},
    ],
    exports: [
        ADDRESS_SEARCH_REPOSITORY_TOKEN,
        ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN,
        TRANSACTION_SEARCH_REPOSITORY_TOKEN,
        USER_REPOSITORY_TOKEN,
        TypeOrmModule
    ]
})
export class RepositoriesModule {
}
