import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';
import ratio from '../styles/consts/ratio';

const {widthPixel, fontPixel, pixelSizeVertical} = ratio;

const Input = ({
  id,
  name,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={COLOR.low_white}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={text => onChangeText(name, text)}
      secureTextEntry={secureTextEntry}
      id={id}
      name={name}
      value={value}
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
