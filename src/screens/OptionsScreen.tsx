import { Dimensions, ScaledSize, StyleSheet, Text, View } from "react-native";
import NetStatus from "../components/NetStatus";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Options({ navigation }: { navigation: any }) {
  return (
      <NetStatus />
  );
}