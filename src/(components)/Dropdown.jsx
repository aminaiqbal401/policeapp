import React, {useState} from 'react';
import {TouchableOpacity, View, Text, FlatList, StyleSheet} from 'react-native';
import {COLOR} from '../styles/consts/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Dropdown = ({options, selectedOption, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.selectedOption}>
        <View style={styles.selectedOptionView}>
          <Text
            style={[
              styles.selectedOptionText,
              selectedOption && {color: COLOR.white},
            ]}>
            {selectedOption || 'Select Option'}
          </Text>
          <Icon name="angle-down" color={COLOR.white} size={20} />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item.name);
                  setIsOpen(false);
                }}>
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedOptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'relative',
    width: '80%',
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  selectedOptionText: {
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: COLOR.black,
  },
  optionText: {
    fontSize: 16,
    color: COLOR.black,
  },
});
