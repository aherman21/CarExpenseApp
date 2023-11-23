import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';

// Mock data
let nextId = 5;

const EditScreen = () => {
  const [passengers, setPassengers] = useState([
    { id: '1', name: 'Ron', onboard: true },
    { id: '2', name: 'Iven', onboard: true },
    { id: '3', name: 'Nori', onboard: true },
    { id: '4', name: 'Alexander', onboard: true },
  ]);
  const [newPassengerName, setNewPassengerName] = useState('');

  const handleAddPress = () => {
    if (newPassengerName.trim()) {
      const newPassenger = {
        id: String(nextId++), // This is a simple auto-increment for example purposes
        name: newPassengerName,
        onboard: false,
      };
      setPassengers([...passengers, newPassenger]);
      setNewPassengerName('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Passenger Setup</Text>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.passengerItem, { borderColor: item.onboard ? '#32CD32' : '#FFA500' }]}>
            <Text style={styles.passengerName}>{item.name}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>✏️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
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
  passengerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#0000FF',
    borderRadius: 20,
    padding: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditScreen;
