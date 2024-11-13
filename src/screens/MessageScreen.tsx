import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NetStatus from "../components/NetStatus";
import { useState } from "react";

const sendMail = () => {};

export default function MessageScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [text, setText] = useState<string>("Write your message here");
  return (
    <View style={styles.screen}>
      <NetStatus />
      <Text>Send a message to the developer</Text>
      <Text>Subject:</Text>
      <Picker
        selectedValue={selectedTopic}
        onValueChange={(value, index) => setSelectedTopic(value)}
      >
        <Picker.Item label="Bug Report" value={"bug"} />
        <Picker.Item label="Feature Request" value={"feature"} />
        <Picker.Item label="Other" value={"other"} />
      </Picker>
      <Text>Message:</Text>
      <TextInput
        editable
        multiline
        value={text}
        onChangeText={(input) => setText(input)}
      />
      <Button title="Send" onPress={() => sendMail()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
