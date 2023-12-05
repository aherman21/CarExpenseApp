import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles'
import getTotalMoneySpent from '../components/GetTotalMoneySpent';

const MainScreen = () => {
  const [passengerName, setPassengerName] = useState('');
  const [passengers, setPassengers] = useState([]);

  const addPassenger = () => {
    if (passengerName.trim() === '') {
        // Provide feedback to the user. For example, you can use an alert:
        alert('Please enter a passenger name.');
        return; // Exit the function if the name is not provided
    }
    const newPassenger = {
      name: passengerName,
      onboard: false,
      timeElapsed: 0,
      moneySpent: 0,
      timerId: null
    };
    setPassengers([...passengers, newPassenger]);
    setPassengerName('');
  };

  const toggleOnboard = (index) => {
    const updatedPassengers = [...passengers];
    const passenger = updatedPassengers[index];
    passenger.onboard = passenger.onboard;
    if (!passenger.onboard) {
      // Start timer and money increment here
      passenger.onboard = true
      passenger.timerId = setInterval(() => {
        passenger.timeElapsed++
        passenger.moneySpent += 0.05
        setPassengers([...updatedPassengers])
      }, 1000)
    } else {
      // Pause timer and money increment here
      clearInterval(passenger.timerId)
      passenger.onboard = false
      passenger.timerId = null
    }
    setPassengers(updatedPassengers);
  };

  const renderPassenger = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => toggleOnboard(index)}
      style={ [styles.passengerButton, { backgroundColor: item.onboard ? 'green' : 'white' }]}>
        <View style={styles.rowContainer}>
            <View style={styles.leftText}>
                <Text>{item.name}</Text>
                <Text>{item.onboard ? 'onboard' : 'not onboard'}</Text>
            </View>
            <View style={styles.rightText}>
                <Text>Time: {item.timeElapsed}</Text>
                <Text>Money owed: {item.moneySpent.toFixed(2)}</Text>
            </View>
      
      
      </View>
    </TouchableOpacity>
  );

  const getTotalMoneySpent = () => {
    return passengers.reduce((total, passenger) => total + passenger.moneySpent, 0)
}



  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
            value={passengerName}
            onChangeText={setPassengerName}
            placeholder="Enter Passenger Name"
        />
        </View>
      
      <Button title="Add Passenger" onPress={addPassenger} style={styles.addButton} />
      <Text style={styles.listTitle}>Total Money for current trip: {getTotalMoneySpent().toFixed(2)}</Text>
      <FlatList
        data={passengers}
        ListHeaderComponent={<Text style={styles.listTitle}>Passengers</Text>}
        renderItem={renderPassenger}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MainScreen;
