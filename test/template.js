import {assert} from 'chai';
import fs from 'fs';
import {exec} from 'child_process';

describe('template', () => {

  afterEach((done) => {
    fs.unlink('test/output.html', ()=> {done()});
  });

  it('should interpolate using ${es6} syntax', (done) => {
    exec('bin/_template.js -f test/fixture.html -j test/fixture.json', function(err, stdout, stderr){
      assert.isTrue((/version: 1/).test(stdout));
      done();
    })
  })

  it('should output to --out file when provided', (done) => {
    exec('bin/_template.js -f test/fixture.html -j test/fixture.json -o test/output.html', function(err, stdout, stderr){
      fs.readFile('test/output.html', function(err, data){
        if(err) done(err);

        assert.isTrue((/version: 1/).test(data));

        fs.unlink('test/output.html');
        done();
      })
    })
  })

})
