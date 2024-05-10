import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useAuthContext} from '../../context/AuthContext';
import {COLOR, FONT_FAMILY} from '../../styles/consts/GlobalStyles';
import Toast from 'react-native-toast-message';
import ratio from '../../styles/consts/ratio';

const HomeScreen = ({navigation}) => {
  const {user} = useAuthContext();
  return (
    <View style={styles.container}>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('tehsil')}>
          <Text style={styles.btnText}>Tehsils</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('district')}>
          <Text style={styles.btnText}>Destricts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('policeStation')}>
          <Text style={styles.btnText}>Police Stations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btnText: {
    color: COLOR.black,
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  btn: {
    backgroundColor: COLOR.off_white,
    padding: ratio.pixelSizeHorizontal(10),
    marginHorizontal: ratio.pixelSizeHorizontal(10),
    borderRadius: ratio.pixelSizeHorizontal(5),
  },
  btnView: {
    gap: ratio.pixelSizeHorizontal(10),
    paddingVertical: ratio.pixelSizeHorizontal(10),
  },
  text: {
    color: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.blue,
  },
});
