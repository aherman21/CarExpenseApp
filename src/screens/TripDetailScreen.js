import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";


const TripDetailScreen = ({ route }) => {
    const { passengers } = route.params;
    
    return (
        <View style={styles.container}>
        {/* Render passenger details */}
        {passengers.map((passenger, index) => (
            <View key={index} style={styles.passengerItem}>
                <Text>Name: {passenger.name}</Text>
                <Text>Time Elapsed: {passenger.timeElapsed}</Text>
                <Text>Money Owed: {passenger.moneySpent.toFixed(2)} €</Text>
            </View>
        ))}
        </View>
    );
    }


export default TripDetailScreen