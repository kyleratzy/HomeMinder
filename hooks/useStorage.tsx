import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage(key: string) {
  const getItem = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  };

  const setItem = async (value: any[]) => {
    try {
      const serialized_value = JSON.stringify(value);
      await AsyncStorage.setItem(key, serialized_value);
    } catch (e) {
      return null;
    }
  };

  return [getItem, setItem];
}
