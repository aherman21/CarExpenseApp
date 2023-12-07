import AsyncStorage from "@react-native-async-storage/async-storage";

//function to load trips from asyncstorage
const loadTrips = async () => {
    try {
        const tripsData = await AsyncStorage.getItem('trips')
        return tripsData ? JSON.parse(tripsData) : []
    } catch (error) {
        console.error('Error loading trips', error)
    }
}

export default loadTrips