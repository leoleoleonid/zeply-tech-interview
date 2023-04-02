import {Body, Controller, Get, Post, Headers, UseGuards} from '@nestjs/common';
import {AddAddressDTO} from "./dtos/addAddress.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {AddressSubscriptionUsecases} from "../../../usecases/addresSubscription.usecases";
import {AuthGuard} from "../../common/guards/AuthGuard";

const ADDRESS_ADDED = 'The address has been successfully added.';

@Controller('subscribed-addresses')
@UseGuards(AuthGuard)
export class AddressSubscriptionController {

  constructor(private readonly addressSubscriptionUsecases: AddressSubscriptionUsecases) {}

  @Get()
  @ApiOkResponse({isArray: true})
  async getSubscribedAddresses(@Headers('user-id') userId: number): Promise<string[]> {
    return this.addressSubscriptionUsecases.getSubscribedAddresses(userId)
  }

  @Post()
  @ApiOkResponse({description: ADDRESS_ADDED})
  async addAddress(
      @Headers('user-id') userId: number,
      @Body() body: AddAddressDTO,
  ): Promise<string> {
    await this.addressSubscriptionUsecases.addAddress(userId, body.address);
    return ADDRESS_ADDED
  }
}
