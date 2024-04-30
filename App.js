import 'react-native-gesture-handler';
import React from 'react';
import AuthContextProvider from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {GluestackUIProvider} from '@gluestack-ui/themed';

const App = () => {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
};

export default App;
