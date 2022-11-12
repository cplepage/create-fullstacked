import { Module } from '@nestjs/common';
import {AppController} from "./app.controller";
import { ServeStaticModule } from '@nestjs/serve-static';
import Server from "fullstacked/server";

@Module({
    imports: [ServeStaticModule.forRoot({rootPath: Server.publicDir})],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
