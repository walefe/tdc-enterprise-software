import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import request from 'supertest';
import fs from 'fs';
import { AppModule } from '@src/app.module';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { ContentManagementService } from '@src/core/services/content-management.service';
import { ContentRepository } from '@src/persistence/repository/content.repository';
import { MovieRepository } from '@src/persistence/repository/movie.repository';

describe('ContentController (e2e)', () => {
  let moduleFixture: TestingModule;
  let app: INestApplication;
  let contentManagementService: ContentManagementService;
  let contentRepository: ContentRepository;
  let videoRepository: VideoRepository;
  let movieRepository: MovieRepository;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    contentManagementService = moduleFixture.get<ContentManagementService>(
      ContentManagementService,
    );
    videoRepository = moduleFixture.get<VideoRepository>(VideoRepository);
    contentRepository = moduleFixture.get<ContentRepository>(ContentRepository);
    movieRepository = moduleFixture.get<MovieRepository>(MovieRepository);
  });

  beforeEach(async () => {
    jest
      .useFakeTimers({ advanceTimers: true })
      .setSystemTime(new Date('2025-01-01'));
  });

  afterEach(async () => {
    await videoRepository.deleteAll();
    await movieRepository.deleteAll();
    await contentRepository.deleteAll();
  });

  afterAll(async () => {
    await moduleFixture.close();
    fs.rmSync('./uploads', { recursive: true, force: true });
    await app.close();
  });

  describe('GET /stream/:videoId', () => {
    it('should stream a video', async () => {
      const createdMovie = await contentManagementService.createMovie({
        title: 'Test Video',
        description: 'This is a test video',
        url: './test/fixtures/sample.mp4',
        thumbnailUrl: './test/fixtures/sample.jpg',
        sizeInKb: 1430145,
      });

      const fileSize = 1430145;
      const range = `bytes=0-${fileSize - 1}`;

      const response = await request(app.getHttpServer())
        .get(`/stream/${createdMovie.movie.video.id}`)
        .set('Range', range)
        .expect(HttpStatus.PARTIAL_CONTENT);

      expect(response.headers['content-range']).toBe(
        `bytes 0-${fileSize - 1}/${fileSize}`,
      );
      expect(response.headers['accept-ranges']).toBe('bytes');
      expect(response.headers['content-length']).toBe(String(fileSize));
      expect(response.headers['content-type']).toBe('video/mp4');
    });

    it('returns 404 if the video is not found', async () => {
      await request(app.getHttpServer())
        .get('/stream/invalid-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
