import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import { styles } from '../styles';
import { useFare } from '../context/fareContext';

const SetFareScreen = ({ navigation, route }) => {
    const { fare, setFare } = useFare()
    const [fareAmount, setFareAmount] = useState(fare);
    console.log(fareAmount)

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
        setFare(fareValue)
        navigation.navigate('Home', { fare: fareValue });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={fareAmount.toString()}
                    onChangeText={handleFareChange}
                    placeholder={fareAmount.toString()}
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
