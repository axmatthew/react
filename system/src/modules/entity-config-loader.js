// Get the value from a value or function
export function getFromValOrFunc(valOrFunc, ...args) {
  let value = valOrFunc;

  if (typeof valOrFunc === 'function') {
    value = valOrFunc(...args);
  }

  return value;
}
