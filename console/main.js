const { program } = require('commander');
var words = require('an-array-of-english-words')

program
  .description('A sample application to parse options')
  .option('-a, --alpha', 'Alpha')
    .option('-b, --beta <VALUE>', 'Specify a VALUE', 'Foo');

program.parse();

const options = program.opts();
console.log('Options detected:');

console.log(typeof options);

if (options.alpha) console.log(' * alpha');
const beta = !options.beta ? 'no' : options.beta;
console.log(' * beta is: %s', beta);


console.log(words.filter(d => /hell/.test(d)))
