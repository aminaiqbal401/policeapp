import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import HomeScreen from '../screens/admin/HomeScreen';
import {useAuthContext} from '../context/AuthContext';
import Header from '../(components)/Header';
import Tehsil from '../screens/admin/Tehsil';
import District from '../screens/admin/District';
import PoliceStation from '../screens/admin/PoliceStation';
import Staff from '../screens/Staff';
import Crime from '../screens/Crime';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated, user} = useAuthContext();

  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator
        initialRouteName="signup"
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="tehsil" component={Tehsil} />
            <Stack.Screen name="district" component={District} />
            <Stack.Screen name="policeStation" component={PoliceStation} />
            <Stack.Screen name="staff" component={Staff} />
            <Stack.Screen name="crime" component={Crime} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
