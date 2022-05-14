export const curry = fn => {
    const curried = (...args) => args.length != fn.length
        ? curried.bind(null, ...args)
        : fn(...args)
    return curried
}

// Note: Allowing multiple arguments makes the function incompatible
// when used together with curry and functions that provide multiple
// values such as filter.
export const and = (...fns) => arg => fns.every(fn => fn(arg));
