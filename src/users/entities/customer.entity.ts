import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  //Max Lenght 15 : https://en.wikipedia.org/wiki/Telephone_numbering_plan#:~:text=International%20numbering%20plan,-The%20E.&text=as%20the%20NANP.-,E.,)%2C%20and%20the%20subscriber%20number.
  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
