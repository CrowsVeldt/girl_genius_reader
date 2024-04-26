import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
  } from '@react-navigation/drawer';
import { useContext } from 'react';
import { ComicContext } from '../context/ComicContext';
  
  export default function DrawerContent(props: any) {
    const {changeCurrentPage, getLatestPage} = useContext(ComicContext)
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
        label={"Latest"}
        onPress={() => {
            changeCurrentPage(getLatestPage())
            props.navigation.navigate("Home")
        }}
        />
      </DrawerContentScrollView>
    );
  }