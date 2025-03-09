import { randomUUID } from 'crypto';
import { BaseEntity, BaseEntityProps } from './base.entity';

export interface ThumbnailEntityProps extends BaseEntityProps {
  url: string;
}

export class ThumbnailEntity extends BaseEntity {
  private url: ThumbnailEntityProps['url'];

  private constructor(data: ThumbnailEntityProps) {
    super(data);
  }

  static createNew(
    data: Omit<ThumbnailEntityProps, 'id' | 'createdAt' | 'updatedAt'>,
    id = randomUUID(),
  ): ThumbnailEntity {
    return new ThumbnailEntity({
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: ThumbnailEntityProps): ThumbnailEntity {
    return new ThumbnailEntity(data);
  }

  getUrl(): ThumbnailEntityProps['url'] {
    return this.url;
  }

  serialize() {
    return {
      id: this.getId(),
      url: this.url,
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
