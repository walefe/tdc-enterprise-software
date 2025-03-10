import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VideoEntity } from '@src/core/entity/video.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class VideoRepository {
  private readonly model: PrismaService['video'];

  constructor(prismaService: PrismaService) {
    this.model = prismaService.video;
  }

  async findById(id: string): Promise<VideoEntity | null> {
    try {
      const videoData = await this.model.findUnique({
        where: { id },
      });
      if (!videoData) return null;

      return VideoEntity.createFrom(videoData);
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
  protected handleAndThrowError(error: unknown): never {
    const errorMessage = this.extractErrorMessage(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    throw new Error(errorMessage);
  }

  async clear(): Promise<{ count: number }> {
    try {
      return await this.model.deleteMany();
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }
}
