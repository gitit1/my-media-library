import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Series } from './series.entity';
import { Episode } from './episode.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thetvdb_id: number;

  @Column()
  seriesId: number;

  @Column({ nullable: true })
  plex_id: string;

  @ManyToOne(() => Series, (series) => series.seasons, { onDelete: 'CASCADE' })
  series: Series;

  @Column()
  seasonNumber: number;

  @Column({ nullable: true, type: 'text' })
  summary: string;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ default: false })
  watched: boolean;

  @Column({ default: 0 })
  episodeCount: number;

  @OneToMany(() => Episode, (episode) => episode.season)
  episodes: Episode[];
  number: any;
}
