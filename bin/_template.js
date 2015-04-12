#!/usr/bin/env node
var program = require('commander'),
    Promise = require('promise'),
    template = require('lodash.template'),
    pkg = require('../package.json'),
    fs = require('fs'),
    read = Promise.denodeify(fs.readFile),
    get = Promise.denodeify(require('request').get);

program
  .version(pkg.version)
  .option('-j, --json [file|url]', 'JSON file or URL')
  .option('-o, --out [file]', 'Output file')
  .parse(process.argv);

if(!program.args || !program.json) program.help();
program.file = program.args[0];

// Support output to stdout or file
var ws = (program.out) ? fs.createWriteStream(program.out) : process.stdout;

// promise json from a file path or a url to json
function getJSON(pathOrUrl){
  var p = /^http/.test(pathOrUrl)
      ? get(program.json).then(function(res){return res.body;})
      : read(pathOrUrl);

  return p.then(JSON.parse)
}

Promise
  .all([read(program.file), getJSON(program.json)])
  .then(function(results){
    return template(results[0])(results[1]);
  })
  .then(function(html){
    ws.write(html);
    process.exit(0);
  })
  .catch(function(err){
    process.stderr.write(err.stack + '\n')
    process.exit(1);
  });
