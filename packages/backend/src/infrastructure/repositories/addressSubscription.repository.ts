import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AddressSubscriptionRepositoryInterface
} from "../../domain/repositories/addresSubscription.repository.interface";
import {AddressSubscriptionEntity} from "../entities/addressSubscription.entity";

@Injectable()
export class AddressSubscriptionRepository implements AddressSubscriptionRepositoryInterface {
  constructor(
    @InjectRepository(AddressSubscriptionEntity)
    private readonly addressSubscriptionEntityRepository: Repository<AddressSubscriptionEntity>,
  ) {}

  async add(address: string, userId: number): Promise<void> {
    const addrSubscription = new AddressSubscriptionEntity();
    addrSubscription.address = address;
    addrSubscription.userId = userId;
    await this.addressSubscriptionEntityRepository.insert(addrSubscription);
  }
  async findByUserId(userId: number): Promise<string[]> {
    const addrSunEntities = await this.addressSubscriptionEntityRepository.find({
      where: {userId}
    });
    return addrSunEntities.map((a) => a.address);
  }
}
