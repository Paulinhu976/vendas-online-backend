import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHash = await hash(userDto.password, saltOrRounds);
    console.log('passwordHash', passwordHash);

    return this.userRepository.save({
      ...userDto,
      typeUser: 1,
      password: passwordHash,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Userid Not Found');
    }
    return user;
  }

  async getUserByIdUsingRelation(userId: number): Promise<UserEntity> {
    console.log(typeof userId);

    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        adresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }
    return user;
  }
}
