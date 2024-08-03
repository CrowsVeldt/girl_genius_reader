import { ContextType, useContext, useEffect } from "react";
import { ComicContext } from "../../context/ComicContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PreloadOption() {
  const {
    getPreloadPolicy
  }: ContextType<typeof ComicContext> = useContext(ComicContext);

  useEffect(() => {}, []);

  return (
    <View>
        <Pressable>
            <Text>{getPreloadPolicy()}</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  starButton: {
    height: 40,
    width: 40,
    marginRight: 10,
  }
});
