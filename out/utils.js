export var curry = function curry(fn) {
  var curried = function curried() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.length < fn.length ? curried.bind.apply(curried, [null].concat(args)) : fn.apply(void 0, args);
  };

  return curried;
};
export var and = function and() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return fns.every(function (fn) {
      return fn.apply(void 0, args);
    });
  };
};