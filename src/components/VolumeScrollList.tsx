import React from "react";
import { Dimensions, ScaledSize } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PageType } from "../utils/types";
import VolumeScrollImage from "./VolumeScrollImage";

const window: ScaledSize = Dimensions.get("window");

const VolumeScreenList = React.memo(
  (props: { pages: PageType[]; navigation: any }) => {
    return (
      <FlatList
        data={props.pages}
        renderItem={({ item, index }: { item: PageType; index: number }) => (
          <VolumeScrollImage
            page={item}
            navigation={props.navigation}
            key={index}
          />
        )}
        getItemLayout={(data, index) => ({
          length: window.height - 220,
          offset: (window.height - 220) * index,
          index,
        })}
        initialNumToRender={5}
      />
    );
  }
);

export default VolumeScreenList;
