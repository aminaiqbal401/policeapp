import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/auth/Login';

const Stack = createStackNavigator()
const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='login' component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App