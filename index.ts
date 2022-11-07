#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

const testMode = process.argv.includes("--test");

let outDir = process.cwd();
process.argv.forEach(arg => {
    if(arg.startsWith("--outDir="))
        outDir = path.resolve(process.cwd(), arg.substring("--outDir=".length));
});

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});

const templatesBasePath = path.resolve(__dirname, "templates");
const availableTemplates = fs.readdirSync(templatesBasePath);
const templatesToSetup = process.argv.filter(template => availableTemplates.includes(template));

console.log('\x1b[33m%s\x1b[0m', "Setting you up with...");
if(!templatesToSetup.length) console.log("default")
else templatesToSetup.forEach(template => console.log(template));

const neededDependencies = [];

const addTemplate = (template: string, directories: string[] = []) => {
    const templatePath = path.resolve(templatesBasePath, template);
    const basePath = path.resolve(templatePath, ...directories);
    const content = fs.readdirSync(basePath);
    content.forEach(item => {
        const itemPath = path.resolve(basePath, item)

        if(item === "dependencies.json"){
            const dependencies = JSON.parse(fs.readFileSync(itemPath, {encoding: "utf-8"}));
            Object.keys(dependencies).forEach(dependency =>
                neededDependencies.push(dependency + "@" + dependencies[dependency]));
            return;
        }


        const isDir = fs.lstatSync(itemPath).isDirectory();

        const fixedPath = itemPath.replace(templatePath, outDir) ;

        if(!isDir) return fs.copyFileSync(itemPath, fixedPath);

        if(!fs.existsSync(fixedPath)) fs.mkdirSync(fixedPath);
        addTemplate(templatePath, [...directories, item]);
    });
}

addTemplate("default");
templatesToSetup.forEach(template => addTemplate(template));

const childProcess = require("child_process");
if(!testMode)
    childProcess.execSync("npm init --y", {stdio: "ignore", cwd: outDir});

let fullstackedTag = "latest";
process.argv.forEach(arg => {
    if(arg.startsWith("--tag=")) fullstackedTag = arg.slice("--tag=".length);
});

console.log('\x1b[32m%s\x1b[0m', `Installing FullStacked ${fullstackedTag === "latest" ? "" : (fullstackedTag + " ")}${neededDependencies.length ? "with " : ""}` + neededDependencies.join(", "));

const fullstackedPackage = testMode ? "" : `fullstacked@${fullstackedTag} `;
let installCommand = "npm i " + (testMode ? "--no-save " : "") + fullstackedPackage + neededDependencies.join(" ");

if(testMode) console.log(installCommand);
childProcess.execSync(installCommand, {stdio: "inherit", cwd: testMode ? process.cwd() : outDir});

const patchPackageJSON = () => {
    console.log('\x1b[33m%s\x1b[0m', "Patching package.json");
    const packageJSONFilePath = path.resolve(outDir, "package.json");
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONFilePath, {encoding: "utf-8"}));
    packageJSON.scripts = {
        start: "npx fullstacked watch",
        test : "npx fullstacked test"
    }
    packageJSON.version = "0.0.0";
    fs.writeFileSync(packageJSONFilePath, JSON.stringify(packageJSON, null, 2));
}

if(!testMode) patchPackageJSON();

console.log('\x1b[32m%s\x1b[0m', "You are ready!");
console.log('\x1b[33m%s\x1b[0m', "Run :", "npm start");

