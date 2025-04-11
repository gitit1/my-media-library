import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Season } from './season.entity';
import { Subtitle } from './subtitle.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thetvdb_id: number;

  @Column()
  seriesId: number;

  @Column()
  seasonId: number;

  @ManyToOne(() => Season, (season) => season.episodes, { onDelete: 'CASCADE' })
  season: Season;

  @Column()
  episodeNumber: number;

  @Column('jsonb', { nullable: true })
  name: {
    en: string;
    heb: string;
  };

  @Column('jsonb', { nullable: true })
  summary: {
    en: string;
    heb: string;
  };

  @Column({ nullable: true })
  airDate: string;

  @Column({ nullable: true })
  filePath: string;

  @Column('text', { array: true, nullable: true })
  posters: string[];

  @Column({ nullable: true })
  plex_id: string;

  @Column({ default: false })
  hasBuiltSubs: boolean;

  @Column({ default: false })
  hasExternalSubs: boolean;

  @Column({ default: false })
  watched: boolean;

  @OneToMany(() => Subtitle, (subtitle) => subtitle.episode)
  subtitles: Subtitle[];
}
