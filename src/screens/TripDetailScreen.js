import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { getTotalMoneySpent } from "../components/GetTotalMoneySpent";

const TripDetailScreen = ({ route, navigation }) => {
    const { passengers } = route.params;

    function forwardTrip(passengers) {
      console.log('forwarding passengers:', passengers)
      navigation.navigate('Home', { passengers: passengers })
    }

    const getTotalMoneySpent = () => {
      return passengers.reduce((total, passenger) => total + passenger.moneySpent, 0)
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
        <Text style={styles.listTitle}>Total Money Spent: {getTotalMoneySpent().toFixed(2)} €</Text>
        {/* Button to forward passengers to next trip */}
        <TouchableOpacity style={styles.tripItem} onPress={() => forwardTrip(passengers)}>
              <Text style={styles.passengerName}>Set these Passengers to your next trip</Text>
        </TouchableOpacity>
      </View>
    );
  };



export default TripDetailScreen