import ass from "@react-native-async-storage/async-storage";

export const saveData: (key: string, value: any) => void = async (
  key,
  value
) => {
  try {
    if (key != null && value != null) {
      await ass.setItem(key, JSON.stringify(value));
    } else {
      console.log("You tried to save an undefined value, dude");
    }
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};

export const retrieveData: (key: string) => Promise<any> = async (key) => {
  try {
    const data: any = await ass.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.warn("error retrieving data");
    console.warn(error);
  }
};

export const removeData: (key: string) => void = (key) => {
  ass.removeItem(key);
};
