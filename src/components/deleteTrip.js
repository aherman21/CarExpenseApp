import AsyncStorage from "@react-native-async-storage/async-storage";


const deleteTrip = async (date) => {
    try {
        //retrieving the current list of trips
        const existingTrips = JSON.parse(await AsyncStorage.getItem('trips')) || []
        // filter out the trip with the specified date
        const updatedTrips = existingTrips.filter((trip) => trip.date !== date)
        // save updated list back to asyncstorage
        await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips))
        return true
    } catch (error) {
        //handle errors
        console.error('Error deleting trip data', error)
        return false
    }   
}

export default deleteTrip