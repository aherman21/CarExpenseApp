import AsyncStorage from "@react-native-async-storage/async-storage";

const saveTripData = async (tripData) => {
    try {
        //retrieving the current list of trips
        const existingTrips = JSON.parse(await AsyncStorage.getItem('trips')) || []
        // add new trip to list
        const updatedTrips = [...existingTrips, tripData]
        // save updted list back to asyncstorage
        await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips))
    } catch (error) {
        //handle errors
        console.error('Error saving trip data', error)
    }
}

export default saveTripData