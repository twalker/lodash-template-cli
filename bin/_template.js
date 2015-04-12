#!/usr/bin/env node
var program = require('commander'),
    Promise = require('promise'),
    template = require('lodash.template'),
    pkg = require('../package.json'),
    fs = require('fs'),
    read = Promise.denodeify(fs.readFile),
    get = Promise.denodeify(require('request').get);

//console.log('req', get)
//http://jsonip.com
program
  .version(pkg.version)
  .option('-f, --file [file]', 'Template file')
  .option('-j, --json [file|url]', 'JSON file or URL')
  .option('-o, --out [file]', 'Output file')
  .parse(process.argv);

if(!program.file) program.file = program.args[0];
if(!program.file || !program.json) program.help();

// Support output to stdout or file
var ws = (program.out) ? fs.createWriteStream(program.out) : process.stdout;

function getData(pathOrUrl){
  var isUrl = /^http/.test(pathOrUrl);
  if(isUrl){
    return get(program.json).then(function(res){
      return res.body;
    })
  } else {
    return read(pathOrUrl);
  }
}

Promise
  .all([read(program.file), getData(program.json)])
  .then(function(results){
    return template(results[0])(JSON.parse(results[1]));
  })
  .then(function(html){
    ws.write(html);
    process.exit(0);
  })
  .catch(function(err){
    process.stderr.write(err.stack + '\n')
    process.exit(err.errno);
  });
