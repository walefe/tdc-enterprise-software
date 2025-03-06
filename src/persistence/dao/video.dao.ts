import { CreateContentData } from '@src/core/services/content-management.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { VideoDAO as VideoDAOInterface } from '@src/core/dao/video.dao.interface';

@Injectable()
export class VideoDAO implements VideoDAOInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async create(videoData: CreateContentData) {
    const { title, description, url, thumbnailUrl, sizeInKb } = videoData;
    return this.prismaService.video.create({
      data: {
        id: randomUUID(),
        title,
        description,
        url,
        thumbnailUrl,
        sizeInKb,
        duration: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
