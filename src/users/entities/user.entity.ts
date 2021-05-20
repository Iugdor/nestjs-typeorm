import { BasicEntity } from 'src/database/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @OneToOne(() => Customer, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
