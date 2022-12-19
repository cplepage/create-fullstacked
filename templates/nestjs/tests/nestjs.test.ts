import {after, before, describe, it} from "mocha";
import TestE2E from "fullstacked/utils/testE2E.js";
import path, {dirname} from "path";
import {equal} from "assert";
import {fileURLToPath} from "url";
import testIntegration from "fullstacked/utils/testIntegration.js";
import Server from "fullstacked/server.js";
import {fetch} from "fullstacked/utils/fetch.js";
import "../server/nestjs.server.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

testIntegration(describe("NestJS Template Integration Tests", function() {
    before(async function (){
        Server.start()
    });

    it("Should hit /hello-world endpoint", async () => {
        equal(await fetch.get("http://localhost/hello-world"), "Hello from NestJS");
    });

    after(async function(){
        Server.stop();
    });
}), path.resolve(__dirname, ".."));

describe("NestJS Template e2e Tests", function(){
    let test;
    before(async function(){
        test = new TestE2E(path.resolve(__dirname, ".."));
        await test.start("/hello-world");
    });

    it('Should respond with Hello from NestJS', async function(){
        const root = await test.page.$("body");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "Hello from NestJS");
    });

    after(async function(){
        await test.stop();
    });
});
