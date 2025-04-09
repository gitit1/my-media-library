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

  @ManyToOne(() => Season, (season) => season.episodes, { onDelete: 'CASCADE' })
  season: Season;

  @Column()
  episodeNumber: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  summary: string;

  @Column({ nullable: true })
  airDate: Date;

  @Column({ nullable: true })
  filePath: string;

  @Column({ nullable: true })
  posterPath: string;

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
  number: any;
}
