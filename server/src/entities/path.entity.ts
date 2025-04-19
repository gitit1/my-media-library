import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Series } from './series.entity';

@Entity()
export class Path {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  driveLetter: string;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(() => Series, (series) => series.path, { nullable: true })
  series: Series[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
