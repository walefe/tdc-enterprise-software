import {
  BadRequestException,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { join } from 'path';
import fs from 'fs';

import { MediaPlayerService } from '@contentModule/core/services/media-player.service';

import { VideoNotFoundException } from '@contentModule/core/exception/video-not-found.exception';

@Controller('stream')
export class MediaPlayerController {
  constructor(private readonly mediaPlayerService: MediaPlayerService) {}

  @Get(':videoId')
  @Header('Content-Type', 'video/mp4')
  async streamVideo(
    @Param('videoId') videoId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const url = await this.mediaPlayerService.prepareStreaming(videoId);

      if (!url) {
        throw new BadRequestException('Video not found.');
      }

      const videoPath = join('.', url);
      const fileSize = fs.statSync(videoPath).size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(HttpStatus.PARTIAL_CONTENT, head);
        file.pipe(res);
      }
    } catch (error) {
      if (error instanceof VideoNotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
          error: 'Not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
    }
  }
}
