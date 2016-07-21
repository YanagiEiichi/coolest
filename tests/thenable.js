const assert = require('assert');
const coolest = require('../coolest');

const f = coolest(function*() {
  assert.equal(yield { then: done => done('ok') }, 'ok');
  process.exit(0);
});

f();

setTimeout(() => process.exit(1), 100);
