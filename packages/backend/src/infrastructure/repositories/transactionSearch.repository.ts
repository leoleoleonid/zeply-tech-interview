import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {TransactionSearchRepositoryInterface} from "../../domain/repositories/transactionSearch.repository.interface";
import {TransactionSearchEntity} from "../entities/transactionSearch.entity";
import {TransactionSearch} from "../../domain/model/transactionSearch";

@Injectable()
export class TransactionSearchRepository implements TransactionSearchRepositoryInterface {
  constructor(
      @InjectRepository(TransactionSearchEntity)
      private readonly transactionSearchEntityRepository: Repository<TransactionSearchEntity>,
  ) {}


  async insert(transaction: string): Promise<void> {
    const transactionSearch = new TransactionSearchEntity();
    transactionSearch.transaction = transaction;
    transactionSearch.score = 1;
    await this.transactionSearchEntityRepository.insert(transactionSearch);
  }

  async isAlreadyExist(transaction: string): Promise<boolean> {
    const transactionRes: TransactionSearchEntity =
        await this.transactionSearchEntityRepository.findOneBy({transaction});
    return Boolean(transactionRes)
  }

  async findOne(transaction: string): Promise<TransactionSearch> {
    const transactionRes: TransactionSearchEntity =
        await this.transactionSearchEntityRepository.findOneBy({transaction});
    return transactionRes ? this.toTransactionSearch(transactionRes): null
  }
  async findTop(limit: number): Promise<TransactionSearch[]> {
    const transactionSearchEntities =
        await this.transactionSearchEntityRepository.find({
          take: limit,
          order: {
            score: "DESC",
          },
        });

    return transactionSearchEntities.map((tE) => this.toTransactionSearch(tE))
  }
  async updateScore(transaction: string, newScore: number): Promise<void> {
    await this.transactionSearchEntityRepository.update({
      transaction
    }, {
      score: newScore
    })
  }

  private toTransactionSearch(transactionSearchEntity: TransactionSearchEntity): TransactionSearch {
    const transactionSearch = new TransactionSearch();
    transactionSearch.transaction = transactionSearchEntity.transaction;
    transactionSearch.score = transactionSearchEntity.score;
    return transactionSearch
  }
}
