import {describe, it, before, after} from "mocha";
import {equal} from "assert";
import * as path from "path";
import "../server/express.server.js";
import testIntegration from "fullstacked/utils/testIntegration.js";
import {fetch} from "fullstacked/utils/fetch.js";
import TestE2E from "fullstacked/utils/testE2E.js";
import {dirname} from "path";
import {fileURLToPath} from "url";
import Server from "fullstacked/server/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

testIntegration(describe("Express Template Integration Tests", function() {
    before(async function (){
        Server.start()
    });

    it("Should hit /hello-world endpoint", async () => {
        equal(await fetch.get("http://localhost/hello-world"), "Hello World");
    });

    after(async function(){
        Server.stop();
    });
}), path.resolve(__dirname, ".."));

describe("Express Template e2e Tests", function(){
    let test;
    before(async function(){
        test = new TestE2E(path.resolve(__dirname, ".."));
        await test.start("/hello-world");
    });

    it('Should respond with Hello World', async function(){
        const root = await test.page.$("body");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "Hello World");
    });

    after(async function(){
        await test.stop();
    });
});
