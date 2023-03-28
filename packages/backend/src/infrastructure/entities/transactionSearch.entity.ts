import { Entity, Column } from 'typeorm';

@Entity()
export class TransactionSearchEntity {
  @Column()
  transaction: string;

  @Column()
  score: number;
}
