import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const EditScreen = () => {
  const [passengers, setPassengers] = useState([]);
  const [newPassengerName, setNewPassengerName] = useState('');

  useEffect(() => {
    loadPassengers().then(loadedPassengers => {
      setPassengers(loadedPassengers);
    });
  }, []);

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

  const handleButtonPress = (item) => {
    const updatedPassengers = passengers.map(p => 
      p.id === item.id ? { ...p, onboard: !p.onboard } : p
    );
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
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#ddd',
    padding: 10,
  },
});

export default EditScreen;
