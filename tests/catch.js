const assert = require('assert');
const coolest = require('../coolest');

const f = coolest(function*() {
  try {
    yield Promise.reject('ok');
  } catch (result) {
    assert.equal(result, 'ok');
  }
  try {
    throw 'ok';
  } catch (result) {
    assert.equal(result, 'ok');
  }
  throw true;
});

f().catch(result => {
  assert(result);
  process.exit(0);
});

setTimeout(() => process.exit(1), 100);
