export const lastElement: (array: any[]) => any = (array) => {
  if (array.length > 0) {
    let last = array[array.length - 1];
    while (last === null || last === undefined) {
      last = array[array.indexOf(last) - 1];
    }
    return last;
  }
};

export const formatDate: (date: string) => string = (date) =>
  `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`;
