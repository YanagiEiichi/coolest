module.exports = (generator, ...binds) => {
  let result = function(...args) {
    return new Promise((resolve, reject) => {
      let iterator = generator.call(this, ...args);
      void function callee(value, isError) {
        for (;;) {
          try {
            let result = isError ? iterator.throw(value) : iterator.next(value);
            isError = false;
            value = result.value;
            if (result.done) return resolve(value);
          } catch (error) {
            return reject(error);
          }
          if (value && typeof value.then === 'function') {
            return value.then(callee, error => {
              callee(error, true);
            });
          }
        }
      }();
    });
  };
  return binds.length ? result.bind(...binds) : result;
};
