export const curry = fn => {
  const curried = (...args) => args.length < fn.length ? curried.bind(null, ...args) : fn(...args);

  return curried;
};
export const and = (...fns) => (...args) => fns.every(fn => fn(...args));