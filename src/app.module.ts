import { Module } from '@nestjs/common';
import { ContentController } from './http/rest/controller/content.controller';
import { ContentManagementService } from './core/services/content-management.service';
import { PrismaService } from './persistence//prisma/prisma.service';
import { MediaPlayerService } from './core/services/media-player.service';
import { VideoDAO as VideoDAOImpl } from '@src/persistence/dao/video.dao';
import { VideoDAO } from '@src/core/dao/video.dao.interface';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [
    PrismaService,
    ContentManagementService,
    MediaPlayerService,
    {
      provide: VideoDAO,
      useClass: VideoDAOImpl,
    },
  ],
})
export class AppModule {}
