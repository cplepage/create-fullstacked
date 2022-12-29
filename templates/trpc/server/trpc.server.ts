import { initTRPC } from '@trpc/server';
import { createHTTPHandler } from "@trpc/server/adapters/standalone"
import Server from "fullstacked/server";

const t = initTRPC.create();

const appRouter = t.router({
    helloTRPC: t.procedure.query(() => "Hello from tRPC"),
});

Server.addListener(createHTTPHandler({
    router: appRouter
}));

export type AppRouter = typeof appRouter;
