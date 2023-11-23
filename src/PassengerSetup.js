import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// This is a component for each passenger item
const PassengerItem = ({ name, onboard, onPress }) => {
  return (
    <TouchableOpacity style={onboard ? styles.onboard : styles.notOnboard} onPress={onPress}>
      <Text style={styles.passengerName}>{name}</Text>
      <Text>{onboard ? 'Onboard' : 'Not Onboard'}</Text>
      <Text>{onboard ? 'Press to stop' : 'Press to start'}</Text>
    </TouchableOpacity>
  );
};

// Main component for the Passenger Setup screen
const PassengerSetup = () => {
  // Example data, this would come from your app's state
  const passengers = [
    { name: 'Ron', onboard: true },
    { name: 'Iven', onboard: false },
    // Add more passengers here
  ];

  const handlePress = (name) => {
    // Logic to handle press here
    console.log(`${name} pressed`);
  };

  return (
    <View style={styles.container}>
      {passengers.map((passenger) => (
        <PassengerItem
          key={passenger.name}
          name={passenger.name}
          onboard={passenger.onboard}
          onPress={() => handlePress(passenger.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  passengerName: {
    fontWeight: 'bold',
  },
  onboard: {
    backgroundColor: 'lightgreen',
    padding: 20,
    marginBottom: 10,
  },
  notOnboard: {
    backgroundColor: 'orange',
    padding: 20,
    marginBottom: 10,
  },
  // Add more styles here
});

export default PassengerSetup;
