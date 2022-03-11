export function isUnique<Item>(item: Item, index: number, array: Item[]) {
  return array.indexOf(item) === index;
}

export function findLastIndex<Item>(array: Item[], predicate: (item: Item) => boolean) {
  let result = -1;

  for (let i = array.length - 1; i >= 0; --i) {
    if (predicate(array[i])) {
      result = i;
      break;
    }
  }

  return result;
}
