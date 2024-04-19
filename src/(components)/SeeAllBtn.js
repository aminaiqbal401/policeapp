import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ratio from '../styles/consts/ratio';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';

const {widthPixel, fontPixel} = ratio;

const SeeAllBtn = ({handleFunc, text}) => {
  return (
    <TouchableOpacity onPress={handleFunc} style={styles.btn}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SeeAllBtn;

const styles = StyleSheet.create({
  btnText: {
    color: COLOR.white,
    fontSize: fontPixel(12),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  btn: {
    width: widthPixel(87),
    height: widthPixel(23),
    backgroundColor: COLOR.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(26),
  },
});
