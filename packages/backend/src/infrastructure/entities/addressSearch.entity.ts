import { Entity, Column } from 'typeorm';

@Entity()
export class AddressSearchEntity {
  @Column()
  address: string;

  @Column()
  score: number;
}
