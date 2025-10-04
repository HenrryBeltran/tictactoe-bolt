export function arrayIntersection<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  const intersected: Array<T> = [];
  const arr1Len = arr1.length;
  const arr2Len = arr2.length;

  for (let i = 0; i < arr1Len; i++) {
    for (let j = 0; j < arr2Len; j++) {
      if (arr1[i] === arr2[j]) {
        intersected.push(arr2[j]);
      }
    }
  }

  return intersected;
}
