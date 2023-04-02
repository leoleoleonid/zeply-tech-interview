import {ConfigModule} from "@nestjs/config";
import {LoggerModule} from "../infrastructure/logger/logger.module";
import {Test} from "@nestjs/testing";
import {
    TRANSACTION_SEARCH_REPOSITORY_TOKEN,
    TransactionSearchRepositoryInterface
} from "../domain/repositories/transactionSearch.repository.interface";
import {TransactionSearchUsecases} from "./transactionSearch.usecases";
import {TransactionSearch} from "../domain/model/transactionSearch";

describe('TransactionSearchUsecases', () => {
    let transactionSearchUsecases: TransactionSearchUsecases;
    let transactionSearchRepository: TransactionSearchRepositoryInterface;

    beforeEach(async () => {
        transactionSearchRepository = {
            findTop: jest.fn(),
            isAlreadyExist: jest.fn(),
            findOne: jest.fn(),
            insert: jest.fn(),
            updateScore: jest.fn(),
        };

        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env.test'
                }),
                LoggerModule,
            ],
            providers: [
                {
                    provide: TRANSACTION_SEARCH_REPOSITORY_TOKEN,
                    useValue: transactionSearchRepository
                },
                TransactionSearchUsecases,
            ],
        }).compile();

        transactionSearchUsecases = moduleRef.get<TransactionSearchUsecases>(TransactionSearchUsecases);

    });

    describe('getTopTransactionSearches', () => {
        it('should call findTop method of transactionSearchRepository with the provided limit', async () => {
            const limit = 5;
            const expectedTopTransactionSearches: TransactionSearch[] = [
                // (new TransactionSearch('transaction1', 10)),
                // (new TransactionSearch('transaction2', 8)),
                { transaction: 'transaction1', score: 10 },
                { transaction: 'transaction2', score: 8 },
            ] as TransactionSearch[];
            (transactionSearchRepository.findTop as jest.Mock).mockResolvedValue(expectedTopTransactionSearches);

            const topTransactionSearches = await transactionSearchUsecases.getTopTransactionSearches(limit);

            expect(topTransactionSearches).toEqual(expectedTopTransactionSearches);
            expect(transactionSearchRepository.findTop).toHaveBeenCalledWith(limit);
        });
    });

    describe('newTransactionSearch', () => {
        it('should call updateScore method of transactionSearchRepository if transaction already exists', async () => {
            const transaction = 'existing-transaction';
            const initialScore = 1;
            const transactionSearch = new TransactionSearch();
            transactionSearch.transaction = transaction;
            transactionSearch.score = initialScore;
            (transactionSearchRepository.findOne as jest.Mock).mockResolvedValue(transactionSearch);

            await transactionSearchUsecases.newTransactionSearch(transaction);

            expect(transactionSearchRepository.findOne).toHaveBeenCalledWith(transaction);
            expect(transactionSearchRepository.updateScore).toHaveBeenCalledWith(transaction, initialScore + 1);
        });

        it('should call insert method of transactionSearchRepository if transaction does not exist', async () => {
            const transaction = 'new-transaction';
            const transactionSearch = new TransactionSearch();
            transactionSearch.transaction = transaction;
            transactionSearch.score = 1;
            (transactionSearchRepository.findOne as jest.Mock).mockResolvedValue(false);

            await transactionSearchUsecases.newTransactionSearch(transaction);

            expect(transactionSearchRepository.findOne).toHaveBeenCalledWith(transaction);
            expect(transactionSearchRepository.insert).toHaveBeenCalledWith(transaction);
        });
    });
});
