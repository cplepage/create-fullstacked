#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

let outDir = process.cwd();
process.argv.forEach(arg => {
    if(arg.startsWith("--outDir="))
        outDir = path.resolve(process.cwd(), arg.substring("--outDir=".length));
});

if(!fs.existsSync(outDir))
    fs.mkdirSync(outDir, {recursive: true});

const childProcess = require("child_process");
childProcess.execSync("npm init --y", {stdio: "ignore", cwd: outDir});
console.log('\x1b[32m%s\x1b[0m', "Installing Latest FullStacked");

let installCommand = "npm i fullstacked";

process.argv.forEach(arg => {
    if(arg.startsWith("--tag=")) {
        const tag = arg.slice("--tag=".length);
        installCommand += "@" + tag;
        console.log("Installing tag " + tag);
    }
});

childProcess.execSync(installCommand, {stdio: "inherit", cwd: outDir});

const availableTemplates = fs.readdirSync(path.resolve(__dirname, "templates"));
const templatesToSetup = process.argv.filter(template => availableTemplates.includes(template));

console.log('\x1b[33m%s\x1b[0m', "Setting you up with...");
if(!templatesToSetup.length) console.log("default")
else templatesToSetup.forEach(template => console.log(template));



console.log('\x1b[33m%s\x1b[0m', "Patching package.json");
const packageJSONFilePath = path.resolve(outDir, "package.json");
const packageJSON = JSON.parse(fs.readFileSync(packageJSONFilePath, {encoding: "utf-8"}));
packageJSON.scripts = {
    start: "npx fullstacked watch",
    test : "npx fullstacked test"
}
packageJSON.version = "0.0.0";
fs.writeFileSync(packageJSONFilePath, JSON.stringify(packageJSON, null, 2));

console.log('\x1b[32m%s\x1b[0m', "You are ready!");
console.log('\x1b[33m%s\x1b[0m', "Run :", "npm start");

