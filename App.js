import 'react-native-gesture-handler';
import React from 'react';
import AuthContextProvider from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <AuthContextProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
      </PaperProvider>
    </AuthContextProvider>
  );
};

export default App;
