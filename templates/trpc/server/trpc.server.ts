import {initTRPC} from '@trpc/server';
import { createHTTPHandler } from "@trpc/server/adapters/standalone"
import Server from "fullstacked/server";

const t = initTRPC.create();

const appRouter = t.router({
    helloTRPC: t.procedure.query(() => "Hello from tRPC"),
});

const httpHandler = createHTTPHandler({
    router: appRouter
});

const {promisifiedListener, resolver} = Server.promisify(async (req, res) => {
    const headerMap = new Map();
    const setHeader = res.setHeader.bind(res);
    const end = res.end.bind(res);

    await httpHandler(req, {
        ...res,
        setHeader: (key, value) => {
            headerMap.set(key, value);
        },
        end: rawBody => {
            const body = JSON.parse(rawBody);
            if(body.error?.data?.code === "NOT_FOUND")
                return resolver(req, res);

            for(const [key, value] of Array.from(headerMap.entries()))
                setHeader(key, value);
            end(rawBody);
        }
    });
})

Server.addListener(promisifiedListener);

export type AppRouter = typeof appRouter;
