import { useContext } from "react";
import { Text, View } from "react-native";
import { ComicContext } from "../context/ComicContext";

export default function VolumeSubMenu () {
    const {getVolumes} = useContext(ComicContext)
    const volumes = getVolumes()
    console.log(volumes)
    return(
        <View>
            {volumes && volumes.map((item, index) => <Text>{`Volume ${item.volumeNumber}`}</Text>)}
        </View>
    )

}