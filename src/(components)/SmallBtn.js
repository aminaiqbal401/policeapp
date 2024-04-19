import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ratio from '../styles/consts/ratio';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';

const {widthPixel, fontPixel, pixelSizeVertical} = ratio;

const SmallBtn = ({text, btnColor, color, handleFunc}) => {
  return (
    <TouchableOpacity
      onPress={handleFunc}
      style={[
        styles.btn,
        {
          backgroundColor: btnColor,
        },
      ]}>
      <Text style={[styles.btnText, {color: color}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SmallBtn;

const styles = StyleSheet.create({
  btnText: {
    fontSize: fontPixel(12),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  btn: {
    paddingHorizontal: pixelSizeVertical(23),
    height: widthPixel(23),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(26),
    borderColor: COLOR.green,
    borderWidth: widthPixel(1),
  },
});
