const assert = require('assert');
const coolest = require('../coolest');

const MAX = 1E4;

const f = coolest(function*() {
  let startAt = Date.now();
  let answer = Promise.resolve('ok');
  for (let i = 0; i < MAX; i++) yield answer;
  return Date.now() - startAt;
});

const g = coolest(function*() {
  let startAt = Date.now();
  let answer = 'ok';
  for (let i = 0; i < MAX; i++) yield answer;
  return Date.now() - startAt;
});

Promise.all([ f(), g() ]).then(([ f, g ]) => {
  assert(f > g); 
  process.exit(0);
});

setTimeout(() => process.exit(1), 500);
