import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

const loadPassengers = async () => {
  try {
    const passengersData = await AsyncStorage.getItem('passengers');
    return passengersData !== null ? JSON.parse(passengersData) : [];
  } catch (error) {
    console.error('Error loading passengers:', error);
  }
};

const savePassengers = async (passengers) => {
  try {
    await AsyncStorage.setItem('passengers', JSON.stringify(passengers));
  } catch (error) {
    console.error('Error saving passengers:', error);
  }
};

const HomeScreen = () => {
  var [passengers, setPassengers] = useState([]);
  const [newPassengerName, setNewPassengerName] = useState('');
  const [totalMoney, setTotalMoney] = useState(100);
  const [moneyInput, setMoneyInput] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Trips', { passengers: passengers })}>
          <Text style={styles.editButtonText}>Trips</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, passengers]);

  useEffect(() => {
    if (isFocused) {
      loadPassengers().then(loadedPassengers => {
        setPassengers(loadedPassengers);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (route.params?.passengersFromTrip) {
      const newPassengers = route.params.passengersFromTrip;
      const passengerNames = newPassengers.map(p => p.name).join(', ');
      const passengerDetails = JSON.stringify(newPassengers, null, 2); // Convert object to a formatted string
  
      Alert.alert(
        "Passengers from Trip",
        `Names: ${passengerNames}\nDetails: ${passengerDetails}`, // Display names and details
        [{ text: "OK", onPress: () => console.log('OK Pressed') }]
      );
  
      setPassengers([...newPassengers]);
      savePassengers([...newPassengers]);
    }
  }, [route.params?.passengersFromTrip]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPassengers((currentPassengers) => {
        return currentPassengers.map((p) => {
          const elapsedTime = p.onboard ? (new Date().getTime() - p.startTime) : p.pausedTime;
          const moneyToSpend = (elapsedTime / 1000) * (totalMoney / totalOnboardTime(currentPassengers));
          return { ...p, elapsedTime, moneyToSpend };
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [totalMoney, passengers]);

  const totalOnboardTime = (passengers) => {
    return passengers.reduce((acc, p) => {
      const time = p.onboard ? (new Date().getTime() - p.startTime) : p.pausedTime;
      return acc + time / 1000;
    }, 0);
  };

  const handleAddPress = () => {
    if (newPassengerName.trim()) {
      const newPassenger = {
        id: String(Date.now()),
        name: newPassengerName,
        onboard: false,
        startTime: new Date().getTime(),
        pausedTime: 0
      };
      const updatedPassengers = [...passengers, newPassenger];
      setPassengers(updatedPassengers);
      setNewPassengerName('');
      savePassengers(updatedPassengers);
    }
  };

  const handleRemovePress = (id) => {
    const updatedPassengers = passengers.filter(p => p.id !== id);
    setPassengers(updatedPassengers);
    savePassengers(updatedPassengers);
  };

  const handleButtonPress = (passenger) => {
    const updatedPassengers = passengers.map(p => {
      if (p.id === passenger.id) {
        if (!p.onboard) {
          const newStartTime = p.pausedTime ? p.startTime : new Date().getTime();
          return { ...p, onboard: true, startTime: newStartTime };
        } else {
          const pausedTime = (new Date().getTime() - p.startTime) + (p.pausedTime || 0);
          return { ...p, onboard: false, pausedTime };
        }
      }
      return p;
    });

    setPassengers(updatedPassengers);
    savePassengers(updatedPassengers);
  };

  const handleUpdateTotalMoney = () => {
    const newTotalMoney = parseFloat(moneyInput);
    if (!isNaN(newTotalMoney) && newTotalMoney > 0) {
      setTotalMoney(newTotalMoney);
      setMoneyInput('');
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number for total money.");
    }
  };

  const formatTimeElapsed = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 20,
    },
    input: {
      flex: 1,
      marginRight: 10,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#000',
      fontSize: 18,
    },
    addButton: {
      backgroundColor: '#0000FF',
      borderRadius: 20,
      padding: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 24,
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
    innerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    removeButton: {
      backgroundColor: 'red',
      borderRadius: 10,
      padding: 5,
      alignSelf: 'flex-end',
    },
    removeButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    editButtonText: {
      color: '#000',
      marginRight: 10,
      fontWeight: 'bold',
    },
    listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
      backgroundColor: '#ddd',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setNewPassengerName}
          value={newPassengerName}
          placeholder="Add new passenger"
        />
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMoneyInput}
          value={moneyInput}
          placeholder="Set Total Money"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleUpdateTotalMoney} style={styles.addButton}>
          <Text style={styles.addButtonText}>Set</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={passengers}
        ListHeaderComponent={<Text style={styles.listTitle}>Passengers</Text>}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: item.onboard ? '#32CD32' : '#FFA500' }]}
            onPress={() => handleButtonPress(item)}
          >
            <Text style={styles.text}>{item.name}   </Text>
            <Text style={styles.text}>
              Status: {item.onboard ? 'Onboard' : 'Paused'}
            </Text>
            <Text style={styles.text}>
              Time Elapsed: {formatTimeElapsed(item.pausedTime + (item.onboard ? (new Date().getTime() - item.startTime) : 0))}
            </Text>
            <Text style={styles.text}>
              Money Spent: ${item.moneyToSpend ? item.moneyToSpend.toFixed(2) : '0.00'}
            </Text>
            <View style={styles.innerButtonContainer}>
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => handleRemovePress(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
