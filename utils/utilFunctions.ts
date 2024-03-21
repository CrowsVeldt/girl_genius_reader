export const lastElement: (array: any[]) => any = (array) => {
  if (array.length > 0) {
    let last = array[array.length - 1];
    while (last === null || last === undefined) {
      last = array[array.indexOf(last) - 1];
    }
    return last;
  }
};
