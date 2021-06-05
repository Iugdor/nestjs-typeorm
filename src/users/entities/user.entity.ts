import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({ type: 'boolean', default: false })
  email_confirmed: boolean;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  customer: Customer;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'confirmation_account_token',
    nullable: true,
  })
  @Exclude()
  confirmationAccountToken: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password_recovery_token',
    nullable: true,
  })
  @Exclude()
  passwordRecoveryToken: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
