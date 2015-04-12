import {assert} from 'chai';
import fs from 'fs';
import {exec} from 'child_process';

describe('template', () => {

  afterEach((done) => {
    fs.unlink('test/output.html', ()=> {done()});
  });

  it('should interpolate using ${es6} syntax', (done) => {
    exec('bin/_template.js -f test/fixture.html -j package.json', function(err, stdout, stderr){
      assert.isTrue((/name: lodash-template-cli/).test(stdout));
      done();
    })
  })

  it('should output to --out file when provided', (done) => {
    exec('bin/_template.js -f test/fixture.html -j package.json -o test/output.html', function(err, stdout, stderr){
      fs.readFile('test/output.html', function(err, data){
        if(err) return done(err);

        assert.isTrue((/name: lodash-template-cli/).test(data));

        fs.unlink('test/output.html');
        done();
      })
    })
  })

  it('should allow a URL to --json', (done) => {

    exec('bin/_template.js -f test/fixture.html -j https://raw.githubusercontent.com/twalker/lodash-template-cli/master/package.json', function(err, stdout, stderr){
      if(err) done(err);

      assert.isTrue((/name: lodash-template-cli/).test(stdout));
      done();
    })
  })


})
