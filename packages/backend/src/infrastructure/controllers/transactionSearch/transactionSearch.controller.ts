import {Controller, Get, Param, Patch, Query, UseGuards} from '@nestjs/common';
import {LimitDto} from "./dtos/limit.query-param.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {TransactionSearchPresenter} from "./presenters/transactionSearch.presentor";
import {TransactionSearchUsecases} from "../../../usecases/transactionSearch.usecases";
import {TransactionSearch} from "../../../domain/model/transactionSearch";
import {AuthGuard} from "../../common/guards/AuthGuard";

const TRANSACTION_SEARCH_SCORE_UPDATED = 'The transaction score has been successfully updated.';

@Controller('transaction-search')
@UseGuards(AuthGuard)
export class TransactionSearchController {

  constructor(private readonly transactionSearchUsecases: TransactionSearchUsecases) {}

  @Get('/top')
  @ApiOkResponse({type: TransactionSearchPresenter, isArray: true})
  async getTopTransactionSearches(@Query() queryString: LimitDto): Promise<TransactionSearch[]> {
    return this.transactionSearchUsecases.getTopTransactionSearches(queryString.limit);
  }

  @Patch('new-search/:transaction')
  @ApiOkResponse({description: TRANSACTION_SEARCH_SCORE_UPDATED})
  async newTransactionSearch(
      @Param('transaction') transaction: string,
  ): Promise<string> {
    await this.transactionSearchUsecases.newTransactionSearch(transaction);
    return TRANSACTION_SEARCH_SCORE_UPDATED
  }
}
