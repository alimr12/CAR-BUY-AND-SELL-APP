 import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@cars_list';

export const loadCars = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load cars', e);
    return [];
  }
};

export const saveCars = async (cars) => {
  try {
    const jsonValue = JSON.stringify(cars);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save cars', e);
  }
};
