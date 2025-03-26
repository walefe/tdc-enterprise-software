import { DefaultEntity } from '@src/infra/module/typeorm/entity/default.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Content } from './content.entity';
import { Episode } from './episode.entity';
import { Thumbnail } from './thumbnail.entity';

@Entity({ name: 'tv_show' })
export class TvShow extends DefaultEntity<TvShow> {
  @OneToMany(() => Episode, (episode) => episode.video)
  episodes: Episode[];

  @OneToOne(() => Content)
  @JoinColumn()
  content: Content;

  @OneToOne(() => Thumbnail)
  @JoinColumn()
  thumbnail: Thumbnail;
}
