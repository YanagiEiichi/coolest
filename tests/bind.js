const assert = require('assert');
const coolest = require('../coolest');

const f = coolest(function*() {
  return yield this.ok;
}, { ok: true });

const g = coolest(function*() {
  return yield this.ok;
});

const h = coolest(function*(a, b) {
  return yield a + b === this.c;
}, { c: 3 }, 1);

Promise.all([
  f.call({}),
  g.call({ ok: true }),
  h(2)
]).then(results => {
  results.forEach(assert);
  process.exit(0);
});

setTimeout(() => process.exit(1), 100);
