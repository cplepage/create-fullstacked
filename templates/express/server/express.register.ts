import Server from "fullstacked/server";
import type {Application} from "express";

export default function(app: Application){
    const { handler, resolver } = Server.promisify(app);

    // express bottoms out here
    app.use(resolver);

    Server.listeners.push({
        title: "express",
        handler
    });
}
