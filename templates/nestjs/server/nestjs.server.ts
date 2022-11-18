import { NestFactory } from '@nestjs/core';
import {AppModule} from "./src/app.module";
import Server from "fullstacked/server";

(async () => {
    const nestjs = await NestFactory.create(AppModule);
    await nestjs.init();
    Server.addListener(nestjs.getHttpAdapter().getInstance());
})();
