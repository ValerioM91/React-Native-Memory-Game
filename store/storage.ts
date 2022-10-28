import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRecords } from "../types";

export const setStorageData = async (value: TRecords) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("Records", jsonValue);
  } catch (e) {
    //
  }
};

export const getStorageData = async () => {
  try {
    const value = await AsyncStorage.getItem("Records");
    if (value !== null) {
      const data = JSON.parse(value);
      return data as TRecords;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const deleteStorageData = async () => {
  try {
    await AsyncStorage.removeItem("Records");
  } catch (e) {
    //
  }
};
