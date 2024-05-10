import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLOR,
  COMMON,
  FONT_FAMILY,
  TEXT,
} from '../../styles/consts/GlobalStyles';
import ratio from '../../styles/consts/ratio';
import Input from '../../(components)/Input';
import WhiteBtn from '../../(components)/WhiteBtn';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import {Dropdown} from '../../(components)/Dropdown';
import {useAuthContext} from '../../context/AuthContext';

const PoliceStation = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tehsils, setTehsils] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedTehsil, setSelectedTehsil] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const {user} = useAuthContext();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Add a new PoliceStation name',
      });
      return;
    }
    if (!selectedTehsil) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Select a Tehsil',
      });
      return;
    }
    if (!selectedDistrict) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Select a District',
      });
      return;
    }

    firestore()
      .collection('PoliceStations')
      .add({
        name: formData.name,
        tehsil: selectedTehsil,
        district: selectedDistrict,
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'PoliceStation added',
        });
        getData();
      });
  };

  const handleDelete = policeStationName => {
    firestore()
      .collection('PoliceStations')
      .where('name', '==', policeStationName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref
            .delete()
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'PoliceStation deleted',
              });
              getData();
            })
            .catch(error => {
              console.error('Error removing document: ', error);
            });
        });
      });
  };

  const getData = () => {
    if (!searchQuery) {
      setLoading(true);
      firestore()
        .collection('PoliceStations')
        .get()
        .then(querySnapshot => {
          setData(querySnapshot.docs.map(doc => doc.data()));
          setLoading(false);
        });
    } else {
      setLoading(true);
      firestore()
        .collection('PoliceStations')
        .where('name', '>=', searchQuery)
        .where('name', '<=', searchQuery + '\uf8ff')
        .get()
        .then(querySnapshot => {
          setData(querySnapshot.docs.map(doc => doc.data()));
          setLoading(false);
        });
    }
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
    getData();
    getTehsils();
    getDistricts();
  }, []);

  useEffect(() => {
    getData();
  }, [searchQuery]);

  return (
    <View style={COMMON.super_Container}>
      {user.role === 'admin' && (
        <>
          <Text style={[TEXT.heading, styles.heading]}>
            Add PoliceStation Data
          </Text>
          <View style={styles.inputView}>
            <Input
              placeholder={'PoliceStation Name'}
              id={'name'}
              name={'name'}
              onChangeText={handleChange}
            />
            <Text>Tehsil:</Text>
            <Dropdown
              options={tehsils}
              selectedOption={selectedTehsil}
              onSelect={setSelectedTehsil}
            />

            <Text>District:</Text>
            <Dropdown
              options={districts}
              selectedOption={selectedDistrict}
              onSelect={setSelectedDistrict}
            />
            <View style={{zIndex: -1}}>
              <WhiteBtn text={'Add'} handleFunc={handleSubmit} />
            </View>
          </View>
        </>
      )}
      <ScrollView>
        <Text style={[TEXT.heading, styles.heading]}>PoliceStation Data</Text>
        <View style={styles.searchView}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>
        {loading ? (
          <ActivityIndicator animating={true} color={COLOR.white} />
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View>
                <Text
                  style={[
                    styles.btnText,
                    {fontFamily: FONT_FAMILY.montserratBold},
                  ]}>
                  {item.name}
                </Text>
                <Text style={styles.btnText}>Teshsil: {item.tehsil}</Text>
                <Text style={styles.btnText}>District: {item.district}</Text>
              </View>
              <View style={styles.btnView}>
                <Button
                  title="Staff"
                  style={styles.btn}
                  onPress={() => navigation.navigate('staff', {item})}
                />
                <Button
                  title="Crime Database"
                  style={styles.btn}
                  onPress={() => navigation.navigate('crime', {item})}
                />
                <Button
                  title="Delete"
                  style={styles.btnRed}
                  onPress={() => handleDelete(item.name)}
                />
              </View>
            </View>
          ))
        ) : (
          <Text style={[TEXT.title, {textAlign: 'center'}]}>
            No PoliceStation Data found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PoliceStation;

const styles = StyleSheet.create({
  searchView: {
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
    marginVertical: ratio.pixelSizeHorizontal(10),
    gap: ratio.pixelSizeHorizontal(20),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: ratio.pixelSizeHorizontal(5),
  },
  selectContainer: {
    margin: ratio.pixelSizeHorizontal(5),
    justifyContent: 'center',
    flexDirection: 'row',
    gap: ratio.pixelSizeHorizontal(5),
  },
  btn: {
    backgroundColor: COLOR.green,
    paddingVertical: ratio.pixelSizeHorizontal(10),
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
  },
  btnRed: {
    backgroundColor: COLOR.red,
    paddingVertical: ratio.pixelSizeHorizontal(10),
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
  },
  btnText: {
    color: COLOR.black,
    fontSize: ratio.fontPixel(18),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  listItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ratio.pixelSizeHorizontal(6),
    gap: ratio.pixelSizeHorizontal(10),
    padding: ratio.pixelSizeHorizontal(10),
    backgroundColor: COLOR.off_white,
    marginHorizontal: ratio.pixelSizeHorizontal(20),
    borderRadius: ratio.pixelSizeHorizontal(5),
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ratio.pixelSizeHorizontal(6),
    gap: ratio.pixelSizeHorizontal(10),
  },
  heading: {
    textAlign: 'center',
    paddingVertical: ratio.pixelSizeHorizontal(5),
  },
});
