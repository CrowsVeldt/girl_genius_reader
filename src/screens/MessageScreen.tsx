import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NetStatus from "../components/NetStatus";
import { useState } from "react";

const sendMail = () => {
  // fill in stuff here
};

export default function MessageScreen() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [text, setText] = useState<string>("");
  return (
    <View style={styles.screen}>
      <NetStatus />
      <View style={styles.formContainer}>
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
          value={text}
          onChangeText={(input) => setText(input)}
        />
        <Button title="Send" onPress={() => sendMail()} />
      </View>
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
  formContainer: {

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
    alignItems: "center",
  },
});
