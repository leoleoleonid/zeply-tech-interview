import {Entity, Column, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity()
export class AddressSubscriptionEntity {

  @PrimaryColumn()
  address: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number;

}
