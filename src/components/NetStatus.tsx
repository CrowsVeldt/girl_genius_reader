import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, Text, View } from "react-native";

export default function NetStatus() {
  const { isConnected } = useNetInfo();

  return (
    <View style={styles.statusContainer}>
      {isConnected && <Text style={styles.status}>No Internet Connection</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  status: {},
});
