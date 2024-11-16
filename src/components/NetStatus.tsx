import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, Text, View } from "react-native";

export default function NetStatus(props: { style?: any }) {
  const { style: inheritedStyle } = props;
  const { isConnected } = useNetInfo();

  return (
    <View
      style={[
        inheritedStyle,
        styles.statusContainer,
        { display: isConnected ? "none" : "flex" },
      ]}
    >
      <Text>No Internet Connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {},
});
