import {describe, it, before, after} from "mocha";
import Helper from "fullstacked/tests/e2e/Helper";
import {ok} from "assert";
import * as path from "path";

describe("WordPress Template Tests", function(){
    let test;
    before(async function(){
        test = new Helper(path.resolve(__dirname, ".."));
        await test.start();
    });

    it('Should get wordpress license', async function(){
        await test.page.goto(`http://wp.localhost:${test.runner.nodePort}/license.txt`);
        const root = await test.page.$("pre");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        ok(value.startsWith("WordPress - Web publishing software"));
    });

    after(async function(){
        await test.stop();
    });
});
