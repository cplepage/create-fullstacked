import {describe, it, before, after} from "mocha";
import Helper from "fullstacked/tests/e2e/Helper";
import {equal} from "assert";
import * as path from "path";

describe("e2e tests", function(){
    let test;
    before(async function(){
        test = new Helper(path.resolve(__dirname, ".."));
        await test.start();
    });

    it('Should display main title', async function(){
        const root = await test.page.$("h1");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "Welcome to FullStacked!");
    });

    after(function(){
        test.stop();
    });
});
