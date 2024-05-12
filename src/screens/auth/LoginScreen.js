import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {COLOR, FONT_FAMILY} from '../../styles/consts/GlobalStyles';
import ratio from '../../styles/consts/ratio';
import Input from '../../(components)/Input';
import WhiteBtn from '../../(components)/WhiteBtn';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../../context/AuthContext';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';

const {fontPixel, pixelSizeVertical} = ratio;

const LoginScreen = ({navigation}) => {
  const {dispatch, user} = useAuthContext(); // Accessing user from AuthContext
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    let {email, password} = formData;

    if (!formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required',
      });
      return;
    }

    setIsProcessing(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const userData = doc.data();
              const userWithRole = {
                ...user,
                role: userData.role,
              };
              dispatch({type: 'LOGIN', payload: {user: userWithRole}});
              Toast.show({
                type: 'success',
                text1: 'Login',
                text2: 'Login success',
              });
            } else {
              console.error('User document not found');
            }
          })
          .catch(error => {
            console.error('Error fetching user role from Firestore:', error);
          });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'That email address is invalid!',
          });
        } else if (error.code === 'auth/user-not-found') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'User not found',
          });
        } else if (error.code === 'auth/wrong-password') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Wrong password',
          });
        } else if (error.code === 'auth/invalid-credential') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Wrong credentials',
          });
        } else {
          console.log('Unhandled error:', error);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong',
          });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>Welcome to Police Database app</Text>
      <Text style={styles.infoText}>Login to your account</Text>
      <View style={styles.inputsContainer}>
        <Input
          id={'email'}
          name={'email'}
          placeholder={'Email/Mobile Number'}
          keyboardType={'email-address'}
          onChangeText={handleInputChange}
        />
        <Input
          id={'password'}
          name={'password'}
          placeholder={'Password'}
          onChangeText={handleInputChange}
          secureTextEntry={true}
        />
      </View>
      <WhiteBtn text={'Login'} handleFunc={handleLogin} />
      <Text style={styles.bottomText}>Forgot your password?</Text>
      <TouchableOpacity
        disabled={isProcessing}
        onPress={() => navigation.navigate('signup')}>
        <Text style={styles.bottomText}>
          Don’t have an account?
          <Text style={{fontFamily: FONT_FAMILY.montserratSemiBold}}>
            Sign up
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomText: {
    color: COLOR.white,
    fontSize: fontPixel(18),
    fontFamily: FONT_FAMILY.montserratRegular,
    letterSpacing: fontPixel(-0.434),
    marginTop: pixelSizeVertical(40),
  },
  inputsContainer: {
    marginBottom: pixelSizeVertical(35),
    gap: pixelSizeVertical(16),
  },
  infoText: {
    color: COLOR.white,
    fontSize: fontPixel(16),
    fontFamily: FONT_FAMILY.montserratRegular,
    letterSpacing: fontPixel(-0.386),
    marginBottom: pixelSizeVertical(40),
  },
  headingText: {
    color: COLOR.white,
    fontSize: fontPixel(24),
    fontFamily: FONT_FAMILY.montserratMedium,
    letterSpacing: fontPixel(-0.579),
    marginBottom: pixelSizeVertical(60),
  },
  container: {
    backgroundColor: COLOR.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
