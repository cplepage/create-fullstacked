import { NestFactory } from '@nestjs/core';
import { Catch, HttpException, ExceptionFilter, ArgumentsHost, NotFoundException, NestApplicationOptions } from '@nestjs/common';
import {AppModule} from "./src/app.module.js";
import Server from "fullstacked/server.js";

(async () => {
    const options: NestApplicationOptions = {};

    if(!process.argv.includes("--development"))
        options.logger = false;

    const nestjs = await NestFactory.create(AppModule, options);
    nestjs.useGlobalFilters(new HttpExceptionFilter());
    await nestjs.init();

    const {promisifiedListener, resolver} = Server.promisify(nestjs.getHttpAdapter().getInstance());
    HttpExceptionFilter.resolver = resolver;
    Server.addListener(promisifiedListener);
})();

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
    static resolver;
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if(exception instanceof NotFoundException && HttpExceptionFilter.resolver)
            return HttpExceptionFilter.resolver(request, response);
        else
            throw exception;
    }
}
