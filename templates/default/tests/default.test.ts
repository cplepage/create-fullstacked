import {describe, it, before, after} from "mocha";
import {equal} from "assert";
import * as path from "path";
import TestE2E from "fullstacked/utils/testE2E.js";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("Default Template Tests", function(){
    let test;
    before(async function(){
        test = new TestE2E(path.resolve(__dirname, ".."));
        await test.start();
    });

    it('Should display main title', async function(){
        const root = await test.page.$("h1");
        const innerHTML = await root.getProperty('innerHTML');
        const value = await innerHTML.jsonValue();
        equal(value, "Welcome to FullStacked!");
    });

    after(async function(){
        await test.stop();
    });
});
