import { Controller, Get } from '@nestjs/common';

@Controller('hello-nestjs')
export class AppController {
    @Get()
    helloWorld(): string {
        return 'Hello from NestJS';
    }
}
