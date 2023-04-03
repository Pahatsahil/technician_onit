import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableNativeFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  Linking,
  Share,
} from 'react-native';
import axios from 'axios';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
// import QRCode from "react-native-qrcode-generator";
import {
  authorizedLogin,
  setProfileImageUrl,
  setUserData,
  setUserId,
} from '../../redux-toolkit/slice';
import cross from '../images/cross.png';
import cameraImg from '../images/camera2.png';
import moment from 'moment';
import share from '../images/share.png';
import {
  AADHAR_BACK_IMAGE,
  AADHAR_FRONT_IMAGE,
  GET_NOTIFICATION_TOKEN,
  GET_USER_DETAILS,
  JOINING_BONUS,
  TECHNICIAN_PAN_CARD,
  UPDATE_TECHNICIAN,
} from '../utils/endpoints';
import {Picker} from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import {COLORS} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
export default function GenerateQR({navigation, route}) {
  const prevScreenData = route?.params?.data;
  const company_worked_with = route?.params?.company_worked_with;
  const secondary_services_id = route?.params?.secondary_services;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const [aadhaarCardFront, setAadhaarCardFront] = useState();
  const [aadhaarCardBack, setAadhaarCardBack] = useState();
  const [s3aadhaarCardFront, sets3AadhaarCardFront] = useState();
  const [s3aadhaarCardBack, sets3AadhaarCardBack] = useState();
  const [s3panCard, sets3PanCard] = useState();
  const [panCard, setPanCard] = useState();
  const [visible, setVisible] = useState(false);
  const [aadhaarVisible, setAadhaarVisible] = useState(false);
  const [aadhaarBackVisible, setAadhaarBackVisible] = useState(false);
  const [qr, setQr] = useState(false);
  const [progress, setProgress] = useState(0);
  const profile_picture = route?.params?.profile_picture;
  const [loader, setLoader] = useState(false);
  const [turnover, setturnover] = useState(0);
  const [qrimage, setQrimage] = useState();
  const [bonusAmount, setBonusAmount] = useState(99);
  const [bonusModal, setBonusModal] = useState(false);
  const {accessToken, isAuthorized, userData, profileImageUrl} = useSelector(
    state => state.auth,
  );
  const QRID = route?.params?.QRID;
  useEffect(() => {
    NotificationToken();
  }, []);

  const NotificationToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    let device_id = await AsyncStorage.getItem('device_id');
    console.log('abhay', fcmToken);
    const payload = {
      token: fcmToken,
      device_id: device_id?.toString(),
    };
    try {
      console.log('NOTIFICATIONs', payload);
      const res = await axios({
        method: 'post',
        url: GET_NOTIFICATION_TOKEN,
        data: payload,
      });
      if (res) {
        console.log('NotificationToken', res.data);
      }
      console.log('', res);
    } catch (err) {
      console.log('errorToken', err);
    }
  };
  useEffect(() => {
    axios({
      method: 'get',
      url: GET_USER_DETAILS,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      },
    }).then(res => {
      console.log('user_details', res?.data?.data);
    });
  }, []);

  const url = Data => {
    setQrimage(Data);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://app.onit.services/#/booking/${QRID}`,
        url: `data:image/png;base64,${qrimage}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onsubmit = async data => {
    console.log('Prrssed!');
    const payload = {
      personal_details: {
        phone: {
          country_code:
            userData?.populatedTechnicianDetails?.personal_details?.phone
              ?.country_code,
          mobile_number:
            userData?.populatedTechnicianDetails?.personal_details?.phone
              ?.mobile_number,
        },
        email: prevScreenData.email,
        about: prevScreenData.work_experience || '',
        dob: prevScreenData?.dob || '',
        profile_picture,
        name: userData?.populatedTechnicianDetails?.center_id[0]?.center_name,
        company_worked_with,
      },
      secondary_services: [
        {
          secondary_services_id: secondary_services_id
            ? secondary_services_id
            : prevScreenData.primary_services,
          priority: 0,
        },
      ],
      primary_services:
        userData?.populatedTechnicianDetails?.services?.primary_services?._id,
      service_area_main_pincode: prevScreenData.service_area_secondary_pincode,
      address_details_permanent: {
        address_line: prevScreenData?.address_line,
        city: prevScreenData?.city,
        pincode: prevScreenData?.service_area_secondary_pincode,
        country: 'INDIA',
      },
      engagement_type: 'SALARIED',
      document_details: {
        aadhar_card_document: {
          front_side: s3aadhaarCardFront?.toString(),
          back_side: s3aadhaarCardBack?.toString(),
        },
        aadhar_number: data?.aadhar_number,
        pan_number: data?.pan_number,
        pan_card_document: s3panCard,
      },
      referenceDetails: {
        reference_person_name: prevScreenData?.reference_person_name,
        reference_person_mobile: prevScreenData?.reference_person_mobile,
      },
      annual_turnover: turnover,
      // engagement_type: service || []
    };
    console.log('complete', payload);
    setLoader(true);
    try {
      await axios({
        method: 'post',
        url: UPDATE_TECHNICIAN,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
        },
        data: payload,
      }).then(res => {
        console.log('This', res?.data);
        ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT);
        if (res?.status === 200) {
          try {
            axios({
              method: 'get',
              url: GET_USER_DETAILS,
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
              },
            }).then(res => {
              dispatch(
                setProfileImageUrl(
                  res?.data?.data?.userDetails?.personal_details
                    ?.profile_picture,
                ),
              );
              dispatch(setUserData(res?.data?.data));
            });
          } catch (err) {
            navigation.goBack();
          }
          setTimeout(function () {
            setQr(true);
          }, 800);
        } else {
          setLoader(false);
        }
      });
    } catch (error) {
      setLoader(false);
      ToastAndroid.show(
        error?.response?.data?.message + '!',
        ToastAndroid.SHORT,
      );
    }
  };
  const joining_bonus = async () => {
    console.log(
      'PAYLOAD_BONUS',
      userData?.userDetails?.personal_details?.phone?.mobile_number,
    );
    const payload = {
      userId:
        userData?.userDetails?.personal_details?.phone?.mobile_number?.toString(),
      amount: bonusAmount,
    };
    console.log('PAYLOAD', payload);
    try {
      const res = await axios({
        method: 'post',
        url: JOINING_BONUS,
        data: payload,
      });
      console.log('JOINIG', res.data);
      dispatch(
        setUserId(
          userData?.userDetails?.personal_details?.phone?.mobile_number,
        ),
      );
      setBonusModal(true);
    } catch (error) {
      console.log('EROR', error?.response?.data?.message);
    }
  };
  const uploadImageForPanCard = (uploadType, imageType) => {
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 720,
        width: 1280,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(panCard => {
        setPanCard(panCard);
        setVisible(false);
      });
    } else if (uploadType === 'gallery') {
      ImagePicker.openPicker({
        height: 720,
        width: 1280,

        cropping: true,
        compressImageQuality: 0.7,
      }).then(panCard => {
        setPanCard(panCard);
        setVisible(false);
      });
    }
  };
  useEffect(() => {
    if (panCard) {
      uploadImagePan();
    }
  }, [panCard]);

  const uploadImagePan = async () => {
    if (panCard) {
      setLoader(true);
      var data = new FormData();
      data.append('aadhar', {
        uri: panCard.path,
        name: panCard.path.split('/').pop(),
        type: panCard.mime,
        height: panCard.height,
        width: panCard.width,
      });
      try {
        const response = await fetch(TECHNICIAN_PAN_CARD, {
          method: 'post',
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
          },
          body: data,
          mode: 'cors',
        });
        let _data = await response.json();
        sets3PanCard(_data?.data?.fileSavedUrl.toString());
        if (_data.status === 200) {
          setLoader(false);
          ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      Alert.alert('Error!', 'Upload Pan Image!');
    }
  };

  // Aadhar Card Front Picture Upload Logic
  const uploadImageForAadhaarFront = (uploadType, imageType) => {
    console.log('Here');
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 720,
        width: 1280,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(aadhaarCardFront => {
        setAadhaarCardFront(aadhaarCardFront);
        setAadhaarVisible(false);
      });
    } else if (uploadType === 'gallery') {
      ImagePicker.openPicker({
        height: 720,
        width: 1280,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(aadhaarCardFront => {
        setAadhaarCardFront(aadhaarCardFront);
        setAadhaarVisible(false);
      });
    }
  };

  useEffect(() => {
    if (aadhaarCardFront) {
      uploadImageFront();
    }
  }, [aadhaarCardFront]);

  const uploadImageFront = async () => {
    if (aadhaarCardFront) {
      setLoader(true);
      var data = new FormData();
      data.append('aadhar', {
        uri: aadhaarCardFront.path,
        name: aadhaarCardFront.path.split('/').pop(),
        type: aadhaarCardFront.mime,
        height: aadhaarCardFront.height,
        width: aadhaarCardFront.width,
      });
      try {
        const response = await fetch(AADHAR_FRONT_IMAGE, {
          method: 'post',
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
          },
          body: data,
          mode: 'cors',
        });
        let _data = await response.json();
        // setImageResponse(_data);
        dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
        sets3AadhaarCardFront(_data?.data?.fileSavedUrl.toString());
        if (_data.status === 200) {
          setLoader(false);
          ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      Alert.alert('Error!', 'Upload Aadhar Front Image!');
    }
  };

  const uploadImageForAadhaarBack = (uploadType, imageType) => {
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 720,
        width: 1280,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(aadhaarCardBack => {
        setAadhaarCardBack(aadhaarCardBack);
        setAadhaarBackVisible(false);
      });
    } else if (uploadType === 'gallery') {
      ImagePicker.openPicker({
        height: 720,
        width: 1280,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(aadhaarCardBack => {
        setAadhaarCardBack(aadhaarCardBack);
        setAadhaarBackVisible(false);
      });
    }
  };

  useEffect(() => {
    if (aadhaarCardBack) {
      uploadImageBack();
    }
  }, [aadhaarCardBack]);

  const uploadImageBack = async () => {
    if (aadhaarCardBack) {
      setLoader(true);
      var data = new FormData();
      data.append('aadhar', {
        uri: aadhaarCardBack.path,
        name: aadhaarCardBack.path.split('/').pop(),
        type: aadhaarCardBack.mime,
        height: aadhaarCardBack.height,
        width: aadhaarCardBack.width,
      });
      try {
        const response = await fetch(AADHAR_BACK_IMAGE, {
          method: 'post',
          config: {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json',
            },
          },
          body: data,
          mode: 'cors',
        });
        let _data = await response.json();
        // setImageResponse(_data);
        dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
        sets3AadhaarCardBack(_data?.data?.fileSavedUrl.toString());
        if (_data.status === 200) {
          setLoader(false);
          ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      Alert.alert('Error!', 'Upload Aadhar Back Image!');
    }
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={loader}>
        <View
          style={{
            height: height,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <ActivityIndicator animating={loader} size="large" />
        </View>
      </Modal>
      <Modal
        visible={aadhaarVisible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => setAadhaarVisible(false)}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForAadhaarFront('camera', 'aadhaarCardFront')
              }>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => uploadImageForAadhaarFront('gallery', 'panCard')}>
              <Text style={styles.modal_text}>Select Image from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={aadhaarBackVisible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => {
          setAadhaarBackVisible(false);
        }}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForAadhaarBack('camera', 'aadhaarCardBack')
              }>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForAadhaarBack('gallery', 'aadhaarCardBack')
              }>
              <Text style={styles.modal_text}>Select Image from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={visible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => uploadImageForPanCard('camera', 'panCard')}>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => uploadImageForPanCard('gallery', 'panCard')}>
              <Text style={styles.modal_text}>Select Image from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar barStyle="light-content" backgroundColor="#00796A" />
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={{height: 60}}></View>
              <View>
                <Text
                  style={{
                    fontFamily: 'poppins-semibold',
                    color: '#000',
                    fontSize: 20,
                    marginVertical: 10,
                  }}>
                  Generate QR
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    height: height / (4 * 6),
                    alignItems: 'center',
                  }}>
                  <Progress.Bar
                    progress={0.66}
                    width={200}
                    color={'#00796A'}
                    animated={true}
                    animationType="spring"
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      fontFamily: 'poppins-semibold',
                      color: '#000',
                    }}>
                    66%
                  </Text>
                </View>
                <View style={styles.picture}>
                  <Image
                    source={
                      profile_picture ? {uri: profile_picture} : cameraImg
                    }
                    style={
                      profile_picture
                        ? {height: 75, width: 75, borderRadius: 10}
                        : {height: '50%', width: '50%'}
                    }
                  />
                </View>
              </View>
              {/* Aadhaar Card */}
              <View>
                <Text style={styles.headline}>
                  Aadhaar Card<Text style={styles.star}>*</Text>
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.fullinput}
                      onBlur={onBlur}
                      placeholder="Enter Aadhaar number"
                      placeholderTextColor={'grey'}
                      onChangeText={value => onChange(value)}
                      value={value}
                      keyboardType="numeric"
                      autoCapitalize="characters"
                    />
                  )}
                  name="aadhar_number"
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 12,
                    maxLength: 12,
                    pattern: {
                      value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
                      message: 'Please enter a number',
                    },
                  }}
                />
                {errors.aadhar_number?.type === 'pattern' && (
                  <Text style={{color: 'red'}}>
                    Aadhaar number should be numeric!
                  </Text>
                )}
                {errors.aadhar_number?.type === 'required' && (
                  <Text style={{color: 'red'}}>
                    Aadhaar number is required!
                  </Text>
                )}
                {errors.aadhar_number?.type === 'minLength' && (
                  <Text style={{color: 'red'}}>Enter valid aadhaar number</Text>
                )}
                {errors.aadhar_number?.type === 'maxLength' && (
                  <Text style={{color: 'red'}}>Enter valid aadhaar number</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  style={styles.uploadbox}
                  onPress={() => setAadhaarVisible(true)}>
                  {s3aadhaarCardFront ? (
                    <View style={{flexGrow: 1, backgroundColor: 'green'}}>
                      <TouchableOpacity
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 10,
                          backgroundColor: 'red',
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          zIndex: 10,
                        }}
                        onPress={() => sets3AadhaarCardFront()}>
                        <Image
                          style={{
                            alignSelf: 'center',
                            height: 15,
                            width: 15,
                            zIndex: 20,
                          }}
                          source={cross}
                        />
                      </TouchableOpacity>
                      <View>
                        <Image
                          style={[
                            styles.upload,
                            {
                              height: '100%',
                              width: '100%',
                              alignSelf: 'flex-end',
                              left: 10,
                            },
                          ]}
                          source={{
                            uri: s3aadhaarCardFront,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  ) : (
                    <>
                      <Image
                        style={styles.upload}
                        source={require('../images/upload.png')}
                      />
                      <Text style={styles.uploadtext}>Upload Front</Text>
                    </>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadbox}
                  onPress={() => setAadhaarBackVisible(true)}>
                  {s3aadhaarCardBack ? (
                    <View style={{flexGrow: 1, backgroundColor: 'green'}}>
                      <TouchableOpacity
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 10,
                          backgroundColor: 'red',
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          zIndex: 10,
                        }}
                        onPress={() => sets3AadhaarCardBack()}>
                        <Image
                          style={{
                            alignSelf: 'center',
                            height: 15,
                            width: 15,
                            zIndex: 20,
                          }}
                          source={cross}
                        />
                      </TouchableOpacity>
                      <View>
                        <Image
                          style={[
                            styles.upload,
                            {
                              height: '100%',
                              width: '100%',
                              alignSelf: 'flex-end',
                              left: 10,
                            },
                          ]}
                          source={{
                            uri: s3aadhaarCardBack,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  ) : (
                    <>
                      <Image
                        style={styles.upload}
                        source={require('../images/upload.png')}
                      />
                      <Text style={styles.uploadtext}>Upload Back</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              {/* PAN Number */}
              <View>
                <Text style={styles.headline}>
                  PAN Number<Text style={styles.star}>*</Text>
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.fullinput}
                      onBlur={onBlur}
                      placeholder="Enter PAN number"
                      placeholderTextColor={'grey'}
                      onChangeText={value => onChange(value)}
                      value={value}
                      keyboardType="name-phone-pad"
                      autoCapitalize="characters"
                    />
                  )}
                  name="pan_number"
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    pattern: {
                      value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
                      message: 'Please enter a number',
                    },
                  }}
                />
                {errors.pan_number?.type === 'pattern' && (
                  <Text style={{color: 'red'}}>
                    You are entering wrong PAN!
                  </Text>
                )}
                {errors.pan_number?.type === 'required' && (
                  <Text style={{color: 'red'}}>PAN number is required!</Text>
                )}
                {errors.pan_number?.type === 'minLength' && (
                  <Text style={{color: 'red'}}>Enter valid PAN number</Text>
                )}
                {errors.pan_number?.type === 'maxLength' && (
                  <Text style={{color: 'red'}}>Enter valid PAN number</Text>
                )}
              </View>
              <View>
                <Text style={styles.headline}>
                  Upload PAN Card<Text style={styles.star}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.pan_upload}
                  onPress={() => setVisible(true)}>
                  {s3panCard ? (
                    <View style={{flexGrow: 1, backgroundColor: 'green'}}>
                      <TouchableOpacity
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          zIndex: 10,
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => sets3PanCard()}>
                        <Image
                          style={{
                            alignSelf: 'center',
                            height: 20,
                            width: 20,
                            zIndex: 20,
                            resizeMode: 'stretch',
                          }}
                          source={cross}
                        />
                      </TouchableOpacity>
                      <View>
                        <Image
                          style={[
                            styles.upload,
                            {
                              height: '100%',
                              width: '100%',
                              alignSelf: 'flex-end',
                              left: 10,
                            },
                          ]}
                          source={{
                            uri: s3panCard,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  ) : (
                    <>
                      <Image
                        style={styles.upload}
                        source={require('../images/upload.png')}
                      />
                      <Text style={styles.uploadtext}>Upload</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headline}>UPI ID</Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.fullinput}
                      onBlur={onBlur}
                      placeholder="Enter your valid UPI ID"
                      placeholderTextColor={'grey'}
                      onChangeText={value => onChange(value)}
                      value={value}
                      keyboardType="email-address"
                    />
                  )}
                  name="upi_id"
                  defaultValue=""
                  // rules={{
                  //   required: true, pattern: {
                  //     value: /[a-zA-Z0-9\.\-]\@[a-zA-Z][a-zA-Z]/,
                  //     message: 'Please enter a number',
                  //   }
                  // }}
                />
                {errors.upi_id?.type === 'pattern' && (
                  <Text style={{color: 'red'}}> Enter valid UPI ID</Text>
                )}
                {errors.upi_id?.type === 'required' && (
                  <Text style={{color: 'red'}}>UPI ID is required!</Text>
                )}
              </View>
              <View>
                <Text style={styles.headline}>GST Number</Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.fullinput}
                      onBlur={onBlur}
                      placeholder="Enter GST number"
                      placeholderTextColor={'grey'}
                      onChangeText={value => onChange(value)}
                      value={value}
                    />
                  )}
                  name="gst"
                  defaultValue=""
                  // rules={{
                  //   required: true, minLength: 15, maxLength: 15, pattern: {
                  //     value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  //     message: 'Please enter a number',
                  //   }
                  // }}
                />
              </View>
              <View>
                <Text style={styles.headline}>
                  Annual Turnover<Text style={styles.star}>*</Text>
                </Text>
                <TouchableOpacity style={styles.fullinput}>
                  <Picker
                    selectedValue={turnover}
                    onValueChange={itemValue => setturnover(itemValue)}>
                    <Picker.Item
                      label="< 1 Lakh"
                      value={100000}
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        multiline: true,
                        numberOfLines: 1,
                        color: 'black',
                      }}
                    />
                    <Picker.Item
                      label="1 - 5 Lakhs"
                      value={500000}
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        multiline: true,
                        numberOfLines: 1,
                        color: 'black',
                      }}
                    />
                    <Picker.Item
                      label="5 - 10 Lakhs"
                      value={1000000}
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        multiline: true,
                        numberOfLines: 1,
                        color: 'black',
                      }}
                    />
                    <Picker.Item
                      label="> 10 Lakhs"
                      value={1500000}
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        multiline: true,
                        numberOfLines: 1,
                        color: 'black',
                      }}
                    />
                  </Picker>
                </TouchableOpacity>
              </View>
              {/* Button */}
              <TouchableOpacity
                onPress={handleSubmit(onsubmit)}
                style={{
                  width: '100%',
                  backgroundColor: '#00796A',
                  borderRadius: 4,
                  marginTop: 20,
                }}>
                <Text style={styles.btn}>Generate QR (15 Days Trial)</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <View style={{width: '5%', marginHorizontal: 10}}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../images/info.png')}
                  />
                </View>
                <View style={{width: '95%'}}>
                  <Text
                    style={{
                      fontFamily: 'poppins-regular',
                      color: '#000',
                      fontSize: 13,
                    }}>
                    Complete 20 Jobs* to get new leads/ customers from OniT
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Modal animationType="fade" transparent={true} visible={qr}>
        <View
          style={{
            height: height,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 12,
              width: '60%',
              alignSelf: 'center',
              fontFamily: 'poppins-medium',
              textAlign: 'center',
            }}>
            Scan QR and book Ticket for
            <Text style={{fontSize: 20, color: '#00796A'}}>
              {'\n' + userData?.userDetails?.center_id[0]?.center_name + '\n'}
            </Text>{' '}
            @ Zero Charges
          </Text>
          <QRCode
            value={`https://app.onit.services/#/booking/${QRID}`}
            // value={`http://facebook.github.io/react-native/`}
            size={200}
            // bgColor="white"
            // fgColor="black"
            getRef={img => {
              img?.toDataURL(url);
            }}
          />
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: '#00796A',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
            onPress={onShare}>
            <Image
              style={{width: 22, height: 22, marginHorizontal: 2}}
              source={share}
            />
          </TouchableOpacity>
          <TouchableNativeFeedback onPress={() => joining_bonus()}>
            <View
              style={{
                width: '90%',
                backgroundColor: '#00796A',
                borderRadius: 4,
                marginTop: 80,
              }}>
              <Text style={styles.btn}>Go to Dashboard</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={bonusModal}>
        <View
          style={{
            height: height,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.MODAL_BACKGROUND,
            elevation: 10,
          }}>
          <View
            style={{
              height: height / 2,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.WHITE,
            }}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 16,
                width: '60%',
                alignSelf: 'center',
                fontFamily: 'poppins-medium',
                textAlign: 'center',
              }}>
              {`Hurrah! Your wallet is added with Rs ${bonusAmount} successfully!`}
            </Text>

            <TouchableNativeFeedback
              onPress={() => {
                setBonusModal(false);
                dispatch(authorizedLogin());
              }}>
              <View
                style={{
                  width: '90%',
                  backgroundColor: '#00796A',
                  borderRadius: 4,
                  marginTop: 80,
                }}>
                <Text style={styles.btn}>Okay</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  picture: {
    height: 75,
    width: 75,
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
    position: 'absolute',
    top: 8,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfinput: {
    borderRadius: 4,
    marginTop: 10,
    width: '48%',
    height: 60,
    borderWidth: 1,
    borderColor: '#00796A',
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  fullinput: {
    borderRadius: 4,
    marginTop: 10,
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#00796A',
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  headline: {
    fontSize: 18,
    fontFamily: 'poppins-semibold',
    color: '#000',
    marginTop: 25,
  },
  star: {
    color: 'red',
  },
  halfview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poppins-semibold',
    alignSelf: 'center',
    paddingVertical: 14,
  },
  uploadbox: {
    backgroundColor: '#F1F1F1',
    height: 88,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    flexDirection: 'row',
  },
  uploadtext: {
    fontFamily: 'poppins-regular',
    color: '#000',
  },
  upload: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
  },
  pan_upload: {
    marginTop: 10,
    height: 88,
    width: '100%',
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
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
    borderBottomWidth: 0.5,
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
