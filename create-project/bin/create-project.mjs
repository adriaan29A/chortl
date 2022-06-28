#!/usr/bin/env node

import('esm');
console.log(process.argv);
import * as mod from '../src/cli.mjs';

console.log("what???");
mod.cli(process.argv);
console.log("yeah")
