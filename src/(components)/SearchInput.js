import {StyleSheet, TextInput, View} from 'react-native';
import ratio from '../styles/consts/ratio';
import {COLOR, FONT_FAMILY, TEXT} from '../styles/consts/GlobalStyles';
// icon
import SearchIcon from '../assets/images/icons/browse.svg';

const {widthPixel, pixelSizeVertical, fontPixel} = ratio;
const SearchInput = () => {
  return (
    <View style={styles.searchContainer}>
      <SearchIcon width={24} fill={COLOR.green} />
      <TextInput
        style={styles.input}
        placeholder="Search Products"
        placeholderTextColor={COLOR.neutral}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: FONT_FAMILY.montserratSemiBold,
    fontSize: fontPixel(14),
    color: COLOR.neutral,
    opacity: 0.2,
    width: '100%',
  },
  searchContainer: {
    width: widthPixel(335),
    height: widthPixel(46),
    backgroundColor: COLOR.white,
    alignSelf: 'center',
    borderRadius: widthPixel(23),
    marginTop: pixelSizeVertical(23),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: pixelSizeVertical(18),
    gap: pixelSizeVertical(22),
    marginBottom: pixelSizeVertical(16),
  },
});
