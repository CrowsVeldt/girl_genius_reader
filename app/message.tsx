import { composeAsync } from "expo-mail-composer";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import NetStatus from "../src/components/NetStatus";

export default function MessageScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  return (
    <SafeAreaView style={styles.screen}>
      <NetStatus />
      <View>
        <View style={styles.dropdownContainer}>
          <Text>Subject:</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedTopic}
            onValueChange={(value, index) => setSelectedTopic(value)}
          >
            <Picker.Item label="Bug Report" value={"Bug Report"} />
            <Picker.Item label="Feature Request" value={"Feature Request"} />
            <Picker.Item label="Other" value={"Other"} />
          </Picker>
        </View>
        <TextInput
          style={styles.textInput}
          editable
          multiline
          numberOfLines={4}
          placeholder="Write your message here"
          value={inputText}
          onChangeText={(input) => setInputText(input)}
        />
        <Button
          title="Send"
          disabled={inputText === ""}
          onPress={async () => {
            const result = await composeAsync({
              body: inputText,
              subject: selectedTopic,
              recipients: ["johnzmith370@gmail.com"],
            });
            if (result.status === "sent") {
              // Will only wait for actual result on IOS, Android always returns "sent"
              setInputText("");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    textAlignVertical: "top",
  },
  dropdown: {
    width: "80%",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
