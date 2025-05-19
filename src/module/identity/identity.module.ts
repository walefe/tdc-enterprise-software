import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  AuthService,
  jwtConstants,
} from './core/service/authentication.service';
import { PersistenceModule } from '@sharedModules/persistence/prisma/persistence.module';
import { UserResolver } from './http/graphql/user.resolver';
import { UserManagementService } from './core/service/user-management.service';
import { UserRepository } from './persistence/repository/user.repository';
import { AuthResolver } from './http/graphql/auth.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    PersistenceModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserResolver,
    UserManagementService,
    UserRepository,
  ],
})
export class identityModule {}
