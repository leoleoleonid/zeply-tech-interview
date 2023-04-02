import {Test} from "@nestjs/testing";
import {ConfigModule} from "@nestjs/config";
import {LoggerModule} from "../infrastructure/logger/logger.module";
import {
    ADDRESS_SEARCH_REPOSITORY_TOKEN,
    AddressSearchRepositoryInterface
} from "../domain/repositories/addressSearch.repository.interface";
import {AddressSearchUsecases} from "./addressSearch.usecases";
import {AddressSearch} from "../domain/model/addressSearch";

describe('AddressSearchUsecases', () => {
    let addressSearchUsecases: AddressSearchUsecases;
    let addressSearchRepository: AddressSearchRepositoryInterface;

    beforeEach(async () => {
        addressSearchRepository = {
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
                    provide: ADDRESS_SEARCH_REPOSITORY_TOKEN,
                    useValue: addressSearchRepository
                },
                AddressSearchUsecases,
            ],
        }).compile();

        addressSearchUsecases = moduleRef.get<AddressSearchUsecases>(AddressSearchUsecases);
    });

    describe('getTopAddressSearches', () => {
        it('should call findTop method of addressSearchRepository with the provided limit', async () => {
            const limit = 5;
            const expectedTopAddressSearches: AddressSearch[] = [
                { address: 'address1', score: 10 },
                { address: 'address2', score: 8 },
            ];
            (addressSearchRepository.findTop as jest.Mock).mockResolvedValue(expectedTopAddressSearches);

            const topAddressSearches = await addressSearchUsecases.getTopAddressSearches(limit);

            expect(topAddressSearches).toEqual(expectedTopAddressSearches);
            expect(addressSearchRepository.findTop).toHaveBeenCalledWith(limit);
        });
    });

    describe('newAddressSearch', () => {
        it('should call updateScore method of addressSearchRepository if address already exists', async () => {
            const address = 'existing-address';
            (addressSearchRepository.isAlreadyExist as jest.Mock).mockResolvedValue(true);

            await addressSearchUsecases.newAddressSearch(address);

            expect(addressSearchRepository.isAlreadyExist).toHaveBeenCalledWith(address);
            expect(addressSearchRepository.updateScore).toHaveBeenCalledWith(address);
        });

        it('should call insert method of addressSearchRepository if address does not exist', async () => {
            const address = 'new-address';
            (addressSearchRepository.isAlreadyExist as jest.Mock).mockResolvedValue(false);

            await addressSearchUsecases.newAddressSearch(address);

            expect(addressSearchRepository.isAlreadyExist).toHaveBeenCalledWith(address);
            expect(addressSearchRepository.insert).toHaveBeenCalledWith(address);
        });
    });
});
