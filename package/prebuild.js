import { createRequire } from 'module';
import fs from "node:fs";
import path from "node:path"
import { fileURLToPath } from 'url';


const require = createRequire(import.meta.url);

const json = require("modernizr/lib/config-all.json");

const file = `// Generated automatically by prebuild.ts\n\nexport const options = ${JSON.stringify(json.options)} as const;\nexport const featureDetects = ${JSON.stringify(json["feature-detects"])} as const;\n`;
const destination = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src/config-types.ts");
console.log("Generating integration configuration types...");

fs.writeFileSync(destination, file, {
    encoding: "utf-8",
});