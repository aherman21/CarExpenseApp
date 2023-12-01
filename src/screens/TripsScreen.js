import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadTrips = async () => {
  try {
    const tripsData = await AsyncStorage.getItem('trips');
    return tripsData !== null ? JSON.parse(tripsData) : [];
  } catch (error) {
    console.error('Error loading trips:', error);
    return [];
  }
};

const saveTrips = async (trips) => {
  try {
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Error saving trips:', error);
  }
};

const TripsScreen = ({ route, navigation }) => {
  const [trips, setTrips] = useState([]);
  const passengersFromHome = route.params?.passengers || [];

  useEffect(() => {
    loadTrips().then(setTrips);
  }, []);

  const handleSaveNewTrip = async () => {
    const newTrip = {
      date: new Date().toISOString(),
      passengers: passengersFromHome
    };
    const updatedTrips = [...trips, newTrip];
    await saveTrips(updatedTrips);
    setTrips(updatedTrips);
  };

  const handleDeleteTrip = async (tripIndex) => {
    const updatedTrips = [...trips];
    updatedTrips.splice(tripIndex, 1); // Remove the trip at tripIndex
    await saveTrips(updatedTrips);
    setTrips(updatedTrips);
  };

  const handleTripSelect = (passengers) => {
    navigation.navigate('Home', { passengersFromTrip: passengers });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSaveNewTrip} style={styles.saveTripButton}>
        <Text style={styles.saveTripButtonText}>Save New Trip</Text>
      </TouchableOpacity>

      <SectionList
        sections={trips.map((trip, index) => ({
          title: `Trip on ${new Date(trip.date).toLocaleDateString()}`,
          data: trip.passengers,
          index,
        }))}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.passengerItem}>
            <Text style={styles.passengerName}>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderContainer}>
            <TouchableOpacity onPress={() => handleTripSelect(section.data)}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTrip(section.index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  saveTripButton: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveTripButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  passengerItem: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  passengerName: {
    fontSize: 16,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#aaa',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default TripsScreen;
