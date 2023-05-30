import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(userDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHash = await hash(userDto.password, saltOrRounds);
    console.log('passwordHash', passwordHash);

    const user: User = {
      ...userDto,
      id: this.users.length + 1,
      password: passwordHash,
    };

    this.users.push(user);

    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
