import { ItemData, ItemPriority } from '../types';

const makeSortItemsByPriority = (priorities: ItemPriority[]) => (a: ItemData, b: ItemData) => {
  const indexA = priorities.indexOf(a.priority);
  const indexB = priorities.indexOf(b.priority);

  switch (true) {
    case indexA < indexB:
      return 1;
    case indexA > indexB:
      return -1;
    default:
      return 0;
  }
}

export default makeSortItemsByPriority;