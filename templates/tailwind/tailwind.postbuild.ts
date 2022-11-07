import {FullStackedConfig} from "fullstacked";
import {execSync} from "child_process";
import {defaultEsbuildConfig} from "fullstacked/scripts/utils";
import {buildSync} from "esbuild";
import * as path from "path";

export default function (config: FullStackedConfig) {
    const buildConfig = defaultEsbuildConfig(path.resolve(__dirname, "tailwind.config.ts"))
    buildSync(buildConfig);
    execSync(`npx tailwind -i ${path.resolve(config.src, "webapp", "index.css")} -o ${path.resolve(config.public, "index.css")}  -c ${buildConfig.outfile}`);
}
