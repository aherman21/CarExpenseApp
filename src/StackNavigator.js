import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './StartScreen';
import PassengerSetup from './PassengerSetup';
import SettleUp from './SettleUp';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="PassengerSetup" component={PassengerSetup} />
        <Stack.Screen name="SettleUp" component={SettleUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
