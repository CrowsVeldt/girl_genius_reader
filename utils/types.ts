export type ComicDataType = {
  volumeStart: string;
  volumeNumber: number;
  pages: {
    date: string;
    title: string;
    pageNumber: number;
  }[];
};
