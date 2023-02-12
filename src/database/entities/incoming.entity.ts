import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('incomings')
export class Incoming {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => Product, (product) => product.incomings)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
