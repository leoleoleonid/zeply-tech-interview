import {Controller, Get, Headers, Param, Patch, Query, UseGuards} from '@nestjs/common';
import {LimitDto} from "./dtos/limit.query-param.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {AddressSearchPresenter} from "./presenters/addressSearch.presentor";
import {AddressSearchUsecases} from "../../../usecases/addressSearch.usecases";
import {AddressSearch} from "../../../domain/model/addressSearch";
import {AuthGuard} from "../../common/guards/AuthGuard";

const ADDRESS_SEARCH_SCORE_UPDATED = 'The address score has been successfully updated.';

@Controller('address-search')
@UseGuards(AuthGuard)
export class AddressSearchController {

  constructor(private readonly addressSearchUsecases: AddressSearchUsecases) {}

  @Get('/top')
  @ApiOkResponse({type: AddressSearchPresenter, isArray: true})
  async getTopAddressSearches(
      @Headers('user-id') userId: number,
      @Query() queryString: LimitDto
  ): Promise<AddressSearch[]> {
    return this.addressSearchUsecases.getTopAddressSearches(queryString.limit);
  }

  @Patch('new-search/:address')
  @ApiOkResponse({description: ADDRESS_SEARCH_SCORE_UPDATED})
  async newAddressSearch(
      @Headers('user-id') userId: number,
      @Param('address') address: string,
  ): Promise<string> {
    await this.addressSearchUsecases.newAddressSearch(address);
    return ADDRESS_SEARCH_SCORE_UPDATED
  }
}
