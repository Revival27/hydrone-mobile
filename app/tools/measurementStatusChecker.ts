const elementIsValid = (el): boolean => {
  if (el !== undefined && el !== null && el !== '') {
    return true;
  }
  return false;
};

export function measurementStatusChecker<T extends { [s: string]: unknown } | ArrayLike<unknown>>(...args: T[]) {
  return Object.values(args).every(value => elementIsValid(value));
}
