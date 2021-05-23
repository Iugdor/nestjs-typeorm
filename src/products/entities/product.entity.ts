import { BasicEntity } from 'src/database/base.entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
export class Product extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: false })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];
}
