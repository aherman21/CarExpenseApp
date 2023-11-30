import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettleupScreen = () => {
  const [passengers, setPassengers] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [newTotalMoney, setNewTotalMoney] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const passengersData = await AsyncStorage.getItem('passengers');
        setPassengers(passengersData ? JSON.parse(passengersData) : []);

        const storedTotalMoney = await AsyncStorage.getItem('totalMoney');
        if (storedTotalMoney) {
          setTotalMoney(parseFloat(storedTotalMoney));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPassengers((currentPassengers) => {
        const totalOnboardTime = currentPassengers
          .filter((p) => p.onboard && p.startTime)
          .reduce((acc, p) => acc + (new Date().getTime() - p.startTime) / 1000, 0);

        return currentPassengers.map((p) => {
          if (p.onboard && p.startTime) {
            const elapsedTime = new Date().getTime() - p.startTime;
            const moneyToSpend = (elapsedTime / 1000) * (totalMoney / totalOnboardTime);
            return { ...p, elapsedTime, moneyToSpend };
          }
          return p;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalMoney]);

  const handleInputChange = (text) => {
    setNewTotalMoney(text);
  };

  const handleUpdateTotalMoney = async () => {
    const newMoney = parseFloat(newTotalMoney);
    setTotalMoney(newMoney);
    try {
      await AsyncStorage.setItem('totalMoney', newMoney.toString());
    } catch (error) {
      console.error('Error saving total money:', error);
    }
  };

  const handleButtonPress = (id) => {
    const updatedPassengers = passengers.map((p) => {
      if (p.id === id) {
        const onboardStatus = !p.onboard;
        const startTime = onboardStatus ? new Date().getTime() : null;
        return { ...p, onboard: onboardStatus, startTime: startTime, elapsedTime: 0 };
      }
      return p;
    });
    setPassengers(updatedPassengers);
    AsyncStorage.setItem('passengers', JSON.stringify(updatedPassengers));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalMoneyText}>Total Money: ${totalMoney.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new total money"
        value={newTotalMoney}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <Button title="Update Total Money" onPress={handleUpdateTotalMoney} />
      {passengers.map((passenger) => (
        <TouchableOpacity
          key={passenger.id}
          style={[styles.button, { backgroundColor: passenger.onboard ? '#32CD32' : '#FFA500' }]}
          onPress={() => handleButtonPress(passenger.id)}
        >
          <Text style={styles.text}>{passenger.name}</Text>
          <Text style={styles.text}>
            {passenger.onboard
              ? `Onboard: ${passenger.elapsedTime / 1000} s, Money to Spend: $${passenger.moneyToSpend?.toFixed(2) || 'N/A'}`
              : 'Not Onboard'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 18,
    marginBottom: 10,
  },
  totalMoneyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default SettleupScreen;
