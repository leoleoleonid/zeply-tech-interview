import {ILogger, ILOGGER_TOCKEN} from '../domain/logger/logger.interface';
import {Inject, Injectable} from "@nestjs/common";
import {
    TRANSACTION_SEARCH_REPOSITORY_TOKEN,
    TransactionSearchRepositoryInterface
} from "../domain/repositories/transactionSearch.repository.interface";
import {TransactionSearch} from "../domain/model/transactionSearch";

@Injectable()
export class TransactionSearchUsecases {
    constructor(
        @Inject(ILOGGER_TOCKEN)
        private readonly logger: ILogger,
        @Inject(TRANSACTION_SEARCH_REPOSITORY_TOKEN)
        private readonly transactionSearchRepository: TransactionSearchRepositoryInterface,
    ) {}

    async getTopTransactionSearches(limit: number = 5): Promise<TransactionSearch[]> {
        this.logger.log('Execute getTopTransactionSearches', `limit: ${limit}`);
        return await this.transactionSearchRepository.findTop(limit);
    }

    async newTransactionSearch(transaction: string): Promise<void> {
        this.logger.log('Execute newTransactionSearch', `transaction: ${transaction}`);
        const transactionSearch: TransactionSearch = await this.transactionSearchRepository.findOne(transaction);
        if (transactionSearch) {
            transactionSearch.increaseScore();
            await this.transactionSearchRepository.updateScore(transactionSearch.transaction, transactionSearch.score);
            this.logger.log('Score updated', `transaction: ${transaction}`);
        } else {
            await this.transactionSearchRepository.insert(transaction);
            this.logger.log('transaction Search inserted', `transaction: ${transaction}`);
        }
    }
}
