module.exports = (generator, ...binds) => {
  let result = function(...args) {
    return new Promise((resolve, reject) => {
      let iterator = generator.call(this, ...args);
      const errorHandler = error => {
        try {
          iterator.throw(error);
        } catch (error) {
          reject(error);
        }
      };
      void function callee(value) {
        for (;;) {
          try {
            let result = iterator.next(value);
            value = result.value;
            if (result.done) return resolve(value);
          } catch (error) {
            return errorHandler(error);
          }
          if (value && typeof value.then === 'function') {
            return value.then(callee, errorHandler);
          }
        }
      }();
    });
  };
  return binds.length ? result.bind(...binds) : result;
};
