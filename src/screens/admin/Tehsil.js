import {Button, StyleSheet, Text, View} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {useAuthContext} from '../../context/AuthContext';

const Tehsil = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
        text2: 'Add a new Tehsil name',
      });
      return;
    }

    firestore()
      .collection('Tehsils')
      .add({
        name: formData.name,
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Tehsil added',
        });
        getData();
      });
  };

  const handleDelete = tehsilName => {
    firestore()
      .collection('Tehsils')
      .where('name', '==', tehsilName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref
            .delete()
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Tehsil deleted',
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
    setLoading(true);
    firestore()
      .collection('Tehsils')
      .get()
      .then(querySnapshot => {
        setData(querySnapshot.docs.map(doc => doc.data()));
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={COMMON.super_Container}>
      {user.role === 'admin' && (
        <>
          <Text style={[TEXT.heading, styles.heading]}>Add Tehsil Data</Text>
          <View style={styles.inputView}>
            <Input
              placeholder={'Tehsil Name'}
              id={'name'}
              name={'name'}
              onChangeText={handleChange}
            />
            <WhiteBtn text={'Add'} handleFunc={handleSubmit} />
          </View>
        </>
      )}
      <ScrollView>
        <Text style={[TEXT.heading, styles.heading]}>Tehsil Data</Text>
        {loading ? (
          <ActivityIndicator animating={true} color={COLOR.white} />
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.btnText}>{item.name}</Text>
              <Button
                title="Delete"
                style={styles.btn}
                onPress={() => handleDelete(item.name)}
              />
            </View>
          ))
        ) : (
          <Text style={[TEXT.title, {textAlign: 'center'}]}>
            No Tehsil Data found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Tehsil;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLOR.green,
    paddingVertical: ratio.pixelSizeHorizontal(10),
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
  },
  btnText: {
    color: COLOR.white,
    fontSize: ratio.fontPixel(18),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ratio.pixelSizeHorizontal(6),
    gap: ratio.pixelSizeHorizontal(10),
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
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
