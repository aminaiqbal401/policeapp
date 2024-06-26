import ratio from './ratio';

const {widthPixel, fontPixel, pixelSizeVertical} = ratio;

/* fonts */
export const FONT_FAMILY = {
  montserratSemiBold: 'Montserrat-SemiBold',
  montserratBold: 'Montserrat-Bold',
  montserratMedium: 'Montserrat-Medium',
  montserratRegular: 'Montserrat-Regular',
  montserratLight: 'Montserrat-Light',
};
/* Colors */
export const COLOR = {
  white: '#FFF',
  black: '#000',
  bg: '#000080',
  green: '#33907C',
  green_1: '#E3EFF2',
  grey: '#606A7B',
  blue: '#000080',
  neutral: '#4F4F4F',
  neutral_03: '#B9B9B9',
  border_clr: 'rgba(0,0,0,0.1)',
  icon_bg_clr: 'rgba(200,200,200,0.4)',
  input_clr: '#DBDBDE',
  off_white: '#ffffe4',
  low_white: 'rgba(255,255,255,0.5)',
  red: '#FF0000',
};
/* Text */
export const TEXT = {
  heading: {
    fontFamily: FONT_FAMILY.montserratBold,
    fontSize: fontPixel(24),
    color: COLOR.white,
  },
  faded: {
    fontFamily: FONT_FAMILY.montserratSemiBold,
    fontSize: fontPixel(14),
    color: COLOR.neutral,
    opacity: 0.2,
  },
  heading_2: {
    fontFamily: FONT_FAMILY.montserratSemiBold,
    fontSize: fontPixel(18),
    color: COLOR.neutral,
  },
  heading_2_white: {
    fontFamily: FONT_FAMILY.montserratSemiBold,
    fontSize: fontPixel(18),
    color: COLOR.white,
  },
  title: {
    fontFamily: FONT_FAMILY.montserratSemiBold,
    fontSize: fontPixel(18),
    color: COLOR.white,
    lineHeight: fontPixel(20),
    letterSpacing: fontPixel(-0.165),
    paddingVertical: pixelSizeVertical(15),
  },
  cardText: {
    fontFamily: FONT_FAMILY.montserratMedium,
    fontSize: fontPixel(14),
    color: COLOR.neutral,
  },
  alphaLogoText: {
    fontFamily: FONT_FAMILY.montserratBold,
    fontSize: fontPixel(40),
    color: COLOR.white,
    textTransform: 'uppercase',
  },
};
/* Common */
export const COMMON = {
  super_Container: {
    flex: 1,
    backgroundColor: COLOR.bg,
  },
  row_Just: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: pixelSizeVertical(16),
    paddingHorizontal: pixelSizeVertical(20),
  },
  bottom_Bar: {
    height: widthPixel(80),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    position: 'absolute',
    bottom: pixelSizeVertical(0),
    elevation: 30,
  },
  alphaLogo: {
    width: widthPixel(60),
    height: widthPixel(60),
    backgroundColor: COLOR.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(64),
    borderWidth: widthPixel(1.5),
    borderColor: COLOR.white,
    alignSelf: 'center',
    marginTop: pixelSizeVertical(-30),
  },
};
