const assert = require('assert');
const coolest = require('../coolest');

const f = coolest(function*() {
  assert.equal(yield 'ok', 'ok');
  assert.equal(yield Promise.resolve('ok'), 'ok');
  return true;
});

f().then(result => {
  assert(result);
  process.exit(0);
});

setTimeout(() => process.exit(1), 100);
