import { Module } from '@nestjs/common';
import { ContentManagementService } from '@contentModule/core/services/content-management.service';
import { MediaPlayerService } from '@contentModule/core/services/media-player.service';
import { ExtenalMovieClient } from '@contentModule/http/rest/client/external-movie-rating/external-movie-rating.client';
import { MediaPlayerController } from '@contentModule/http/rest/controller/media-player.controller';
import { VideoUploadController } from '@contentModule/http/rest/controller/video-upload.controller';
import { PersistenceModule } from '@contentModule/persistence/persistence.module';
import { ContentRepository } from '@contentModule/persistence/repository/content.repository';
import { VideoRepository } from '@contentModule/persistence/repository/video.repository';
import { ConfigModule } from '../shared/module/config/config.module';
import { HttpClientModule } from '@sharedModules/http-client/http-client.module';

@Module({
  imports: [
    PersistenceModule.forRoot(),
    ConfigModule.forRoot(),
    HttpClientModule,
  ],
  controllers: [VideoUploadController, MediaPlayerController],
  providers: [
    ContentManagementService,
    MediaPlayerService,
    ContentRepository,
    VideoRepository,
    ExtenalMovieClient,
  ],
})
export class ContentModule {}
