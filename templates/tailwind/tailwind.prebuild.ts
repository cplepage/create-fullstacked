import {FullStackedConfig} from "fullstacked";
import {execSync} from "child_process";
import {defaultEsbuildConfig} from "fullstacked/scripts/utils";
import {buildSync} from "esbuild";
import * as path from "path";

export default function (config: FullStackedConfig, isWebApp) {
    if(!isWebApp) return;

    const buildConfig = defaultEsbuildConfig(path.resolve(__dirname, "tailwind.config.ts"))
    buildSync(buildConfig);

    const tailwindCommand = [
        "npx",
        "tailwind",
        `-i ${path.resolve(__dirname, "tailwind-base.css")}`,
        `-o ${path.resolve(config.public, "tailwind.css")}`,
        `-c ${buildConfig.outfile}`,
        `${config.production ? "--minify" : ""}`
    ]

    execSync(tailwindCommand.join(" "));
}
