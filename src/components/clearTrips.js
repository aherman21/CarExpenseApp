import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to clear AsyncStorage
const clearTrips = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Storage successfully cleared!');
  } catch (e) {
    console.error('Failed to clear the async storage.', e);
  }
};

export default clearTrips