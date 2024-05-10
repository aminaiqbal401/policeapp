import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, COMMON, FONT_FAMILY, TEXT} from '../styles/consts/GlobalStyles';
import Input from '../(components)/Input';
import WhiteBtn from '../(components)/WhiteBtn';
import {ScrollView} from 'react-native-gesture-handler';
import ratio from '../styles/consts/ratio';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, IconButton, Modal, Portal} from 'react-native-paper';

const Crime = ({route}) => {
  const {item} = route.params;
  const [formData, setFormData] = useState({
    crimeTitle: '',
    description: '',
    act: '',
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState(null);
  const showModal = crimeInfo => {
    setSelectedCrime(crimeInfo);
    setVisible(true);
  };
  const hideModal = () => {
    setSelectedCrime(null);
    setVisible(false);
  };

  const stationName = item.name;

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.crimeTitle) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter Crime Title',
      });
      return;
    }
    if (!formData.description) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Enter description',
      });
      return;
    }
    if (!formData.act) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Enter Crime Act',
      });
      return;
    }

    firestore()
      .collection('Crime')
      .add({
        crimeTitle: formData.crimeTitle,
        description: formData.description,
        act: formData.act,
        stationData: item,
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Police Station Crime Data added',
        });
        getData();
      });
  };

  const getData = () => {
    setLoading(true);
    firestore()
      .collection('Crime')
      .where('stationData.name', '==', stationName)
      .get()
      .then(querySnapshot => {
        setData(querySnapshot.docs.map(doc => doc.data()));
        setLoading(false);
      });
  };

  const handleDelete = item => {
    firestore()
      .collection('Crime')
      .where('stationName.name', '==', item.stationName)
      .where('description', '==', item.description)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref
            .delete()
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Crime member deleted successfully',
              });
              getData();
            })
            .catch(error => {
              console.error('Error removing document: ', error);
            });
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={COMMON.super_Container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <IconButton
            title="Close Modal"
            icon={'close'}
            iconColor={COLOR.black}
            onPress={hideModal}
          />
          {selectedCrime && (
            <View>
              <Text style={styles.modalText}>
                Crime Title: {selectedCrime.crimeTitle}
              </Text>
              <Text style={styles.modalText}>
                Description: {selectedCrime.description}
              </Text>
              <Text style={styles.modalText}>Act: {selectedCrime.act}</Text>
            </View>
          )}
        </Modal>
      </Portal>
      <Text style={[TEXT.heading, styles.heading]}>Add Crime</Text>
      <View style={styles.inputView}>
        <Text>Station Name: {stationName}</Text>
        <Input
          placeholder={'Crime Title'}
          id={'crimeTitle'}
          name={'crimeTitle'}
          onChangeText={handleChange}
        />
        <Input
          placeholder={'Description'}
          id={'description'}
          name={'description'}
          onChangeText={handleChange}
        />
        <Input
          placeholder={'Act'}
          id={'act'}
          name={'act'}
          onChangeText={handleChange}
        />
        <View>
          <WhiteBtn text={'Add'} handleFunc={handleSubmit} />
        </View>
      </View>
      <Text style={[TEXT.heading, styles.heading]}>
        All Crime of {stationName}
      </Text>
      <ScrollView>
        {loading ? (
          <ActivityIndicator animating={true} color={COLOR.white} />
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.listItemText}>
                <Text
                  style={[
                    styles.btnText,
                    {fontFamily: FONT_FAMILY.montserratBold},
                  ]}>
                  Crime Title: {item.crimeTitle}
                </Text>
                <Text style={styles.btnText}>
                  Description: {item.description}
                </Text>
                <Text style={styles.btnText}>Act: {item.act}</Text>
              </View>
              <Button
                title="Delete"
                style={styles.btn}
                onPress={() => handleDelete(item)}
              />
              <Button
                title="Get Report"
                style={styles.btn}
                onPress={() => showModal(item)}
              />
            </View>
          ))
        ) : (
          <Text style={[TEXT.title, {textAlign: 'center'}]}>
            No Crime regarding this Police Station
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Crime;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
    paddingBottom: ratio.pixelSizeHorizontal(10),
    borderRadius: ratio.pixelSizeHorizontal(10),
    marginHorizontal: ratio.pixelSizeHorizontal(20),
  },
  modalText: {
    marginBottom: ratio.pixelSizeHorizontal(10),
    fontSize: ratio.fontPixel(18),
    fontFamily: FONT_FAMILY.montserratRegular,
    color: COLOR.black,
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
  btnText: {
    color: COLOR.black,
    fontSize: ratio.fontPixel(18),
    fontFamily: FONT_FAMILY.montserratMedium,
  },
  listItemText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ratio.pixelSizeHorizontal(6),
    gap: ratio.pixelSizeHorizontal(10),
    padding: ratio.pixelSizeHorizontal(5),
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
