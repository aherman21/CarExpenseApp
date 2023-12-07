import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

const ShowTrip = ({ passengers }) => {
    console.log('passengerss:', passengers)
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Trip Details</Text>
          {/* Render passenger details */}
          {passengers.map((passenger, index) => (
            <View key={index} style={styles.passengerItem}>
              <Text>Name: {passenger.name}</Text>
              <Text>Time Elapsed: {passenger.timeElapsed}</Text>
              <Text>Money Owed: {passenger.moneySpent.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      );
}

export default ShowTrip