import testIntegration from "fullstacked/utils/testIntegration.js";
import {after, before, describe, it} from "mocha";
import Server from "fullstacked/server.js";
import {equal} from "assert";
import {fetch} from "fullstacked/utils/fetch.js";

import "../server/express.server.js";

testIntegration(describe("Express Template Integration Tests", function() {
    before(async function (){
        Server.start()
    });

    it("Should hit /hello-express endpoint", async () => {
        equal(await fetch.get("http://localhost/hello-express"), "Hello from express");
    });

    after(async function(){
        Server.stop();
    });
}));
