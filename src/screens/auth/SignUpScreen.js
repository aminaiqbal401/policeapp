import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {COLOR, FONT_FAMILY} from '../../styles/consts/GlobalStyles';
import ratio from '../../styles/consts/ratio';
import Input from '../../(components)/Input';
import WhiteBtn from '../../(components)/WhiteBtn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

const {fontPixel, pixelSizeVertical} = ratio;

const SignUpScreen = ({navigation}) => {
  const {dispatch} = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    if (!formData.email || !formData.password || !formData.name) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
    setIsProcessing(true);

    auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(userCredential => {
        const user = userCredential.user;
        return user.updateProfile({
          displayName: formData.name,
        });
      })
      .then(() => {
        const user = auth().currentUser;
        if (user) {
          dispatch({type: 'LOGIN', payload: {user}});
          console.log('User account created & signed in!', user);
        } else {
          console.error('User not found after profile update');
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'That email address is already in use!',
          });
        } else if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'That email address is invalid!',
          });
        } else {
          console.error(error);
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header}></TouchableOpacity>
        <View style={styles.containerCenter}>
          <Text style={styles.headingText}>Welcome to tradly</Text>
          <Text style={styles.infoText}>Signup to your account</Text>
          <View style={styles.inputsContainer}>
            <Input
              placeholder={'Name'}
              id={'name'}
              name={'name'}
              value={formData.name}
              onChangeText={handleChange}
            />
            <Input
              placeholder={'Email'}
              id={'email'}
              name={'email'}
              value={formData.email}
              onChangeText={handleChange}
              keyboardType={'email-address'}
            />
            <Input
              placeholder={'Password'}
              id={'password'}
              name={'password'}
              secureTextEntry={true}
              value={formData.password}
              onChangeText={handleChange}
            />
          </View>
          <WhiteBtn handleFunc={handleSignUp} text={'Sign Up'} />
          <TouchableOpacity
            disabled={isProcessing}
            onPress={() => navigation.navigate('login')}>
            <Text style={styles.bottomText}>
              Have an account?{' '}
              <Text style={{fontFamily: FONT_FAMILY.montserratSemiBold}}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;

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
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pixelSizeVertical(80),
  },
  header: {
    paddingHorizontal: pixelSizeVertical(16),
    marginTop: pixelSizeVertical(50),
  },
  container: {
    backgroundColor: COLOR.green,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
