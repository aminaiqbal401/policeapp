import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Dropdown} from '../../(components)/Dropdown';
import {COLOR} from '../../styles/consts/GlobalStyles';
import Input from '../../(components)/Input';
import ratio from '../../styles/consts/ratio';
import Toast from 'react-native-toast-message';

const EditPoliceStation = ({route, navigation}) => {
  const {item} = route.params;
  const [editedName, setEditedName] = useState(item.name);
  const [editedTehsil, setEditedTehsil] = useState(item.tehsil);
  const [editedDistrict, setEditedDistrict] = useState(item.district);
  const [tehsils, setTehsils] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleChange = (name, value) => {
    setEditedName(value);
  };

  const handleConfirmEdit = () => {
    firestore()
      .collection('PoliceStations')
      .doc(item.id)
      .update({
        name: editedName,
        tehsil: editedTehsil,
        district: editedDistrict,
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'PoliceStation Edited Successfully',
        });
        navigation.navigate('policeStation');
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  };

  const getTehsils = () => {
    firestore()
      .collection('Tehsils')
      .get()
      .then(querySnapshot => {
        setTehsils(querySnapshot.docs.map(doc => doc.data()));
      });
  };

  const getDistricts = () => {
    firestore()
      .collection('Districts')
      .get()
      .then(querySnapshot => {
        setDistricts(querySnapshot.docs.map(doc => doc.data()));
      });
  };

  useEffect(() => {
    getTehsils();
    getDistricts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit Police Station</Text>
      <Input
        placeholder="Name"
        value={editedName}
        onChangeText={handleChange}
      />
      <Dropdown
        options={tehsils}
        selectedOption={editedTehsil}
        onSelect={setEditedTehsil}
      />
      <Dropdown
        options={districts}
        selectedOption={editedDistrict}
        onSelect={setEditedDistrict}
      />
      <Button title="Confirm" onPress={handleConfirmEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.bg,
    padding: ratio.pixelSizeHorizontal(10),
    alignItems: 'center',
    gap: ratio.pixelSizeHorizontal(10),
  },
});

export default EditPoliceStation;
