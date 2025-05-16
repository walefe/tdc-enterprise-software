import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeOrmMigrationService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async migrate(): Promise<void> {
    const pendigMigrations = await this.dataSource.showMigrations();
    if (pendigMigrations) {
      const appliedMigrations = await this.dataSource.runMigrations();
      console.log('Applied migrations', appliedMigrations);
    }
  }

  async getDataSource(): Promise<DataSource> {
    return this.dataSource;
  }
}
