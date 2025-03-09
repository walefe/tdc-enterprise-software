import { Module } from '@nestjs/common';
import { ContentController } from './http/rest/controller/content.controller';
import { ContentManagementService } from './core/services/content-management.service';
import { PrismaService } from './persistence//prisma/prisma.service';
import { MediaPlayerService } from './core/services/media-player.service';
import { ContentRepository } from './persistence/repository/content.repository';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [
    PrismaService,
    ContentManagementService,
    MediaPlayerService,
    ContentRepository,
  ],
})
export class AppModule {}
