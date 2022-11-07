import {describe, it, before, after} from "mocha";
import Helper from "fullstacked/tests/e2e/Helper";
import {equal} from "assert";
import * as path from "path";

describe("React Template Tests", function(){
    let test;
    before(async function(){
        test = new Helper(path.resolve(__dirname, ".."));
        await test.start();
    });

    it('Should get the react template quote', async function(){
        const root = await test.page.$("p");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "You are using the React template");
    });

    after(function(){
        test.stop();
    });
});
