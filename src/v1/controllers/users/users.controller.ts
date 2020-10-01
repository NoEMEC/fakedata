import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
  @Get('/')
  users(): object {
    return {
      _id: 'idpro',
      name: 'namepro',
    };
  }
}
