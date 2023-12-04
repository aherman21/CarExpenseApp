import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

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
  const [passengers, setPassengers] = useState([]);
  const [newPassengerName, setNewPassengerName] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settleup')}>
          <Text style={styles.editButtonText}>Settle up</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      loadPassengers().then(loadedPassengers => {
        setPassengers(loadedPassengers);
      });
    }
  }, [isFocused]);

  const handleAddPress = () => {
    if (newPassengerName.trim()) {
      const newPassenger = { id: String(Date.now()), name: newPassengerName, onboard: false };
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
        return { ...p, onboard: !p.onboard };
      }
      return p;
    });

    setPassengers(updatedPassengers);
    savePassengers(updatedPassengers);
  };

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
      <FlatList
        data={passengers}
        ListHeaderComponent={<Text style={styles.listTitle}>Passengers</Text>}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: item.onboard ? '#32CD32' : '#ADD8E6' }]}
            onPress={() => handleButtonPress(item)}
          >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.onboard ? 'Onboard' : 'Not Onboard'}</Text>
            <Text style={styles.text}>{item.onboard ? 'Press to stop' : 'Press to start'}</Text>
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
    borderRadius: 15, // Rounded corners
    borderWidth: 1,
    borderColor: '#000', // Border color
    fontSize: 18,
    color: '#000', // Text color
  },
  addButton: {
    backgroundColor: '#78C5EF',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  innerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 8,
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
    fontSize: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#ddd',
  },
});



export default HomeScreen;
