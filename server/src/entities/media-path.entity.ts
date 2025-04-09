import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaPath {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: true })
  active: boolean;
}