import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ratio from '../styles/consts/ratio';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';

const {widthPixel, fontPixel} = ratio;

const StoreBtn = ({text, btnColor, color, handleFunc}) => {
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

export default StoreBtn;

const styles = StyleSheet.create({
  btnText: {
    fontSize: fontPixel(18),
    fontFamily: FONT_FAMILY.montserratSemiBold,
  },
  btn: {
    width: widthPixel(219),
    height: widthPixel(48),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(26),
    borderRadius: widthPixel(26),
    borderColor: COLOR.green,
    borderWidth: widthPixel(1),
  },
});
