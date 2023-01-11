import {NestFactory} from '@nestjs/core';
import {AppModule} from "./nestjs/app.module";
import nestjsRegister from "./nestjs.register";


const nestjs = await NestFactory.create(AppModule, {});
nestjsRegister(nestjs);
await nestjs.init();
