export default defineNuxtPlugin((useNuxtApp) => {
  function isArrayEmpty(items) {
    if (typeof items === 'object') {
      // Fastest way to check if an object is empty according to https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
      // eslint-disable-next-line no-restricted-syntax
      for (const prop in items) {
        // eslint-disable-next-line no-prototype-builtins
        if (items.hasOwnProperty(prop)) { return false; }
      }

      return true;
    }
    return !items || !items.length;
  }

  return {
    provide: {
      isArrayEmpty,
    },
  };
});
