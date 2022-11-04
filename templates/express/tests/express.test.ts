import {describe, it, before, after} from "mocha";
import HelperIntegration from "fullstacked/tests/integration/Helper"
import Helper from "fullstacked/tests/e2e/Helper"
import {equal} from "assert";
import {fetch} from "fullstacked/webapp/fetch";
import * as path from "path";
import server from "../server/index";

HelperIntegration(describe("Express Template Integration Tests", function() {
    before(async function (){
        server.start({silent: true, testing: true})
    });

    it("Should hit /hello-world endpoint", async () => {
        equal(await fetch.get("http://localhost/hello-world"), "Hello World");
    });

    after(async function(){
        server.stop();
    });
}), path.resolve(__dirname, ".."));

describe("Express Template e2e Tests", function(){
    let test;
    before(async function(){
        test = new Helper(path.resolve(__dirname, ".."));
        await test.start("/hello-world");
    });

    it('Should respond with Hello World', async function(){
        const root = await test.page.$("body");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "Hello World");
    });

    after(function(){
        test.stop();
    });
});
