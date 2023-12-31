
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Alert, Image, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../styles'
import ShowTrip from '../components/ShowTrip';
import saveTripData from '../components/SaveTripData';
import { useFare, FareContext } from '../context/fareContext';


const MainScreen = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [passengerName, setPassengerName] = useState('');
    const [passengers, setPassengers] = useState([]);
    const { fare } = useFare()

  // this is for getting passengers from TripDetailScreen
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.passengers) {
        const newPassengers = route.params.passengers.map(passenger => ({
          //resetting all the data for the passengers
          ...passenger,
          onboard: false,
          timerId: null,
          moneySpent: 0,
          timeElapsed: 0
        }))
        setPassengers(newPassengers)
        // Reset the params after reading them
        navigation.setParams({ passengers: undefined })
      }
    }, [route.params?.passengers])
  )
  // getting money per second from SetFareScreen
  useFocusEffect(
    React.useCallback(() => {
        if (route.params?.fare) {
            // set passengers offboard
            const updatedPassengers = passengers.map(passenger => ({
                ...passenger,
                onboard: false,
                timerId: passenger.onboard ? clearInterval(passenger.timerId) : passenger.timerId
            }))
            setPassengers(updatedPassengers)
            // Reset the param to avoid re-setting on re-focus
            navigation.setParams({ fare: undefined });
        }
    }, [route.params?.fare])
  )

  //add passenger to flatlist
  const addPassenger = () => {
    if (passengers.length >= 5) {
        alert('Maximum number of passengers reached. Cannot add more.')
        return
    }
    if (passengerName.trim() === '') {
        // Provide feedback to the user. For example, you can use an alert:
        alert('Please enter a passenger name.');
        return; // Exit the function if the name is not provided
    
  }
  

    let wasRideStopped = false

    const updatedPassengers = passengers.map(passenger => {
        if (passenger.onboard) {
            clearInterval(passenger.timerId)
            wasRideStopped = true
            return { ...passenger, onboard: false, timerId: null }
        }
        return passenger
    })

    if (wasRideStopped) {
        alert('Ride was stopped for passenger ' + passengerName)
    }

    const newPassenger = {
      name: passengerName,
      onboard: false,
      timeElapsed: 0,
      moneySpent: 0,
      timerId: null
    };
    setPassengers([...updatedPassengers, newPassenger]);
    setPassengerName('');
  };
  
  const toggleOnboard = (index) => {
    const updatedPassengers = [...passengers];
    const passenger = updatedPassengers[index];
    passenger.onboard = passenger.onboard;
    if (!passenger.onboard) {
      // Start timer and money increment here
      passenger.onboard = true
      passenger.timerId = setInterval(() => {
        passenger.timeElapsed++
        passenger.moneySpent += parseFloat(fare)
        setPassengers([...updatedPassengers])
      }, 1000)
    } else {
      // Pause timer and money increment here
      clearInterval(passenger.timerId)
      passenger.onboard = false
      passenger.timerId = null
    }
    setPassengers(updatedPassengers);
  };

  const renderPassenger = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => toggleOnboard(index)}
      style={ [styles.passengerButton, { backgroundColor: item.onboard ? 'green' : 'white' }]}>
        <View style={styles.rowContainer}>
            <View style={styles.leftText}>
                <Text style={styles.bolded}>{item.name}</Text>
                <Text>{item.onboard ? 'onboard' : 'not onboard'}</Text>
            </View>
            <View style={styles.rightText}>
                <Text style={styles.bolded}>Money owed: {item.moneySpent.toFixed(2)} €</Text>
                <Text>Time: {item.timeElapsed} seconds</Text>
            </View>
      
      
      </View>
    </TouchableOpacity>
  );

  const getTotalMoneySpent = () => {
    return passengers.reduce((total, passenger) => total + passenger.moneySpent, 0)
    }

  const getTotalTimeSpent = () => {
    return passengers.reduce((total, passenger) => total + passenger.timeElapsed, 0)
  }

    const endTrip = () => {
      if (passengers.length == 0) {
        alert('No trip ongoing to close')
        return
      }
        Alert.alert(
            'End Trip',
            'Are you sure you want to end the trip',
            [
                { text: 'Cancel'},
                { text: 'End Trip', onPress: () => saveTrip() }
            ],
            { cancelable: true }
        )
    }

    const saveTrip = () => {
        // contstructing the tripdata object
        const tripData = {
            date: new Date().toISOString(),
            passengers: passengers,
            totalMoneySpent: getTotalMoneySpent(),
            totalTimeOnboard: getTotalTimeSpent()
        }
        saveTripData(tripData)
            .then(() => {
                console.log('Trip saved successfully')
            })
            .catch((error) => {
                console.error('Failed to save trip', error)
            })
        setModalVisible(true)
        //show trip summary then clearIntervals for the passengers
        console.log('Trip ended. Trip details:', passengers)
        passengers.forEach(passenger => {
            if (passenger.timerId) {
                clearInterval(passenger.timerId)
            }
        })
    }

    const closeTripDetails = () => {

        setModalVisible(false)
        //reset passengers for next trip
        setPassengers([])
    }
 
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
            value={passengerName}
            onChangeText={setPassengerName}
            placeholder="Enter Passenger Name"
        />
        </View>
        <TouchableOpacity onPress={addPassenger} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add passenger</Text>
        </TouchableOpacity>        
        <FlatList
            data={passengers}
            ListHeaderComponent={<Text style={styles.listTitle}>Passengers</Text>}
            renderItem={renderPassenger}
            keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.endButtonContainer}>
            <TouchableOpacity onPress={endTrip} styles={styles.endButton}>
                <Text style={styles.text}>End Trip</Text>
                <Image style={styles.buttonImage} source={require("../icons/noun-checkered-flag-38703.png")}/>
            </TouchableOpacity>
            
            
            <Modal
             animationType='slide'
             transparent={true}
             visible={modalVisible}
             onRequestClose={closeTripDetails}>
             <View style={styles.modalView}>
                <ShowTrip passengers={passengers} />
                <TouchableOpacity onPress={closeTripDetails} style={styles.closeMainButton}>
                    <Text style={styles.closeMainButtonText}>Close</Text>
                </TouchableOpacity>
             </View>
             
            </Modal>
            
        </View>
        <Text style={styles.listTitle}>Fare/person/second {fare} €</Text>
        <Text style={styles.listTitle}>Total Money for current trip: {getTotalMoneySpent().toFixed(2)} €</Text>
    </View>
    </KeyboardAvoidingView>
  );
};
export default MainScreen;