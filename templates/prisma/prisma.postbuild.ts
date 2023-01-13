import {FullStackedConfig} from "fullstacked";
import * as fs from "fs";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import {execSync} from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function (config: FullStackedConfig){
    fs.readdirSync(resolve(__dirname, "prisma")).forEach(item => {
        fs.cpSync(resolve(__dirname, "prisma", item), resolve(config.out, item), {recursive: true});
    });
}
