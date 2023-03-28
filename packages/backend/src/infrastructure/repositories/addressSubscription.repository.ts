import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AddressSubscriptionRepositoryInterface
} from "../../domain/repositories/addresSubscription.repository.interface";
import {AddressSubscriptionEntity} from "../entities/addressSubscription.entity";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class AddressSubscriptionRepository implements AddressSubscriptionRepositoryInterface {
  constructor(
      @InjectRepository(AddressSubscriptionEntity)
      private readonly addressSubscriptionEntityRepository: Repository<AddressSubscriptionEntity>,
      @InjectRepository(UserEntity)
      private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async add(address: string, userId: number): Promise<void> {
    const user: UserEntity = await this.userEntityRepository.findOneBy({id: userId});

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const addrSubscription = new AddressSubscriptionEntity();
    addrSubscription.address = address;
    addrSubscription.user = user;
    await this.addressSubscriptionEntityRepository.insert(addrSubscription);
  }
  async findByUserId(userId: number): Promise<string[]> {
    const addrSunEntities = await this.addressSubscriptionEntityRepository.find({
      where: { user: { id: userId } }
    });
    return addrSunEntities.map((a) => a.address);
  }
}
