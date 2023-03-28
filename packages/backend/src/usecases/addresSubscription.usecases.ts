import {ILogger, ILOGGER_TOCKEN} from '../domain/logger/logger.interface';
import {Inject, Injectable} from "@nestjs/common";
import {
    ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN,
    AddressSubscriptionRepositoryInterface
} from "../domain/repositories/addresSubscription.repository.interface";

@Injectable()
export class AddressSubscriptionUsecases {
    constructor(
        @Inject(ILOGGER_TOCKEN)
        private readonly logger: ILogger,
        @Inject(ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN)
        private readonly addressSubscriptionRepository: AddressSubscriptionRepositoryInterface,
    ) {}

        async getSubscribedAddresses(userId: number):Promise<string[]> {
            this.logger.log('Execute getSubscribedAddresses', `userId: ${userId}`);
            return await this.addressSubscriptionRepository.findByUserId(userId);
        }

        async addAddress(userId, address): Promise<void> {
            this.logger.log('Execute addAddress', `userId: ${userId}; address: ${address}`);
            await this.addressSubscriptionRepository.add(address, userId);
        }
}
