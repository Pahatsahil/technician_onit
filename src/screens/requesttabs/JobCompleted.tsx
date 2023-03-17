import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {COLORS} from '../../utils/constants';
import {BASE_URL} from '../../utils/endpoints';
import angleLeft from '../../images/angleLeft.png';

const {width, height} = Dimensions.get('window');

const JobCompleted = ({navigation, route}) => {
  const {accessToken, isAuthorized, userData, profileImageUrl} = useSelector(
    (state: any) => state.auth,
  );
  const ticket_object_id = route?.params?.id;
  const [review, setReview] = useState(false);
  const [feedback, setFeedback] = useState();
  const [rating, setRating] = useState();
  const [visible, setVisible] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<any>();
  const [pictures, setPictures] = useState(
    ticketDetails?.onsite_pictures || [],
  );
  const [paymentType, setPaymentType] = useState('Online');
  const [loader, setLoader] = useState(false);
  const [ticketLoader, setTicketLoader] = useState(false);

  const getTicketDetails = async () => {
    setTicketLoader(true);
    try {
      await axios({
        method: 'get',
        url: `${BASE_URL}technicianapp/get-booking-details?ticket_object_id=${ticket_object_id}`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
        },
      }).then(res => {
        setTicketDetails(res?.data?.data[0]);
        setTicketLoader(false);
      });
    } catch (err) {
      console.log(err);
      setTicketLoader(false);
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };
  useEffect(() => {
    getTicketDetails();
    console.log(ticketDetails)
  }, []);

  const upoloadPicturesFromCamera = (uploadType: any, imageType: any) => {
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 400,
        width: 400,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(image => {
        uploadImage(image);
      });
    }
  };

  const uploadImage = async (image: any) => {
    setLoader(true);
    var data = new FormData();
    data.append('OnsitePicture', {
      uri: image.path,
      name: image.path.split('/').pop(),
      type: image.mime,
      height: image.height,
      width: image.width,
    });
    try {
      console.log('Here!!');
      const response = await fetch(
        `${BASE_URL}technicianApp/upload-ticket-onsite-picture/${ticket_object_id}`,
        {
          method: 'post',
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
              'x-access-token': accessToken,
            },
          },
          body: data,
          mode: 'cors',
        },
      );
      let _data = await response.json();
      console.log(_data);
      if (_data.status === 200) {
        let onsitePicArr = [...pictures, _data?.data?.fileSavedUrl.toString()];
        setPictures(onsitePicArr);
        setVisible(false);
        setLoader(false);
        ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };

  const UploadPictures = () => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => {
                upoloadPicturesFromCamera('camera', 'pictures');
                setVisible(false);
              }}>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <UploadPictures />
      <SafeAreaView
        style={{
          paddingTop: StatusBar.currentHeight,
          paddingBottom: 40,
          flex: 1
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{height: 40, width: 40, resizeMode: 'contain'}}
                source={angleLeft}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: COLORS.BLACK,
                }}>
                Booking ID :
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 6,
                  color: COLORS.BLACK,
                }}>
                {ticketDetails?.ticket_id}
              </Text>
            </View>
          </View>
          </ScrollView>
          </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_style: {
    height: height / 2,
    width: width / 2,
  },
  modal_view: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_view2: {
    height: height / 3,
    width: width / 1.5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_button: {
    marginBottom: 5,

    padding: 10,
  },
  modal_text: {
    paddingBottom: 5,
    fontSize: 15,
    color: '#006ee6',
  },
  upload_image: {
    height: 15,
    width: 15,
    marginBottom: 5,
    padding: 15,
  },
});
export default JobCompleted;
