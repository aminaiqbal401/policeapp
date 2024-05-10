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
import {useAuthContext} from '../context/AuthContext';

const Staff = ({route}) => {
  const {item} = route.params;
  const [formData, setFormData] = useState({
    personName: '',
    designation: '',
    contactNumber: '',
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const showModal = staffInfo => {
    setSelectedStaff(staffInfo);
    setVisible(true);
  };
  const hideModal = () => {
    setSelectedStaff(null);
    setVisible(false);
  };
  const {user} = useAuthContext();

  const stationName = item.name;

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formData.personName) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter Person Name',
      });
      return;
    }
    if (!formData.designation) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Enter designation',
      });
      return;
    }
    if (!formData.contactNumber) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Enter Contact Number',
      });
      return;
    }

    firestore()
      .collection('Staff')
      .add({
        personName: formData.personName,
        designation: formData.designation,
        contactNumber: formData.contactNumber,
        stationData: item,
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

  const getData = () => {
    setLoading(true);
    firestore()
      .collection('Staff')
      .where('stationData.name', '==', stationName)
      .get()
      .then(querySnapshot => {
        setData(querySnapshot.docs.map(doc => doc.data()));
        setLoading(false);
      });
  };

  const handleDelete = item => {
    firestore()
      .collection('Staff')
      .where('stationName.name', '==', item.stationName)
      .where('contactNumber', '==', item.contactNumber)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref
            .delete()
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Staff member deleted successfully',
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
          {selectedStaff && (
            <View>
              <Text style={styles.modalText}>
                Name: {selectedStaff.personName}
              </Text>
              <Text style={styles.modalText}>
                Designation: {selectedStaff.designation}
              </Text>
              <Text style={styles.modalText}>
                Contact Number: {selectedStaff.contactNumber}
              </Text>
            </View>
          )}
        </Modal>
      </Portal>
      {user.role == 'admin' && (
        <>
          <Text style={[TEXT.heading, styles.heading]}>Add Staff</Text>
          <View style={styles.inputView}>
            <Text>Station Name: {stationName}</Text>
            <Input
              placeholder={'Person Name'}
              id={'personName'}
              name={'personName'}
              onChangeText={handleChange}
            />
            <Input
              placeholder={'Designation'}
              id={'designation'}
              name={'designation'}
              onChangeText={handleChange}
            />
            <Input
              placeholder={'Contact Number'}
              id={'contactNumber'}
              name={'contactNumber'}
              onChangeText={handleChange}
            />
            <View>
              <WhiteBtn text={'Add'} handleFunc={handleSubmit} />
            </View>
          </View>
        </>
      )}
      <Text style={[TEXT.heading, styles.heading]}>
        All Staff of {stationName}
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
                  Name: {item.personName}
                </Text>
                <Text style={styles.btnText}>
                  Designation: {item.designation}
                </Text>
                <Text style={styles.btnText}>
                  Contact Number: {item.contactNumber}
                </Text>
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
            No Staff regarding this Police Station
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Staff;

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
