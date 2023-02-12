import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('outgoings')
export class Outgoing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => Product, (product) => product.outgoings)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
