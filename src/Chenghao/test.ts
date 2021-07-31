import * as fs from "fs";

import { parse } from "./parse";
import { generate } from "./generate";

const model = parse(fs.readFileSync(__dirname + "/basic_store.mdx").buffer)
model.Info.Name = "";
const buf = generate(model);
console.info(buf);
fs.writeFileSync(__dirname + "/genStore.mdx", new DataView(buf))
