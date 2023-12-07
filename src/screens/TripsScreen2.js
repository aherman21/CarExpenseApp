import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Modal, Button} from 'react-native'
import ShowTrip from "../components/ShowTrip";
import loadTrips from "../components/LoadTrips";
import { styles } from "../styles";
import deleteTrip from "../components/deleteTrip";
import formatDate from "../components/nicelyFormattedDate";

const TripsScreen = () => {
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
        setSelectedTrip(trip)
        setModalVisible(true)
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
            <TouchableOpacity onPress={() => removeTrip(index)} style={styles.removeButton}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )

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
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default TripsScreen
