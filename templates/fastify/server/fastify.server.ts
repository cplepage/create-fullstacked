import Fastify from 'fastify'
import Server from "fullstacked/server";
import {pathToFileURL} from "url";

let globalResolver;
const fastify = Fastify({
    logger: true,
    serverFactory: (handler, opts) => {
        Server.stop();
        const {promisifiedListener, resolver} = Server.promisify(handler);
        globalResolver = resolver;
        Server.addListener(promisifiedListener);
        return Server.server;
    }
});

fastify.get('/hello-fastify', function (request, reply) {
    reply.send("Hello from Fastify");
});

fastify.setNotFoundHandler(request => globalResolver(request.raw));

const start = () => fastify.listen({host: "0.0.0.0", port: Server.port});
if (import.meta.url === pathToFileURL(process.argv[1]).href)
    start()

export default start;
