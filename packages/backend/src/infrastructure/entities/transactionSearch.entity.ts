import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class TransactionSearchEntity {
  @PrimaryColumn()
  transaction: string;

  @Column()
  score: number;
}
