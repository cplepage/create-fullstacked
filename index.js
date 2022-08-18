#!/usr/bin/env node
require("child_process").execSync("npm init -y", {stdio: "inherit"});
require("child_process").execSync("npm i fullstacked", {stdio: "inherit"});
require("child_process").execSync("npx fullstacked create", {stdio: "inherit"});

