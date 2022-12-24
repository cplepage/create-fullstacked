import * as path from "path";
import * as fs from "fs";
import {execSync} from "child_process";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const templatePath = path.resolve(__dirname, "templates");
let templates = fs.readdirSync(templatePath);

const templateTestDefined = templates.some(template => process.argv.includes(template));
if(templateTestDefined) templates = templates.filter(template => process.argv.includes(template));

for (const template of templates){
    fs.rmSync(path.resolve(__dirname, "test"), {force: true, recursive: true});
    console.log(`Testing ${template} template`);
    execSync(`node index --test --outDir=test ${template}`, {stdio: process.argv.includes("--debug") ? "inherit" : "ignore"});
    execSync(`npx fullstacked test ${process.argv.includes("--debug") ? "" : "--headless"} --src=test`, {stdio: "inherit"});
}

fs.rmSync(path.resolve(__dirname, "test"), {force: true, recursive: true});
