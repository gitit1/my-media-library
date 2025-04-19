import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Season } from './season.entity';
import { Path } from './path.entity';

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

  @Column({ unique: true, nullable: true })
  folder_name: string;

  @ManyToOne(() => Path, (path) => path.series, { nullable: true })
  path: Path;

  @Column('jsonb')
  seriesName: {
    en: string;
    heb: string;
  };

  @Column('jsonb')
  summary: {
    en: string;
    heb: string;
  };

  @Column({ nullable: true })
  network: string;

  @Column({ nullable: true })
  firstAired: string;

  @Column({ nullable: true })
  lastAired: string;

  @Column({ nullable: true })
  originalCountry: string;

  @Column({ nullable: true })
  primary_language: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  seriesStatus: string;

  @Column({ nullable: true })
  watchingStatus: string;

  @Column({ nullable: true })
  subtitleStatus: string;

  @Column('text', { array: true, nullable: true })
  posters: string[];

  @Column('text', { array: true, nullable: true })
  banners: string[];

  @Column('text', { array: true, nullable: true })
  icons: string[];

  @Column({ nullable: true })
  currentEpisode: number;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column('text', { array: true, nullable: true })
  genre: string[];

  @Column({ default: false })
  favorite: boolean;

  @OneToMany(() => Season, (season) => season.series)
  seasons: Season[];
}
