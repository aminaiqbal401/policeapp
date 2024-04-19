import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';
import ratio from '../styles/consts/ratio';

const {widthPixel, fontPixel, pixelSizeVertical} = ratio;
const Input = ({placeholder}) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={COLOR.white}
      placeholder={placeholder}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: widthPixel(48),
    width: widthPixel(311),
    borderWidth: 1,
    borderColor: COLOR.white,
    borderRadius: widthPixel(24),
    fontSize: fontPixel(18),
    fontFamily: FONT_FAMILY.montserratRegular,
    letterSpacing: fontPixel(-0.434),
    paddingStart: pixelSizeVertical(16),
  },
});
