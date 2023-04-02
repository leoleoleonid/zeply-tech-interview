import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {AddressSearchRepositoryInterface} from "../../domain/repositories/addressSearch.repository.interface";
import {AddressSearchEntity} from "../entities/addressSearch.entity";
import {AddressSearch} from "../../domain/model/addressSearch";

@Injectable()
export class AddressSearchRepository implements AddressSearchRepositoryInterface {
  constructor(
    @InjectRepository(AddressSearchEntity)
    private readonly addressSearchEntityRepository: Repository<AddressSearchEntity>,
  ) {}


  async insert(address: string): Promise<void> {
    const newAddress = new AddressSearchEntity();
    newAddress.address = address;
    newAddress.score = 1;
    await this.addressSearchEntityRepository.insert(newAddress);
  }

  async isAlreadyExist(address: string): Promise<boolean> {
    const addressRes: AddressSearchEntity = await this.addressSearchEntityRepository.findOneBy({address});
    return Boolean(addressRes)
  }
  async findTop(limit: number): Promise<AddressSearch[]> {
    const addressSearchEntities =
        await this.addressSearchEntityRepository.find({
            take: limit,
            order: {
              score: "DESC",
            },
        });

    return addressSearchEntities.map((addrE) => this.toAddressSearch(addrE))
  }
  async updateScore(address: string): Promise<void> {
    const addressSearchEntity = await this.addressSearchEntityRepository.findOneBy({address});
    const score = addressSearchEntity.score + 1;
    await this.addressSearchEntityRepository.update({
      address
    }, {
      score
    })
  }

  private toAddressSearch(addressSearchEntity: AddressSearchEntity): AddressSearch {
    const addressSearch = new AddressSearch();
    addressSearch.address = addressSearchEntity.address;
    addressSearch.score = addressSearchEntity.score;
    return addressSearch
  }
}
