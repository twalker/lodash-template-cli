#!/usr/bin/env node
var program = require('commander'),
    Promise = require('promise'),
    template = require('lodash.template'),
    pkg = require('../package.json'),
    fs = require('fs'),
    read = Promise.denodeify(fs.readFile);

program
  .version(pkg.version)
  .option('-f, --file [path]', 'Template file')
  .option('-j, --json [path]', 'JSON file', {})
  .option('-o, --out [path]', 'Output file')
  .parse(process.argv);

if(!program.file) program.file = program.args[0];

if(!program.file || !program.json) program.help();

// Support output to stdout or file
var ws = (program.out) ? fs.createWriteStream(program.out) : process.stdout;

Promise
  .all([read(program.file), read(program.json)])
  .then(function(files){
    return template(files[0])(JSON.parse(files[1]));
  })
  .then(function(html){
    ws.write(html);
    process.exit(0);
  })
  .catch(function(err){
    process.stderr.write(err.stack + '\n')
    process.exit(err.errno);
  });
