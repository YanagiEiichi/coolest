const assert = require('assert');
const coolest = require('../coolest');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const f = coolest(function*() {
  setTimeout(() => value = 2);
  setTimeout(() => value = 3, 60);
  let value = 1;
  yield sleep(50);
  assert.equal(value, 2);
  yield sleep(50);
  assert.equal(value, 3);
  process.exit(0);
});

f();

setTimeout(() => process.exit(1), 200);
