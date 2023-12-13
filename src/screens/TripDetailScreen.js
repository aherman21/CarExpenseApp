import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";



const TripDetailScreen = ({ route, navigation }) => {
    const { passengers } = route.params;

    function forwardTrip(passengers) {
      console.log('forwarding passengers:', passengers)
      navigation.navigate('Home', { passengers: passengers })
  }
    
    return (
        <View style={styles.container}>
        {/* Render passenger details */}
        {passengers.map((passenger, index) => (
          <View key={index} style={styles.passengerItem}>
            <Text style={styles.passengerName}>Name: {passenger.name}</Text>
            <Text style={styles.passengerInfo}>
              Time Elapsed: {passenger.timeElapsed}
            </Text>
            <Text style={styles.passengerInfo}>
              Money Owed: {passenger.moneySpent.toFixed(2)} €
            </Text>
          </View>
        ))}
        <TouchableOpacity style={styles.tripItem} onPress={() => forwardTrip(passengers)}>
              <Text style={styles.passengerName}>Set these Passengers to your next trip</Text>
        </TouchableOpacity>
      </View>
    );
  };



export default TripDetailScreen