export type DateAndTitleType = {
  date: string;
  title: string;
};

export type PageType = {
  date: string;
  title: string;
  pageNumber: number;
  volumeNumber: number;
};

export type TriplePageType = [PageType, PageType, PageType];

export type VolumeType = {
  volumeStart: string;
  volumeNumber: number;
  pages: PageType[];
};

export type ListCollectionType = {
  pageList: PageType[];
  volumeList: VolumeType[];
};

export type SideType = "left" | "right";

export type PreloadPolicyType = "wifi" | "never" | "always";

export type ScrollDirectionType = "horizontal" | "vertical";
