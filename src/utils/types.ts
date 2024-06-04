export type PageType = {
  date: string;
  title: string;
  pageNumber: number;
  volumeNumber: number;
};

export type DateAndTitleType = {
  date: string;
  title: string;
};

export type VolumeType = {
  volumeStart: string;
  volumeNumber: number;
  pages: PageType[];
};

export type ListCollectionType =
  | {
      pageList: PageType[];
      volumeList: VolumeType[];
    }
  | undefined;
