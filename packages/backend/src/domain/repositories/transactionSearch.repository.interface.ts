import {TransactionSearch} from "../model/transactionSearch";

export const TRANSACTION_SEARCH_REPOSITORY_TOKEN = 'TRANSACTION_SEARCH_REPOSITORY_TOKEN';

export interface TransactionSearchRepositoryInterface {
    insert(transaction: string): Promise<void>;
    findTop(limit): Promise<TransactionSearch[]>;
    isAlreadyExist(transaction: string): Promise<boolean>;
    findOne(transaction: string): Promise<TransactionSearch>;
    updateScore(transaction: string, newScore: number): Promise<void>;
}

