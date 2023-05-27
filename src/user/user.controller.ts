import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async getAllUser() {
    return JSON.stringify({ test: 'abc' });
  }
}
