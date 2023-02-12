import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Incoming } from './incoming.entity';
import { Outgoing } from './outcoming.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stock: number;

  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;

  @OneToMany((type) => Incoming, (incoming) => incoming.product)
  incomings: Incoming[];

  @OneToMany((type) => Outgoing, (outgoing) => outgoing.product)
  outgoings: Outgoing[];

  @CreateDateColumn()
  createdAt: Date;
}
