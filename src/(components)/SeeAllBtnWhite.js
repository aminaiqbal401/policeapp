import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ratio from '../styles/consts/ratio';
import {COLOR, FONT_FAMILY} from '../styles/consts/GlobalStyles';

const {widthPixel, fontPixel} = ratio;

const SeeAllBtnWhite = ({handleFunc}) => {
  return (
    <TouchableOpacity onPress={handleFunc} style={styles.btn}>
      <Text style={styles.btnText}>See All</Text>
    </TouchableOpacity>
  );
};

export default SeeAllBtnWhite;

const styles = StyleSheet.create({
  btnText: {
    color: COLOR.green,
    fontSize: fontPixel(12),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  btn: {
    width: widthPixel(87),
    height: widthPixel(23),
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(26),
  },
});
