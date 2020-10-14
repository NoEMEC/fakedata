import { Controller, Get } from '@nestjs/common';

@Controller()
export class PostsController {
  @Get()
  posts(): string {
    return 'All Post :D';
  }
}
