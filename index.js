#!/usr/bin/env node
const childProcess = require("child_process");
childProcess.execSync("npm init --y", {stdio: "ignore"});
console.log('\x1b[32m%s\x1b[0m', "Installing Latest FullStacked");

let installCommand = "npm i fullstacked";

process.argv.forEach(arg => {
    if(arg.startsWith("--tag=")) {
        const tag = arg.slice("--tag=".length);
        installCommand += "@" + tag;
        console.log("Installing tag " + tag);
    }
})

childProcess.execSync(installCommand, {stdio: "inherit"});

console.log('\x1b[33m%s\x1b[0m', "Setting you up...");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const packageJSONFilePath = path.resolve(process.cwd(), "package.json");
const packageJSON = JSON.parse(fs.readFileSync(packageJSONFilePath, {encoding: "utf-8"}));
packageJSON.scripts = {
    start: "npx fullstacked watch",
    test : "npx fullstacked test"
}
packageJSON.version = "0.0.0";
fs.writeFileSync(packageJSONFilePath, JSON.stringify(packageJSON, null, 2));
fse.copySync(path.resolve(__dirname, "starter"), process.cwd(), {});

const defaultValues = {
    icons: [],
    name: packageJSON.name,
    short_name: packageJSON.name,
    display: "standalone",
    start_url: "/",
    description: "",
    background_color: "#FFF",
    theme_color: "#FFF"
}
fs.writeFileSync(path.resolve(__dirname, "webapp", "manifest.json"), JSON.stringify(defaultValues, null, 2));

console.log('\x1b[32m%s\x1b[0m', "You are ready!");
console.log('\x1b[33m%s\x1b[0m', "Run :", "npm start");

