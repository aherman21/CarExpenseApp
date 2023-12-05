// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen'; // Adjusted import path
import EditScreen from './src/screens/EditScreen'; // Adjusted import path
import SettleupScreen from './src/screens/SettleupScreen'; // Adjusted import path
import TripsScreen from './src/screens/TripsScreen'; // Adjusted import path
import MainScreen from './src/screens/MainScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="Settleup" component={SettleupScreen} />
        <Stack.Screen name="Trips" component={TripsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
