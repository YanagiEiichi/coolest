const assert = require('assert');
const coolest = require('../coolest');

const f = coolest(function*() {
  let p = 0;
  try {
    yield Promise.reject('ok');
    throw 'hehe';
  } catch (result) {
    assert.equal(result, 'ok');
    p++; 
  }
  try {
    yield Promise.reject('ok');
    throw 'hehe';
  } catch (result) {
    assert.equal(yield 1, 1);
    p++; 
  }
  try {
    throw 'ok';
  } catch (result) {
    assert.equal(result, 'ok');
    p++; 
  }
  throw p;
});

f().catch(result => {
  assert.equal(result, 3);
  process.exit(0);
});

setTimeout(() => process.exit(1), 100);
