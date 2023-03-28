import {Controller, Get, Param, Patch, Query} from '@nestjs/common';
import {LimitDto} from "./dtos/limit.query-param.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {AddressSearchPresenter} from "./presenters/addressSearch.presentor";
import {AddressSearchUsecases} from "../../../usecases/addressSearch.usecases";
import {AddressSearch} from "../../../domain/model/addressSearch";

const ADDRESS_SEARCH_SCORE_UPDATED = 'The address score has been successfully updated.';

@Controller('address-search')
export class AddressSearchController {

  constructor(private readonly addressSearchUsecases: AddressSearchUsecases) {}

  @Get('/top')
  @ApiOkResponse({type: AddressSearchPresenter, isArray: true})
  async getTopAddressSearches(@Query() queryString: LimitDto): Promise<AddressSearch[]> {
    return this.addressSearchUsecases.getTopAddressSearches(queryString.limit);
  }

  @Patch('new-search/:address')
  @ApiOkResponse({description: ADDRESS_SEARCH_SCORE_UPDATED})
  async newAddressSearch(
      @Param('address') address: string,
  ): Promise<string> {
    await this.addressSearchUsecases.newAddressSearch(address);
    return ADDRESS_SEARCH_SCORE_UPDATED
  }
}
