#!/usr/bin/env node
import fs from "fs";
import {execSync} from "child_process";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const testMode = process.argv.includes("--test");

let outDir = process.cwd();
process.argv.forEach(arg => {
    if(arg.startsWith("--outDir="))
        outDir = resolve(process.cwd(), arg.substring("--outDir=".length));
});

if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});

const templatesBasePath = resolve(__dirname, "templates");
const availableTemplates = fs.readdirSync(templatesBasePath);
const templatesToSetup = process.argv.filter(template => availableTemplates.includes(template));

if(templatesToSetup.length){
    console.log('\x1b[33m%s\x1b[0m', "Setting you up with...");
    templatesToSetup.forEach(template => console.log(template));
}

const neededDependencies = new Set();
const ignoredPackages = new Set();
const nativePackages = {};

const addTemplate = (template: string, directories: string[] = []) => {
    const templatePath = resolve(templatesBasePath, template);
    const basePath = resolve(templatePath, ...directories);
    const content = fs.readdirSync(basePath);
    content.forEach(item => {
        const itemPath = resolve(basePath, item)

        if(item === "dependencies.json"){
            const dependencies = JSON.parse(fs.readFileSync(itemPath, {encoding: "utf-8"}));

            if(dependencies.install){
                Object.keys(dependencies.install).forEach(dependency => neededDependencies.add(dependency + "@" + dependencies.install[dependency]));
            }

            if(dependencies.ignore){
                dependencies.ignore.forEach(packageName => ignoredPackages.add(packageName));
            }

            if(dependencies.native){
                Object.keys(dependencies.native).forEach(dependency => nativePackages[dependency] = dependencies.native[dependency]);
            }

            return;
        }


        const isDir = fs.lstatSync(itemPath).isDirectory();

        const fixedPath = itemPath.replace(templatePath, outDir) ;

        if(!isDir) return fs.copyFileSync(itemPath, fixedPath);

        if(!fs.existsSync(fixedPath)) fs.mkdirSync(fixedPath);
        addTemplate(templatePath, [...directories, item]);
    });
}
templatesToSetup.forEach(template => addTemplate(template));

if(!testMode)
    execSync("npm init --y", {stdio: "ignore", cwd: outDir});

let fullstackedTag = "latest";
process.argv.forEach(arg => {
    if(arg.startsWith("--tag=")) fullstackedTag = arg.slice("--tag=".length);
});

console.log('\x1b[32m%s\x1b[0m', `Installing FullStacked ${fullstackedTag === "latest" ? "" : (fullstackedTag + " ")}${neededDependencies.size ? "with " : ""}` +
    Array.from(neededDependencies).join(", "));

let fullstackedPackage = `fullstacked@${fullstackedTag} `;
if(testMode){
    fullstackedPackage = "";
    const localFiles = fs.readdirSync(__dirname);
    localFiles.forEach(file => {
        if(!file.startsWith("fullstacked") || !file.endsWith(".tgz")) return;

        console.log(`Installing local FullStacked Version [${file}]`);
        execSync(`npm i ${file}`, {stdio: "inherit"});
    });
}
let installCommand = "npm i " + (testMode ? "--no-save " : "") + fullstackedPackage + Array.from(neededDependencies).join(" ") + " " +
    Object.keys(nativePackages).map(dependency => dependency + "@" + nativePackages[dependency]).join(" ");

if(testMode) console.log(installCommand);

execSync(installCommand, {stdio: "inherit", cwd: testMode ? process.cwd() : outDir});
if(ignoredPackages.size) fs.writeFileSync(resolve(outDir, "ignore.json"), JSON.stringify({ignore: Array.from(ignoredPackages)}, null, 4));
if(Object.keys(nativePackages).length) fs.writeFileSync(resolve(outDir, "server", "native.json"), JSON.stringify(nativePackages, null, 4));

const patchPackageJSON = () => {
    console.log('\x1b[33m%s\x1b[0m', "Patching package.json");
    const packageJSONFilePath = resolve(outDir, "package.json");
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONFilePath, {encoding: "utf-8"}));
    packageJSON.scripts = {
        start: "npx fullstacked watch",
        test : "npx fullstacked test"
    }
    packageJSON.version = "0.0.0";
    packageJSON.type = "module";
    fs.writeFileSync(packageJSONFilePath, JSON.stringify(packageJSON, null, 2));
}

if(!testMode) patchPackageJSON();

console.log('\x1b[32m%s\x1b[0m', "You are ready!");
console.log('\x1b[33m%s\x1b[0m', "Run :", "npm start");
