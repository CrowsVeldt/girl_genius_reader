export const lastElement: (array: any[]) => any = (array) => {
  try {
    if (array.length > 0) {
      let last: any = array[array.length - 1];
      while (last == null) {
        last = array[array.indexOf(last) - 1];
      }
      return last;
    }
  } catch (error) {
    console.error(error);
  }
};

export const formatDate: (date: string) => string = (date) =>
  `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`;

export const stringOfEightNumbers: (str: string) => boolean = (str) => {
  const dateRegex: RegExp = new RegExp(/\d{8}/);
  return dateRegex.test(str);
};

export const comicUrl: (date: string) => string = (date) =>
  `https://www.girlgeniusonline.com/ggmain/strips/ggmain${date}.jpg`;
