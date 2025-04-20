import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultEntity } from './entity/default.entity';
import { ConfigModule } from '@src/infra/module/config/config.module';
import { ConfigService } from '../config/service/config.service';
import { TypeOrmMigrationService } from './service/typeorm-migration.service';

@Module({})
export class TypeormPersistenceModule {
  static forRoot(options?: {
    migrations?: string[];
    entities?: Array<typeof DefaultEntity>;
  }): DynamicModule {
    return {
      module: TypeormPersistenceModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forRoot()],
          inject: [ConfigService],
          useFactory: async (...args: any[]) => {
            const configService: any = args.find(
              (arg) => arg instanceof ConfigService,
            );

            return {
              type: 'postgres',
              logging: false,
              autoLoadEntities: false,
              synchronize: false,
              migrationsTableName: 'typeorm_migrations',
              ...configService.get('database'),
              ...options,
            };
          },
        }),
      ],
      providers: [TypeOrmMigrationService],
      exports: [TypeOrmMigrationService],
    };
  }
}
