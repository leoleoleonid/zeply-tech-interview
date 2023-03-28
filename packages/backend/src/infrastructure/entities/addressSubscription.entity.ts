import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity()
export class AddressSubscriptionEntity {

  @Column()
  address: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: number;

}
