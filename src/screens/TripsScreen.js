import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Button, Alert} from 'react-native'
import loadTrips from "../components/LoadTrips";
import { styles } from "../styles";
import deleteTrip from "../components/DeleteTrip";
import formatDate from "../components/NicelyFormattedDate"
 

const TripsScreen = ({ navigation }) => {
    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState(null)
    console.log('trips:', trips)


    const fetchTrips = async () => {
        const loadedTrips = await loadTrips()
        setTrips(loadedTrips)
    }
    
    useEffect(() => {
        fetchTrips()
    }, [])

    const openTripDetails = (trip) => {
        navigation.navigate('TripDetails', { passengers: trip.passengers })
    }

    const closeTripDetails = () => {
        setModalVisible(false)
    }

    const renderTripItem = ({ item, index }) => (
        <View style={styles.tripItem}>
          <TouchableOpacity
            onPress={() => openTripDetails(item)}
          >
            <Text style={styles.tripText}>Date: {formatDate(item.date)}</Text>
          </TouchableOpacity>
      
          <TouchableOpacity
            onPress={() => showDeleteConfirmation(index)}
            style={styles.removeButton}
          >
            <Text style = {styles.removeButtonText}>Delete</Text>
          </TouchableOpacity>

        </View>
      );
      
      const showDeleteConfirmation = (index) => {
        Alert.alert(
          'Delete Trip',
          'Are you sure you want to delete this trip?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => removeTrip(index) },
          ],
          { cancelable: true }
        );
      };
      

    const removeTrip = async (index) => {
        console.log('index:', index)
        const success = await deleteTrip(trips[index].date)
        if (success) {
            await fetchTrips()
            console.log('success deleting trip')
            const updatedTrips = trips.filter((trip) => trip.date !== trips[index].date)
            setTrips([...updatedTrips])
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={trips}
                renderItem={renderTripItem}
                keyExtractor={(item) => item.date}
                extraData={trips}
            />
        </View>
    )
}

export default TripsScreen
