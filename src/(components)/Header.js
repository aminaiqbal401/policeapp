import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../context/AuthContext';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';
import Toast from 'react-native-toast-message';

const Header = () => {
  const {isAuthenticated, dispatch} = useAuthContext();

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: 'LOGOUT'});
        Toast.show({
          type: 'info',
          text1: 'Sign out',
          text2: 'You are now logged out',
        });
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong');
      });
  };
  return (
    <>
      {isAuthenticated && (
        <View style={styles.container}>
          <Text style={styles.text}>Police App</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILY.montserratBold,
    color: COLOR.white,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLOR.grey,
  },
});
