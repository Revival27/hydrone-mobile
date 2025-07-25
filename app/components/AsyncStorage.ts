import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveState = async state => {
  try {
    const serializedState: string = JSON.stringify(state);
    await AsyncStorage.setItem('state', serializedState);
  } catch (error) {}
};
