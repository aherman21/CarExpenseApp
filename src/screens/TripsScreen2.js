import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Modal, Button} from 'react-native'
import ShowTrip from "../components/ShowTrip";
import loadTrips from "../components/LoadTrips";
import { styles } from "../styles";
import clearTrips from "../components/clearTrips";

const TripsScreen = () => {
    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const fetchTrips = async () => {
            const loadedTrips = await loadTrips()
            setTrips(loadedTrips)
        }

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
                <Text style={styles.tripText}>Date: {item.date}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTrip(index)} style={styles.removeButton}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )

    const deleteTrip = async (index) => {
        const newTrips = [...trips]
        newTrips.splice(index, 1)
        setTrips(newTrips)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={trips}
                renderItem={renderTripItem}
                keyExtractor={(item, index) => index.toString()}
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
