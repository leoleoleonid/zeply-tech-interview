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
    let loggerMock;

    beforeEach(async () => {
        loggerMock  = {
            log: jest.fn(),
        };
        transactionSearchRepository = {
            findTop: jest.fn(),
            isAlreadyExist: jest.fn(),
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
                { transaction: 'transaction1', score: 10 },
                { transaction: 'transaction2', score: 8 },
            ];
            (transactionSearchRepository.findTop as jest.Mock).mockResolvedValue(expectedTopTransactionSearches);

            const topTransactionSearches = await transactionSearchUsecases.getTopTransactionSearches(limit);

            expect(topTransactionSearches).toEqual(expectedTopTransactionSearches);
            expect(transactionSearchRepository.findTop).toHaveBeenCalledWith(limit);
        });
    });

    describe('newTransactionSearch', () => {
        it('should call updateScore method of transactionSearchRepository if transaction already exists', async () => {
            const transaction = 'existing-transaction';
            (transactionSearchRepository.isAlreadyExist as jest.Mock).mockResolvedValue(true);

            await transactionSearchUsecases.newTransactionSearch(transaction);

            expect(transactionSearchRepository.isAlreadyExist).toHaveBeenCalledWith(transaction);
            expect(transactionSearchRepository.updateScore).toHaveBeenCalledWith(transaction);
        });

        it('should call insert method of transactionSearchRepository if transaction does not exist', async () => {
            const transaction = 'new-transaction';
            (transactionSearchRepository.isAlreadyExist as jest.Mock).mockResolvedValue(false);

            await transactionSearchUsecases.newTransactionSearch(transaction);

            expect(transactionSearchRepository.isAlreadyExist).toHaveBeenCalledWith(transaction);
            expect(transactionSearchRepository.insert).toHaveBeenCalledWith(transaction);
        });
    });
});
