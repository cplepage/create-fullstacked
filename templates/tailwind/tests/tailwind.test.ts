import {describe, it, before, after} from "mocha";
import Helper from "fullstacked/tests/e2e/Helper";
import {equal, ok} from "assert";
import * as path from "path";
import sleep from "fullstacked/scripts/sleep";

describe("Tailwind Template Tests", function(){
    let test;
    before(async function(){
        test = new Helper(path.resolve(__dirname, ".."));
        await test.start();
    });

    it('Should have class in .css file from .html class attribute', async function(){
        const body = await test.page.$("body");
        const classesProperties = await body.getProperty('className');
        const classes = (await classesProperties.jsonValue()).split(" ");

        await test.goto("/tailwind.css");
        const root = await test.page.$("pre");
        const innerHTML = await root.getProperty('innerHTML');
        const css = await innerHTML.jsonValue();


        for (let i = 0; i < classes.length; i++) {
            ok(css.includes("." + classes[i]))
        }
    });

    after(async function(){
        await test.stop();
    });
});
