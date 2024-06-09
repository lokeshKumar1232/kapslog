import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/Homescreen';
import Detailscreen from '../Screen/Detailscreen';
import Cardscreen from '../Screen/Cardscreen';
const Stack = createNativeStackNavigator();

const AppNavigator = ()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Detailscreen" component={Detailscreen} />
      <Stack.Screen name="Cardscreen" component={Cardscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;