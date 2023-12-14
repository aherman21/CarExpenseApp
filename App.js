// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripsScreen from './src/screens/TripsScreen'; // Adjusted import path
import MainScreen from './src/screens/MainScreen';
import ShowTrip from './src/components/ShowTrip';
import TripDetailScreen from './src/screens/TripDetailScreen';
import SetFareScreen from './src/screens/SetFareScreen';
import { FareProvider } from './src/context/fareContext';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <FareProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={MainScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  title='History'
                  onPress={() => navigation.navigate('History')}></Button>
              ),
              headerLeft: () => (
                <Button
                  title='Set Fare'
                  onPress={() => navigation.navigate('Set Fare')}></Button>
              )
            })} />
          <Stack.Screen name="ShowTrip" component={ShowTrip} />
          <Stack.Screen name="History" component={TripsScreen} />
          <Stack.Screen name="Set Fare" component={SetFareScreen} />
          <Stack.Screen name="TripDetails" component={TripDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FareProvider>
  );
};

export default App;
