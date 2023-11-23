import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const initialPassengers = [
  { id: '1', name: 'Ron', onboard: true },
  { id: '2', name: 'Iven', onboard: false },
  { id: '3', name: 'Nori', onboard: false },
  { id: '4', name: 'Alexander', onboard: false },
];

const HomeScreen = ({ navigation }) => {
  const [passengers, setPassengers] = useState(initialPassengers);

  const handleButtonPress = (passenger) => {
    // Update the onboard status of the pressed passenger
    const updatedPassengers = passengers.map((p) => {
      if (p.id === passenger.id) {
        return { ...p, onboard: !p.onboard };
      }
      return p;
    });

    setPassengers(updatedPassengers);
  };

  const PassengerButton = ({ item }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: item.onboard ? '#32CD32' : '#FFA500' }]}
      onPress={() => handleButtonPress(item)}
    >
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.onboard ? 'Onboard' : 'Not Onboard'}</Text>
      <Text style={styles.text}>{item.onboard ? 'Press to stop' : 'Press to start'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.passengers}
        data={passengers}
        renderItem={PassengerButton}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit')}>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  editButton: {
    position: 'absolute',
    top: 40,
    right: 15,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  passengers: {
    top: 100,
  },
  button: {
    padding: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
