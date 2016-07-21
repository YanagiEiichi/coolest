const assert = require('assert');
const coolest = require('../coolest');

const test = coolest(function*(arg) {
  assert.equal(yield arg, 123);
  assert.equal(yield Promise.resolve(123), 123);
  try {
    yield Promise.reject(123);
  } catch (error) {
    assert.equal(error, 123);
  }
  return 123;
});

test(123).then(result => {
  assert.equal(result, 123);
});
