import testIntegration from "fullstacked/utils/testIntegration.js";
import {after, before, describe, it} from "mocha";
import Server from "fullstacked/server.js";
import {equal} from "assert";
import {fetch} from "fullstacked/utils/fetch.js";

import "../server/nestjs.server.js";

testIntegration(describe("NestJS Template Integration Tests", function() {
    before(async function (){
        Server.start()
    });

    it("Should hit /hello-nestjs endpoint", async () => {
        equal(await fetch.get("http://localhost/hello-nestjs"), "Hello from NestJS");
    });

    after(async function(){
        Server.stop();
    });
}));
