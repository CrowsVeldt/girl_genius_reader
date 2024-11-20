import Toast from "react-native-root-toast";

export const showToast = (message: string, options?: object) => {
    let toast = Toast.show(message, {...options, duration: Toast.durations.SHORT})
}