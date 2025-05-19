import { DomainException } from '@contentModule/core/exception/domain.exception';
import { UserRepository } from '@identityModule/persistence/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const PASSWORD_HASH_SALT = 10;

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(user: CreateUserDto) {
    if (!this.validateEmail(user.email))
      throw new DomainException(`Invalid email: ${user.email}`);

    const newUser = UserModel.create({
      ...user,
      password: await bcrypt.hash(user.password, PASSWORD_HASH_SALT),
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  private validateEmail(email: string): boolean {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexPattern.test(email);
  }

  async getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}
