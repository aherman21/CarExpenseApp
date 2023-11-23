import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SectionList,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadPassengers = async () => {
  try {
    const passengersData = await AsyncStorage.getItem('passengers');
    return passengersData !== null ? JSON.parse(passengersData) : [];
  } catch (error) {
    console.error('Error loading passengers:', error);
    return [];
  }
};

const savePassengers = async (passengers) => {
  try {
    await AsyncStorage.setItem('passengers', JSON.stringify(passengers));
  } catch (error) {
    console.error('Error saving passengers:', error);
  }
};

const SettleupScreen = () => {
  const [passengers, setPassengers] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [newTotalMoney, setNewTotalMoney] = useState('');

  useEffect(() => {
    // Load passengers and total money when the component mounts
    loadPassengers().then((loadedPassengers) => {
      setPassengers(loadedPassengers);
    });

    // Load the total money from AsyncStorage when the component mounts
    const loadTotalMoney = async () => {
      try {
        const storedTotalMoney = await AsyncStorage.getItem('totalMoney');
        if (storedTotalMoney !== null) {
          setTotalMoney(parseFloat(storedTotalMoney));
        }
      } catch (error) {
        console.error('Error loading total money:', error);
      }
    };

    loadTotalMoney();

    // Cleanup function for the first useEffect
    return () => {
      // You can perform cleanup here if needed
    };
  }, []); // Empty dependency array means this effect runs only once

  useEffect(() => {
    // Update passenger allocated money based on onboard time
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

    // Cleanup function for the second useEffect
    return () => {
      clearInterval(interval);
    };
  }, [passengers, totalMoney]); // Include passengers and totalMoney in the dependency array

  const handleRemovePress = (id) => {
    const updatedPassengers = passengers.filter((p) => p.id !== id);
    setPassengers(updatedPassengers);
    savePassengers(updatedPassengers);
  };

  const handleButtonPress = (item) => {
    const updatedPassengers = passengers.map((p) => {
      if (p.id === item.id) {
        if (p.onboard) {
          return {
            ...p,
            onboard: false,
            elapsedTime: new Date().getTime() - p.startTime,
            startTime: null,
            moneyToSpend: 0,
          };
        } else {
          return { ...p, onboard: true, startTime: new Date().getTime(), elapsedTime: 0 };
        }
      }
      return p;
    });
    setPassengers(updatedPassengers);
    savePassengers(updatedPassengers);
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.totalMoneyText}>Total Money: ${totalMoney}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new total money"
        onChangeText={handleInputChange}
        value={newTotalMoney}
        keyboardType="numeric"
      />
      <Button title="Update Total Money" onPress={handleUpdateTotalMoney} />
      <SectionList
        sections={[
          { title: 'Passengers', data: passengers },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: item.onboard ? '#32CD32' : '#FFA500' }]}
            onPress={() => handleButtonPress(item)}
          >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>
              {item.onboard
                ? `Onboard: ${item.elapsedTime / 1000} s, Money to Spend: $${item.moneyToSpend?.toFixed(2) || 'N/A'}`
                : 'Not Onboard'}
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
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
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
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#ddd',
    padding: 10,
  },
});

export default SettleupScreen;
