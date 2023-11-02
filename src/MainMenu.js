import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native'
import { styles } from './styles'

const MainMenu = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headers}>Car Expenses</Text>
            </View>
            <Text>CarExpense App</Text>
            <Button
                title="View Expenses"
                onPress={() => navigation.navigate('Expenses')}
            />
            <Button
                title="Add Expense"
                onPress={() => navigation.navigate('AddExpense')}
            />
            <Button
                title = "Add Car"
                onPress={() => navigation.navigate('AddCar')}
            />
        </View>
    )
}

export default MainMenu