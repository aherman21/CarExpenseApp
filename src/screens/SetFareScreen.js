import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import { styles } from '../styles';

const SetFareScreen = ({ navigation, route }) => {
    const [fareAmount, setFareAmount] = useState(route.params?.fareAmount.toString());

    const handleFareChange = (text) => {
        if (text === '') {
            setFareAmount('');
        } else {
            const fare = parseFloat(text);
            if (!isNaN(fare)) {
                setFareAmount(text);
            }
        }
    };

    const saveFare = () => {
        const fareValue = parseFloat(fareAmount);
        if (fareValue <= 0) {
            alert('Money per second must be greater than 0');
            return;
        }
        Keyboard.dismiss();
        navigation.navigate('Home', { fare: fareValue });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={fareAmount}
                    onChangeText={handleFareChange}
                    placeholder="Enter Money/second"
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity onPress={saveFare} style={styles.addButton}>
                <Text style={styles.addButtonText}>Set Fare</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SetFareScreen;
