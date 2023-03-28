import {ILogger, ILOGGER_TOCKEN} from '../domain/logger/logger.interface';
import {Inject, Injectable} from "@nestjs/common";
import {
    ADDRESS_SEARCH_REPOSITORY_TOKEN,
    AddressSearchRepositoryInterface
} from "../domain/repositories/addressSearch.repository.interface";
import {AddressSearch} from "../domain/model/addressSearch";

@Injectable()
export class AddressSearchUsecases {
    constructor(
        @Inject(ILOGGER_TOCKEN)
        private readonly logger: ILogger,
        @Inject(ADDRESS_SEARCH_REPOSITORY_TOKEN)
        private readonly addressSearchRepository: AddressSearchRepositoryInterface,
    ) {}

    async getTopAddressSearches(limit: number = 5): Promise<AddressSearch[]> {
        this.logger.log('Execute getTopTransactionSearches', `limit: ${limit}`);
        return await this.addressSearchRepository.findTop(limit);
    }

    async newAddressSearch(address: string): Promise<void> {
        this.logger.log('Execute newAddressSearch', `address: ${address}`);
        if (await this.addressSearchRepository.isAlreadyExist(address)) {
            await this.addressSearchRepository.updateScore(address);
            this.logger.log('Score updated', `address: ${address}`);
        } else {
            await this.addressSearchRepository.insert(address);
            this.logger.log('address Search inserted', `address: ${address}`);
        }
    }
}
