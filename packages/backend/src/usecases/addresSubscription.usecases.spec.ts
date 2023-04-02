import {Test} from "@nestjs/testing";
import {ConfigModule} from "@nestjs/config";
import {LoggerModule} from "../infrastructure/logger/logger.module";
import {
    ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN,
    AddressSubscriptionRepositoryInterface
} from "../domain/repositories/addresSubscription.repository.interface";
import {AddressSubscriptionUsecases} from "./addresSubscription.usecases";

describe('AddressSubscriptionUsecases', () => {
    let addressSubscriptionUsecases: AddressSubscriptionUsecases;
    let addressSubscriptionRepository: AddressSubscriptionRepositoryInterface;

    beforeEach(async () => {
        addressSubscriptionRepository = {
            findByUserId: jest.fn(),
            add: jest.fn(),
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
                    provide: ADDRESS_SUBSCRIPTION_REPOSITORY_TOKEN,
                    useValue: addressSubscriptionRepository
                },
                AddressSubscriptionUsecases,
            ],
        }).compile();

        addressSubscriptionUsecases = moduleRef.get<AddressSubscriptionUsecases>(AddressSubscriptionUsecases);
    });

    describe('getSubscribedAddresses', () => {
        it('should return an array of subscribed addresses', async () => {
            const userId = 1;
            const addresses = ['address1', 'address2'];
            jest.spyOn(addressSubscriptionUsecases, 'getSubscribedAddresses').mockResolvedValue(addresses);

            const result = await addressSubscriptionUsecases.getSubscribedAddresses(userId);

            expect(result).toEqual(addresses);
            expect(addressSubscriptionUsecases.getSubscribedAddresses).toHaveBeenCalledWith(userId);
        });
    });

    // describe('addAddress', () => {
    //     it('should add a new address for the user', async () => {
    //         const userId = 1;
    //         const address = 'address1';
    //         jest.spyOn(addressSubscriptionRepository, 'getSubscribedAddresses').mockResolvedValue(addresses);

    //         await addressSubscriptionUsecases.addAddress(userId, address);

    //         expect(addressSubscriptionUsecases.addAddress).toHaveBeenCalledWith(userId, address);
    //     });
    // });
});
