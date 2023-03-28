import {Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "./user.entity";

@Entity()
export class AddressSubscriptionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  // @ManyToOne(() => UserEntity, (user) => user.id)
  // @JoinColumn({ name: 'userId' })
  // userId: number;

  @ManyToOne(() => UserEntity, (user) => user.addressSubscriptions)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

}
