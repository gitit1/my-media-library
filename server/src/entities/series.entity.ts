import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Season } from './season.entity';

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  thetvdb_id: number;

  @Column({ nullable: true })
  original_thetvdb_id: string;

  @Column({ nullable: true })
  plex_id: string;

  @Column({ nullable: true })
  opensubtitles_id: number;

  @Column({ unique: true })
  folder_name: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  hebrewName: string;

  @Column({ nullable: true })
  network: string;

  @Column({ nullable: true })
  year: number;

  @Column({ default: 'Running' })
  seriesStatus: string;

  @Column({ default: '005' })
  watchingStatus: string;

  @Column({ default: 'No Subs' })
  subtitleStatus: string;

  @Column({ nullable: true, type: 'text' })
  summary: string;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  currentEpisode: number;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('simple-array', { nullable: true })
  genre: string[];

  @Column({ default: false })
  favorite: boolean;

  @OneToMany(() => Season, (season) => season.series)
  seasons: Season[];
}
