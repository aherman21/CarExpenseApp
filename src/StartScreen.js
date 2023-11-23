import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// StartScreen with a navigation button to SettleUp and PassengerSetup
const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettleUp')}>
        <Image source={require('path-to-dollar-icon')} style={styles.icon} />
      </TouchableOpacity>
      {/* List of passengers */}
      {/* ... */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('PassengerSetup')}>
        <Text>Edit Passengers</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add styles for StartScreen, including button and icon styles
