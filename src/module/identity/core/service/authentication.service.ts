import { UserRepository } from '@identityModule/persistence/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserUnauthorizedException } from '../exception/user-unauthorized.exception';

// TODO: move this to a .env file and config
export const jwtConstants = {
  secret:
    'DO NOT USER THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await this.comparePassword(password, user.password)))
      throw new UserUnauthorizedException(`Cannot authorize user: ${email}.`);
    //TODO add more fields to the JWT
    const payload = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
      }),
    };
  }

  private async comparePassword(
    password: string,
    actualPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, actualPassword);
  }
}
