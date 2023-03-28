import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {AddressSubscriptionEntity} from "./addressSubscription.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // @OneToMany(() => AddressSubscriptionEntity, (addressSubscription) => addressSubscription.userId)
  // addressSubscriptions: AddressSubscriptionEntity[]
  @OneToMany(() => AddressSubscriptionEntity, (addressSubscription) => addressSubscription.user)
  addressSubscriptions: AddressSubscriptionEntity[];
}
