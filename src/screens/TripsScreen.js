import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Modal, Button, Alert} from 'react-native'
import ShowTrip from "../components/ShowTrip";
import loadTrips from "../components/LoadTrips";
import { styles } from "../styles";
import deleteTrip from "../components/DeleteTrip";
import formatDate from "..components/NicelyFormattedDate"

const TripsScreen = ({ navigation }) => {
    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
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
            <Text>Delete</Text>
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
        {/*modal to show single trips details*/}
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeTripDetails}
            >
                <View style={styles.modalView}>
                    {selectedTrip && <ShowTrip passengers={selectedTrip.passengers} />}
                    <TouchableOpacity onPress={closeTripDetails} style={styles.closeButton}>
                        <Text  style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default TripsScreen
