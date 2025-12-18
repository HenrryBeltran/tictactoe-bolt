export function arrayIntersection<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  const intersected: Array<T> = [];
  const arr1Len = arr1.length;
  const arr2Len = arr2.length;

  for (let i = 0; i < arr1Len; i++) {
    for (let j = 0; j < arr2Len; j++) {
      if (arr1[i] === arr2[j]) {
        const item = arr2[j];
        if (item !== undefined) {
          intersected.push(item);
        }
      }
    }
  }

  return intersected;
}

export function localState<T>(key: string, defaultValue: T) {
  const localValue = localStorage.getItem(key);
  if (localValue === null) {
    localStorage.setItem(key, String(defaultValue));
  }

  return {
    get: () => (localStorage.getItem(key) as T | null) ?? defaultValue,
    set: (value: T) => localStorage.setItem(key, String(value)),
  };
}
