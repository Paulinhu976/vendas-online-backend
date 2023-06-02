import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Param, UsePipes } from '@nestjs/common/decorators';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(userDto);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get(':/id')
  async getUserById(@Param('id') id: number): Promise<ReturnUserDto> {
    return this.userService.getUserById(id);
  }
}
