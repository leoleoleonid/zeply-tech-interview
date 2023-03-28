import { Module } from '@nestjs/common';
import {RepositoriesModule} from "../repositories/repositories.module";
import {LoggerModule} from "../logger/logger.module";
import {ExceptionsModule} from "../exceptions/exceptions.module";
import {AddressSearchUsecases} from "../../usecases/addressSearch.usecases";
import {AddressSubscriptionUsecases} from "../../usecases/addresSubscription.usecases";
import {AuthUsecases} from "../../usecases/auth.usecases";
import {TransactionSearchUsecases} from "../../usecases/transactionSearch.usecases";
import {AuthController} from "./auth/auth.controller";
import {TransactionSearchController} from "./transactionSearch/transactionSearch.controller";
import {AddressSearchController} from "./addressSearch/addressSearch.controller";
import {AddressSubscriptionController} from "./addresSubscription/addressSubscription.controller";

@Module({
  imports: [ LoggerModule, ExceptionsModule, RepositoriesModule],
  controllers: [AuthController, TransactionSearchController, AddressSearchController, AddressSubscriptionController],
  providers: [AddressSearchUsecases, AddressSubscriptionUsecases, AuthUsecases, TransactionSearchUsecases]
})
export class ControllersModule {}
