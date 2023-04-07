import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Keyboard,
  Modal,
  TouchableNativeFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
// import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {Controller, useForm} from 'react-hook-form';
// import DatePicker from 'react-native-date-picker';
import {LogBox} from 'react-native';
import cross from '../images/cross.png';
import axios from 'axios';
import PhoneInput from 'react-native-phone-number-input';
import {COLORS} from '../utils/constants';
import {
  AADHAR_BACK_IMAGE,
  AADHAR_FRONT_IMAGE,
  CREATE_NEW_TECHNICIAN,
  GET_ALL_SERVICES,
  TECHNICIAN_PAN_CARD,
  TECHNICIAN_PROFILE_PICTURE,
} from '../utils/endpoints';
import DateTimePicker from 'react-native-modal-datetime-picker';
LogBox.ignoreLogs(['VirtualizedLists']);

const {width, height} = Dimensions.get('window');

export const AddTechnician = ({navigation}) => {
  const {accessToken, userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const [visible, setVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [loader, setLoader] = useState(false);
  const [allServices, setAllServices] = useState();
  const [serviceModal, setServiceModal] = useState(false);
  const [secondaryService, setSecondaryService] = useState();
  const [Enable, setEnable] = useState([]);
  const [brand, setBrand] = useState();
  const [service, setService] = useState([]);
  const serviceRef = useRef();
  const [aadhaarCardFront, setAadhaarCardFront] = useState();
  const [aadhaarCardBack, setAadhaarCardBack] = useState();
  const [s3aadhaarCardFront, sets3AadhaarCardFront] = useState();
  const [s3aadhaarCardBack, sets3AadhaarCardBack] = useState();
  const [panCard, setPanCard] = useState();
  const [aadhaarVisible, setAadhaarVisible] = useState(false);
  const [aadhaarBackVisible, setAadhaarBackVisible] = useState(false);
  const [s3ProfileImage, setS3ProfileImage] = useState();
  const [s3panCard, sets3PanCard] = useState();
  const [turnover, setturnover] = useState(0);
  const [panVisible, setPanVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const primaryPhoneInputRef = useRef();
  const alternatePhoneInputRef = useRef();
  // console.log(userData?.userDetails?.services?.primary_services?._id)

  const onsubmit = async data => {
    const payload = {
      personal_details: {
        email: data?.email,
        about: data?.work_experience,
        name: data?.name,
        phone: {
          country_code: '+' + primaryPhoneInputRef.current?.getCallingCode(),
          mobile_number: data.primary_mobile_number,
        },
        profile_picture: s3ProfileImage,
      },
      // secondary_services:
      //     [{
      //         secondary_services_id: secondaryService._id,
      //         priority: 0
      //     }],
      primary_services: userData?.userDetails?.services?.primary_services?._id,
      service_area_main_pincode: data?.service_area_secondary_pincode,
      //service_area_secondary_pincode: [service_area_secondary_pincode],
      address_details_permanent: {
        address_line: data?.address_line,
        city: data?.city,
        pincode: data?.service_area_secondary_pincode,
        country: 'INDIA',
      },
      engagement_type: 'SALARIED',
      document_details: {
        aadhar_card_document: {
          front_side: s3aadhaarCardFront?.toString(),
          back_side: s3aadhaarCardBack?.toString(),
        },
        aadhar_number: data?.aadhar_number,
        pan_number: data?.pan,
      },
      referenceDetails: {
        reference_person_name: data?.reference_person_name,
        reference_person_mobile: data?.reference_person_mobile,
      },
    };
    console.log('seeeee',data);
    setLoader(true);
    try {
      await axios({
        method: 'post',
        url: CREATE_NEW_TECHNICIAN,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
        },
        data: payload,
      }).then(res => {
        console.log('This', res?.data);
        ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT);
        if (res?.status === 200) {
          navigation.goBack();
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
  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(GET_ALL_SERVICES);
      setAllServices(res.data.data);
    };
    fetchServices();
  }, []);
  const GET_CITY = async () => {
    console.log(pin)
    try {
      const res = await axios({
        url: `https://api.postalpincode.in/pincode/${pin}`
      })
      setCity(res.data[0]?.PostOffice[0]?.District)
      setState(res.data[0]?.PostOffice[0]?.State)
      console.log('CITYs', city)
    } catch (error) {
      console.log('GERROR', error)
    }
  }
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
        //dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
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
        //setImageResponse(_data);
        //dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
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
        //setImageResponse(_data);
        //dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
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

  useEffect(() => {
    if (profilePicture) {
      uploadImage();
    }
  }, [profilePicture]);

  const onSelectedItemsChange = selectedItems => {
    setService(selectedItems);
  };

  const uploadImageForProfilePicture = (uploadType, imageType) => {
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 400,
        width: 400,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(profilePicture => {
        setProfilePicture(profilePicture);
        setVisible(false);
      });
    } else if (uploadType === 'gallery') {
      ImagePicker.openPicker({
        height: 400,
        width: 400,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(profilePicture => {
        setProfilePicture(profilePicture);
        setVisible(false);
      });
    }
  };

  useEffect(() => {
    if (profilePicture) {
      uploadImage();
    }
  }, [profilePicture]);
  const uploadImage = async () => {
    if (profilePicture) {
      setLoader(true);
      var data = new FormData();
      data.append('aadhar', {
        uri: profilePicture.path,
        name: profilePicture.path.split('/').pop(),
        type: profilePicture.mime,
        height: profilePicture.height,
        width: profilePicture.width,
      });
      try {
        const response = await fetch(TECHNICIAN_PROFILE_PICTURE, {
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
        setS3ProfileImage(_data?.data?.fileSavedUrl.toString());
        if (_data.status === 200) {
          setLoader(false);
          ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
        ToastAndroid.show('Error! Please Try again!', ToastAndroid.SHORT);
      }
    } else {
      Alert.alert('Error!', 'Upload Profile Image!');
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForProfilePicture('camera', 'profilePicture')
              }>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={serviceModal}
        onRequestClose={() => setServiceModal(!serviceModal)}>
        <TouchableOpacity
          style={{
            height: height,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => setServiceModal(!serviceModal)}>
          <View
            style={{
              height: height / 2,
              width: width / 1.2,
              backgroundColor: 'white',
              zIndex: 10,
            }}>
            <ScrollView>
              {allServices &&
                allServices.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setSecondaryService(item);
                      setServiceModal(false);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        padding: 10,
                      }}
                      //
                    >
                      {item.service_name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
        onRequestClose={() => setAadhaarBackVisible(false)}>
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
        visible={panVisible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => setPanVisible(false)}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => {
                uploadImageForPanCard('camera', 'panCard'),
                  setPanVisible(false);
              }}>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => {
                uploadImageForPanCard('gallery', 'panCard'),
                  setPanVisible(false);
              }}>
              <Text style={styles.modal_text}>Select Image from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={visible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForProfilePicture('camera', 'profilePicture')
              }>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForProfilePicture('gallery', 'profilePicture')
              }>
              <Text style={styles.modal_text}>Select Image from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle="light-content" backgroundColor="#00796A" />
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: StatusBar.currentHeight,
            }}>
            <Text
              style={{
                fontFamily: 'poppins-semibold',
                color: '#000',
                fontSize: 20,
                marginTop: 20,
                marginVertical: 10,
              }}>
              Add New Technician
            </Text>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{width: '48%'}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      placeholderTextColor={COLORS.LIGHT_BORDER}
                      style={[styles.fullinput]}
                      onBlur={onBlur}
                      placeholder="Name"
                      onChangeText={value => onChange(value)}
                      value={value}
                      autoCapitalize="characters"
                    />
                  )}
                  name="name"
                  defaultValue=""
                  rules={{required: true}}
                />
                {errors.name && (
                  <Text style={{color: 'red'}}>Name is required!</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.picture}
                onPress={() => setVisible(true)}>
                {s3ProfileImage ? (
                  <Image
                    style={[styles.picture, {height: '100%', width: '100%'}]}
                    source={{
                      uri: s3ProfileImage,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Image
                      style={[{height: '50%', width: '50%'}]}
                      source={require('../images/camera2.png')}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.halfview}>
              <View style={{width: '48%'}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TouchableOpacity
                      style={[
                        styles.halfinput,
                        {alignItems: 'center', justifyContent: 'center'},
                      ]}
                      onPress={() => setOpen(true)}
                      onBlur={onBlur}>
                      <Text
                        style={{
                          fontFamily: 'poppins-medium',
                          fontSize: 16,
                          color: 'grey',
                        }}>
                        {value ? moment(value).format('LL') : 'Date of Birth'}
                      </Text>
                      {/* <DatePicker
                        modal
                        mode="date"
                        format="YYYY-MM-DD"
                        open={open}
                        maximumDate={moment().subtract(18, 'years')._d}
                        date={value || moment().subtract(18, 'years')._d}
                        onConfirm={date => {
                          setOpen(false);
                          onChange(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                        textColor="#00796A"
                      /> */}
                      <DateTimePicker
                        isVisible={open}
                        mode="date"
                        onConfirm={date => {
                          setOpen(false);
                          onChange(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                        maximumDate={moment().subtract(18, 'years')._d}
                        date={value || moment().subtract(18, 'years')._d}
                      />
                    </TouchableOpacity>
                  )}
                  name="dob"
                  defaultValue={undefined}
                />
              </View>

              {/* <TouchableOpacity style={[styles.halfinput, { width: "48%" }]}>
                                <Picker
                                    selectedValue={Enable}
                                    onValueChange={(itemValue) => setEnable(itemValue)}
                                >

                                    <Picker.Item label="Work Experience" value="work" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                    <Picker.Item label="0-1 Year" value="0-2" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                    <Picker.Item label="1-3 Year" value="1-3" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                    <Picker.Item label="3-5 Year" value="3-5" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                    <Picker.Item label="3-5 Year" value="3-5" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                    <Picker.Item label="5-10 Year" value="5-10" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                    <Picker.Item label=">10 Year" value="10" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                                </Picker>
                            </TouchableOpacity> */}
            </View>
            {/* Complete Address */}
            <View>
              <Text style={styles.headline}>
                Delivery Address<Text style={styles.star}>*</Text>
              </Text>
              <View>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      placeholderTextColor={COLORS.LIGHT_BORDER}
                      style={styles.fullinput}
                      onBlur={onBlur}
                      placeholder="Address Line 1"
                      onChangeText={value => onChange(value)}
                      value={value}
                      autoCapitalize="characters"
                      maxLength={50}
                    />
                  )}
                  name="address_line"
                  defaultValue=""
                  rules={{required: true}}
                />
                {errors.address_line && (
                  <Text style={{color: 'red'}}>
                    Address Line 1 is required!
                  </Text>
                )}
              </View>
                <View style={styles.halfview}>
                  <View style={{width: '48%'}}>
                    <Controller
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => {
                        if(value.length === 6){
                          setPin(value)
                          GET_CITY()
                        }
                        return(
                        <TextInput
                          style={{
                            borderRadius: 4,
                            marginTop: 10,
                            height: 60,
                            borderWidth: 1,
                            borderColor: '#00796A',
                            fontFamily: 'poppins-medium',
                            fontSize: 16,
                            color: '#000',
                          }}
                          onBlur={onBlur}
                          placeholder="Area Pincode"
                          onChangeText={value => onChange(value)}
                          value={value}
                          keyboardType="numeric"
                        />
                      )}}
                      name="service_area_secondary_pincode"
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 6,
                        maxLength: 6,
                        pattern: {
                          value: /^[1-9]{1}[0-9]{2}[0-9]{3}$/,
                          message: 'Please enter a number',
                        },
                      }}
                    />
                    {errors.service_area_secondary_pincode?.type ===
                      'pattern' && (
                      <Text style={{color: 'red'}}>Enter valid PIN code.</Text>
                    )}
                    {errors.service_area_secondary_pincode?.type ===
                      'required' && (
                      <Text style={{color: 'red'}}>Pincode is required.</Text>
                    )}
                    {errors.service_area_secondary_pincode?.type ===
                      'minLength' && (
                      <Text style={{color: 'red'}}>Enter valid PIN code.</Text>
                    )}
                    {errors.service_area_secondary_pincode?.type ===
                      'maxLength' && (
                      <Text style={{color: 'red'}}>Enter valid PIN code.</Text>
                    )}
                  </View>
                  <View style={{width: '48%'}}>
                    <Controller
                      control={control}
                    
                      render={({field: {onChange, onBlur, value}}) => {
                        if(city.length !== 0){
                          value = city
                          console.log('city',value)
                        }
                        return(
                        <TextInput
                          style={{
                            borderRadius: 4,
                            marginTop: 10,
                            height: 60,
                            borderWidth: 1,
                            borderColor: '#00796A',
                            fontFamily: 'poppins-medium',
                            fontSize: 16,
                            color: '#000',
                          }}
                          onBlur={onBlur}
                          placeholder="City"
                          onChangeText={value => onChange(value)}
                          value={value}
                          autoCapitalize="characters"
                          maxLength={50}
                          defaultValue={value}
                          editable={city.length == 0 ? false : true}
                        />
                      )}}
                      name="city"
                      defaultValue={city}
                    //   if(defaultValue==)
                      
                      rules={{required: city.length == 0 ? false : true}}
                    />
                    {(errors.city) && (
                      <Text style={{color: 'red'}}>City is required!</Text>
                    )}
                  </View>
                </View>
            </View>
            {/* Information */}
            <View>
              <Text style={styles.headline}>
                Information<Text style={styles.star}>*</Text>
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <PhoneInput
                    ref={primaryPhoneInputRef}
                    value={value}
                    defaultCode="IN"
                    placeholder="Mobile Number"
                    textInputStyle={{
                      color: 'grey',
                    }}
                    onChangeText={text => {
                      onChange(text);
                    }}
                    withDarkTheme={false}
                    withShadow
                    containerStyle={{
                      borderWidth: 1.2,
                      borderColor: '#00796A',
                      color: '#000',
                      borderRadius: 4,
                      fontFamily: 'poppins-semibold',
                      fontSize: 16,
                      marginBottom: 10,
                      width: '100%',
                    }}
                    textInputProps={{placeholderTextColor: 'grey'}}
                  />
                )}
                name="primary_mobile_number"
                defaultValue=""
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: 'Enter valid phone number!',
                  },
                }}
              />
              {errors.primary_mobile_number?.type === 'pattern' && (
                <Text style={{color: 'red'}}>Enter a valid mobile number!</Text>
              )}
              {errors.primary_mobile_number?.type === 'required' && (
                <Text style={{color: 'red'}}>Mobile number is required!</Text>
              )}
              <View>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      placeholderTextColor={COLORS.LIGHT_BORDER}
                      style={styles.fullinput}
                      onBlur={onBlur}
                      placeholder="Email Address"
                      onChangeText={value => onChange(value)}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="characters"
                    />
                  )}
                  name="email"
                  defaultValue=""
                  rules={{
                    pattern: {
                      value: 
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Please enter your email address',
                    },
                  }}
                />
                {errors.email?.type === 'pattern' && (
                  <Text style={{color: 'red'}}>Enter a valid email</Text>
                )}
              </View>
            </View>
            {/* Reference person details (if any) */}
            <Text style={styles.headline}>Reference person deatils (mandatory)</Text>
            <View>
              <View style={styles.halfview}>
                <View style={{width: '48%'}}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        placeholderTextColor={COLORS.LIGHT_BORDER}
                        style={styles.halfinput}
                        onBlur={onBlur}
                        placeholder="Name"
                        onChangeText={value => onChange(value)}
                        value={value}
                        autoCapitalize="characters"
                      />
                    )}
                    name="reference_person_name"
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                  />
                  {errors.reference_person_name?.type === 'required' && (
                    <Text style={{color: 'red', fontSize: 13}}>
                      Reference person is required!
                    </Text>
                  )}
                </View>
                <View style={{width: '48%'}}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        placeholderTextColor={COLORS.LIGHT_BORDER}
                        style={styles.halfinput}
                        onBlur={onBlur}
                        placeholder="Phone Number"
                        onChangeText={value => onChange(value)}
                        value={value}
                        autoCapitalize="characters"
                        keyboardType='numeric'
                      />
                    )}
                    name="reference_person_mobile"
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: {
                        value:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: 'Enter valid phone number!',
                      },
                    }}
                  />
                  {errors.reference_person_mobile?.type === 'required' && (
                    <Text style={{color: 'red', fontSize: 13}}>
                      Mobile number is required!
                    </Text>
                  )}
                  {errors.reference_person_mobile?.type === 'pattern' && (
                    <Text style={{color: 'red'}}>Enter a valid number</Text>
                  )}
                </View>
              </View>
            </View>
            {/* <View>
                            <View>
                                <Text style={styles.headline}>Other Service</Text>
                                <TouchableOpacity
                                    style={[styles.fullinput, { height: 60, justifyContent: "center" }]}
                                    onPress={() => setServiceModal(true)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            fontFamily: "poppins-semibold",
                                            marginLeft:10
                                        }}
                                    >
                                        {
                                            secondaryService?.service_name ?
                                                secondaryService?.service_name.split("-")[0] :
                                                "Select"
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        borderRadius: 4,
                                        marginTop: 10,
                                        width: '100%',
                                        height: "auto",
                                        borderWidth: 1,
                                        borderColor: '#00796A',
                                        fontFamily: 'poppins-medium',
                                        fontSize: 16,
                                        color: '#000',
                                        padding: 10
                                    }}
                                >
                                    <MultiSelect
                                        hideTags
                                        items={K_OPTIONS}
                                        uniqueKey="id"
                                        ref={serviceRef}
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={service}
                                        selectText="I am"
                                        searchInputPlaceholderText="Search Items..."
                                        onChangeInput={(text) => console.log(text)}
                                        altFontFamily="poppins-semibold"
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{ color: '#CCC' }}
                                        hideSubmitButton={true}
                                        styleTextDropdown={{ fontSize: 16, color: "black", fontFamily: "poppins-semibold" }}
                                    />
                                    <View
                                        style={{ flexDirection: "row", marginLeft: 10, justifyContent: "center" }}
                                    >
                                        {
                                            service && service.map(item => (
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: "black",
                                                        fontFamily: "poppins-semibold",
                                                        marginRight: 4,
                                                        borderRadius: 4,
                                                        marginTop: 10,
                                                        height: "auto",
                                                        borderWidth: 1,
                                                        borderColor: '#00796A',
                                                        fontFamily: 'poppins-medium',
                                                        fontSize: 12,
                                                        color: '#000',
                                                        padding: 10
                                                    }}
                                                >
                                                    {item.replace(/./, c => c.toUpperCase())}
                                                </Text>
                                            ))
                                        }

                                    </View>
                                </View>

                            </View>
                        </View> */}
            <View style={{width: '100%', alignSelf: 'center'}}>
              {/* Aadhaar Card */}
              <View>
                <Text style={styles.headline}>
                  Aadhaar Card<Text style={styles.star}>*</Text>
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      placeholderTextColor={COLORS.LIGHT_BORDER}
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
                      placeholderTextColor={COLORS.LIGHT_BORDER}
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
                  name="pan"
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
                {errors.pan?.type === 'pattern' && (
                  <Text style={{color: 'red'}}>
                    You are entering wrong PAN!
                  </Text>
                )}
                {errors.pan?.type === 'required' && (
                  <Text style={{color: 'red'}}>Pan number is required!</Text>
                )}
                {errors.pan?.type === 'minLength' && (
                  <Text style={{color: 'red'}}>Enter valid Pan number</Text>
                )}
                {errors.pan?.type === 'maxLength' && (
                  <Text style={{color: 'red'}}>Enter valid Pan number</Text>
                )}
              </View>
              <View>
                <Text style={styles.headline}>
                  Upload PAN Card<Text style={styles.star}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.pan_upload}
                  onPress={() => setPanVisible(true)}>
                  {s3panCard ? (
                    <View style={{flexGrow: 1, backgroundColor: 'green'}}>
                      <TouchableOpacity
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 10,
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          zIndex: 10,
                        }}
                        onPress={() => sets3PanCard()}>
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
              <View style={{height: 20}}></View>
            </View>
            {/* Button */}
            <TouchableNativeFeedback
              onPress={handleSubmit(onsubmit)}
              //onPress={() => navigation.navigate("GenerateQR")}
              //onPress={() => uploadImage()}
            >
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#00796A',
                  borderRadius: 4,
                }}>
                <Text style={styles.btn}>Create Technician</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={{height: 10}}></View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  picture: {
    height: 75,
    width: 75,
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfinput: {
    borderRadius: 4,
    marginTop: 10,
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#00796A',
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: COLORS.BLACK,
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
    color: COLORS.BLACK,
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
  selectedTextStyle: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingLeft: 10,
    marginTop: -2,
  },
  selectedTextStyle1: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '100%',
    color: 'black',
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
  },
  listTextStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  searchBarStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 5,
    elevation: 1,
    marginHorizontal: 10,
  },
  placeHolderTextStyle: {
    color: 'red',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownIconStyle: {
    width: 10,
    height: 10,
    left: -40,
    // marginTop: 20,
  },
  dropDownIconStyle1: {
    width: 10,
    height: 10,
    left: -40,
    marginTop: 15,
  },
  pickerStyle: {
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    height: 60,
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 2,
    elevation: 0.5,
  },
  pickerStyle1: {
    height: 60,
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 2,
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
