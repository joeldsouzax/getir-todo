/**
 * defied functional flows
 *
 * @format
 * @author: Joel D'Souza
 */

/** @format */
// identity function interface
type IFunction<T> = (x: T) => any;

// void function interface
type VFunction<T> = (x: T) => void;

interface Functor<T> {
  map<Q>(transform: (value: T) => Q): Functor<Q>;
  fold<Q>(transform: (value: T) => Q): Q;
  chain<Q>(transform: (value: T) => Q): Q;
}

interface Monad<T> {
  bind<Q>(transform: (value: T) => Monad<Q>): Monad<Q>;
}

interface LazyFunctor<T> {
  map<Q>(transform: (value: T) => Q): LazyFunctor<Q>;
  fold<Q>(transform: (value: T) => Q): Q;
}

export const lazyFunctor = <T>(g: () => T) => ({
  map<Q>(transform: (g: T) => Q): LazyFunctor<Q> {
    return lazyFunctor(() => transform(g()));
  },
  fold<Q>(transform: (g: T) => Q): Q {
    return transform(g());
  },
});

export const functor = <T>(value: T) => ({
  map<Q>(transform: (value: T) => Q): Functor<Q> {
    return functor(transform(value));
  },
  chain<Q>(transform: (value: T) => Q): Q {
    return transform(value);
  },
  fold<Q>(transform: (value: T) => Q): Q {
    return transform(value);
  },
});

export const monad = <T>(value: T) => ({
  bind<Q>(transform: (value: T) => Monad<Q>): Monad<Q> {
    return transform(value);
  },
});

export function task<T>(x: T) {
  return {
    map: (f: IFunction<T>) => task(f(x)),
    fold: (f: IFunction<T>) => f(x),
    chain: (f: IFunction<T>) => f(x),
  };
}

export function composerRight<T>(x: T) {
  return {
    map: (f: IFunction<T>) => composerRight(f(x)),
    fold: (f: IFunction<T>, g: IFunction<T>) => g(x),
    chain: (f: IFunction<T>) => f(x),
  };
}

export function composerLeft<T>(x: T) {
  return {
    map: (f: IFunction<T>) => composerLeft(x),
    chain: (f: IFunction<T>) => composerLeft(x),
    fold: (f: IFunction<T>, g: IFunction<T>) => f(x),
  };
}

/**
 * checks whether the value is null and changes the flow.
 * @param x any nullable value
 */
export const fromNullable = <T>(x: T) => {
  return x != null ? composerRight(x) : composerLeft(x);
};

/**
 * either function for error handling
 * @param f function that requires try catch
 */
export function tryCatch<T>(f: () => T) {
  try {
    return composerRight<T>(f());
  } catch (err) {
    return composerLeft<T>(err);
  }
}
