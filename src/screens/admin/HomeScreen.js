import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthContext} from '../../context/AuthContext';
import {COLOR} from '../../styles/consts/GlobalStyles';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const {user} = useAuthContext();
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
    console.log('user', user);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome: {user.email}</Text>
      <Text style={styles.text}>User ID: {user.uid}</Text>
      <Text style={styles.text}>User Name: {user.displayName}</Text>

      <Button style={{padding: 3}} onPress={showToast} title="Test" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.blue,
  },
});
