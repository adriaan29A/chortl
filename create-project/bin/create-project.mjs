#!/usr/bin/env node

import('esm');
console.log(process.argv);
import * as mod from '../src/cli.mjs';

console.log('-->calling dwordl');
mod.dowordl(process.argv);
console.log('<--called dowordl')
