import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import HomeScreen from '../screens/admin/HomeScreen';
import {useAuthContext} from '../context/AuthContext';
import Header from '../(components)/Header';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated} = useAuthContext();

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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
