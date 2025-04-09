import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Episode } from './episode.entity';

@Entity()
export class Subtitle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Episode, (episode) => episode.subtitles, { onDelete: 'CASCADE' })
  episode: Episode;

  @Column()
  episodeThetvdbId: number;

  @Column()
  language: string;

  @Column()
  filePath: string;

  @Column({ default: false })
  isBuiltIn: boolean;
}
