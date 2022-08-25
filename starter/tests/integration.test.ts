import Helper from "fullstacked/tests/integration/Helper";
import {fetch} from "fullstacked/webapp/fetch";
import {ok} from "assert";
import server from "../server/index";
import * as path from "path";

Helper(describe("Hello World", function(){
    before(async function (){
        server.start({silent: true, testing: true})
    });
    it('Should hit hello endpoint', async function(){
        const response = await fetch.get("/hello");
        ok(["🚀", "🤘", "👋", "⭐️"].includes(response));
    });
    after(async function(){
        server.stop();
    });
}), path.resolve(__dirname, ".."));
