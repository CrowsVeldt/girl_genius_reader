export type ComicDataType = {
  volumeStart: string;
  volumeNumber: number;
  pages: PageType[];
};

export type PageType = {
  date: string;
  title: string;
  pageNumber: number;
  volumeNumber: number;
};
