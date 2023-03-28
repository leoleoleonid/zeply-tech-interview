import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class AddressSearchEntity {
  @PrimaryColumn()
  address: string;

  @Column()
  score: number;
}
