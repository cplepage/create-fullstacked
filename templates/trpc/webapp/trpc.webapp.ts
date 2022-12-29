import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/trpc.server';

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: window.location.origin
        }),
    ],
    transformer: {
        serialize: (object: any) => object,
        deserialize: (object: any) => object
    }
});

const trpcDivID = "hello-from-trpc"
async function helloFromTRPC(){
    let trpcDIV = document.getElementById(trpcDivID);

    if(!trpcDIV){
        trpcDIV = document.createElement("div");
        trpcDIV.setAttribute("id", trpcDivID)
        document.body.append(trpcDIV);
    }

    trpcDIV.innerHTML = await trpc.helloTRPC.query();
}

helloFromTRPC();
