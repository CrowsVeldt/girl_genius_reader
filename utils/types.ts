export type ComicDataType = {
  volumeStart: string;
  volumeNumber: number;
  pages: PageType[];
};

export type PageType = {
  date: string;
  title: string;
  pageNumber: number;
  volume: number;
};

export type CollectedVolumeType = [
  volumesList: ComicDataType[],
  pages: PageType[]
];
