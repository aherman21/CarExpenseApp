// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripsScreen from './src/screens/TripsScreen'; // Adjusted import path
import MainScreen from './src/screens/MainScreen';
import ShowTrip from './src/components/ShowTrip';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title='trips'
                onPress={() => navigation.navigate('Trips')}></Button>
            )
          })} />
        <Stack.Screen name="ShowTrip" component={ShowTrip} />
        <Stack.Screen name="Trips" component={TripsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
