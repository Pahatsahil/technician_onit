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
  Modal,
  TouchableNativeFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from 'react-native-modal-datetime-picker';
import cross from '../images/cross.png';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {Controller, useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {xorBy} from 'lodash';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileImageUrl} from '../../redux-toolkit/slice';
import {useRef} from 'react';
import MultiSelect from 'react-native-multiple-select';
import {LogBox} from 'react-native';
import {
  GET_ALL_SERVICES,
  TECHNICIAN_COMPANY_WORKED_WITH_CERTIFICATE,
  TECHNICIAN_PROFILE_PICTURE,
} from '../utils/endpoints';
// import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from '../utils/constants';
LogBox.ignoreLogs(['VirtualizedLists']);

const {width, height} = Dimensions.get('window');
export default function GenerateQR({navigation}) {
  const {accessToken, isAuthorized, userData, profileImageUrl} = useSelector(
    state => state.auth,
  );
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
  const [imageResponse, setImageResponse] = useState();
  const [serviceModal, setServiceModal] = useState(false);
  const [secondaryService, setSecondaryService] = useState();
  const [Enable, setEnable] = useState([]);
  const [s3Certificate, sets3Certificate] = useState();
  const [certificateVisible, setCertificateVisible] = useState(false);
  const [certificate, setCertificate] = useState();
  const [brand, setBrand] = useState();
  const [s3ProfileImage, setS3ProfileImage] = useState();
  const [pin, setPin] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

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
  function deltaDate(input, days, months, years) {
    return new Date(
      input.getFullYear() + years,
      input.getMonth() + months,
      Math.min(
        input.getDate() + days,
        new Date(
          input.getFullYear() + years,
          input.getMonth() + months + 1,
          0,
        ).getDate(),
      ),
    );
  }

  let minDate = new Date(deltaDate(new Date(), 0, 0, -18));

  console.log(minDate);

  const uploadImageForCertificate = (uploadType, imageType) => {
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 720,
        width: 1280,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(_certificate => {
        setCertificate(_certificate);
        setCertificateVisible(false);
      });
    } else if (uploadType === 'gallery') {
      ImagePicker.openPicker({
        height: 720,
        width: 1280,

        cropping: true,
        compressImageQuality: 0.7,
      }).then(_certificate => {
        setCertificate(_certificate);
        setCertificateVisible(false);
      });
    }
  };
  useEffect(() => {
    if (certificate) {
      uploadCertificate();
    }
  }, [certificate]);

  const uploadCertificate = async () => {
    if (certificate) {
      setLoader(true);
      var data = new FormData();
      data.append('aadhar', {
        uri: certificate.path,
        name: certificate.path.split('/').pop(),
        type: certificate.mime,
        height: certificate.height,
        width: certificate.width,
      });
      try {
        const response = await fetch(
          TECHNICIAN_COMPANY_WORKED_WITH_CERTIFICATE,
          {
            method: 'post',
            config: {
              headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
              },
            },
            body: data,
            mode: 'cors',
          },
        );
        let _data = await response.json();
        setImageResponse(_data);
        dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()));
        sets3Certificate(_data?.data?.fileSavedUrl.toString());
        if (_data.status === 200) {
          setLoader(false);
          ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      Alert.alert('Error!', 'Upload Training/Experience/RPL Certificate!');
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(GET_ALL_SERVICES);
      setAllServices(res.data.data);
    };
    fetchServices();
  }, []);
  const uploadImageForProfilePicture = (uploadType, imageType) => {
    if (uploadType === 'camera') {
      ImagePicker.openCamera({
        height: 400,
        width: 400,
        cropping: true,
        compressImageQuality: 0.7,
      }).then(profilePicture => {
        if (imageType === 'profilePicture') {
          setProfilePicture(profilePicture);
          setVisible(false);
        }
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
        setImageResponse(_data);
        setS3ProfileImage(_data?.data?.fileSavedUrl.toString());
        if (_data.status === 200) {
          setLoader(false);
          ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoader(false);
        ToastAndroid.show('Error! Please Try again!', ToastAndroid.SHORT);
      }
    } else {
      Alert.alert('Error!', 'Upload Profile Image!');
    }
  };
  const onsubmit = data => {
    data.dob = moment(data?.dob).format('LL');
    if (s3ProfileImage) {
      console.log('cpROFILE', userData?.populatedTechnicianDetails?.center_id[0]?.qr_details
      ?.qr_id)
      if (s3Certificate) {
        navigation.navigate('GenerateQR', {
          data,
          secondary_services: secondaryService?._id,
          profile_picture: s3ProfileImage,
          company_worked_with: s3Certificate.toString(),
          QRID: userData?.populatedTechnicianDetails?.center_id[0]?.qr_details
            ?.qr_id,
        });
      } else {
        Alert.alert(
          'Error!',
          `Please Upload Training/Experience/RPL Certificate!`,
        );
      }
    } else {
      Alert.alert('Error!', `Please Upload Profile Image!`);
    }
  };

  return (
    <>
      <Modal
        visible={certificateVisible}
        transparent={true}
        style={styles.modal_style}
        onRequestClose={() => setCertificateVisible(false)}>
        <View style={styles.modal_view}>
          <View style={styles.modal_view2}>
            <Image
              style={styles.upload_image}
              source={require('../images/upload.png')}
            />
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() =>
                uploadImageForCertificate('camera', 'aadhaarCardFront')
              }>
              <Text style={styles.modal_text}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => uploadImageForCertificate('gallery', 'panCard')}>
              <Text style={styles.modal_text}>Select Image from gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
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
                allServices.map((item, index) => (
                  <TouchableOpacity
                    key={index}
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
                        color: COLORS.BLACK
                      }}
                    >
                      {item.service_name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
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
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: StatusBar.currentHeight,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                }}>
                <View style={{width: '70%'}}>
                  <Text
                    adjustsFontSizeToFit
                    style={{
                      fontFamily: 'poppins-semibold',
                      color: '#000',
                      fontSize: 17.5,
                      marginVertical: 10,
                    }}>
                    Complete your Profile
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: height / (4 * 6),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '15%',
                        height: 8,
                        backgroundColor: '#61FA79',
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                      }}></View>
                    <View
                      style={{
                        width: '30%',
                        height: 8,
                        backgroundColor: '#EBEBEB',
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                      }}></View>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontFamily: 'poppins-semibold',
                        color: '#000',
                      }}>
                      33%
                    </Text>
                  </View>
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
                      {/* <DatePicker
                        modal
                        mode="date"
                        open={open}
                        onConfirm={date => {
                          setOpen(false);
                          onChange(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                        textColor="#00796A"
                      /> */}
                      {/* <DatePicker
                        date={value || moment().subtract(18, 'years')._d}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate={moment().subtract(18, 'years')._d}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        // customStyles={{
                        //   dateIcon: {
                        //     position: 'absolute',
                        //     left: 0,
                        //     top: 4,
                        //     marginLeft: 0,
                        //   },
                        //   dateInput: {
                        //     marginLeft: 36,
                        //   },
                        //   // ... You can check the source to find the other keys.
                        // }}
                        onDateChange={date => {
                          setOpen(false);
                          onChange(date);
                        }}
                      /> */}
                    </TouchableOpacity>
                  )}
                  name="dob"
                  defaultValue={undefined}
                />
                <TouchableOpacity style={styles.halfinput}>
                  <Picker
                    selectedValue={Enable}
                    onValueChange={itemValue => setEnable(itemValue)}>
                    <Picker.Item
                      label="Work Experience"
                      value="work"
                      style={styles.dropDown}
                    />
                    <Picker.Item
                      label="0-1 Year"
                      value="0-2"
                      style={styles.dropDown}
                    />
                    <Picker.Item
                      label="1-3 Year"
                      value="1-3"
                      style={styles.dropDown}
                    />
                    <Picker.Item
                      label="3-5 Year"
                      value="3-5"
                      style={styles.dropDown}
                    />
                    <Picker.Item
                      label="3-5 Year"
                      value="3-5"
                      style={styles.dropDown}
                    />
                    <Picker.Item
                      label="5-10 Year"
                      value="5-10"
                      style={styles.dropDown}
                    />
                    <Picker.Item
                      label=">10 Year"
                      value="10"
                      style={styles.dropDown}
                    />
                  </Picker>
                </TouchableOpacity>
              </View>
              {/* Complete Address */}
              <View>
                <Text style={styles.headline}>
                  Communication Address<Text style={styles.star}>*</Text>
                </Text>
                <View>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
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
                          console.log(value)
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
                          editable={city.length == 0 ? false : true}
                        />
                      )}}
                      name="city"
                      defaultValue=""
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
                  Information
                  {/* <Text style={styles.star}>*</Text> */}
                </Text>
                <View>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
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
                          // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Please enter your email address',
                      },
                    }}
                  />
                  {errors.email?.type === 'pattern' && (
                    <Text style={{color: 'red'}}>Enter a valid email</Text>
                  )}
                </View>
                <Text
                  style={{
                    fontFamily: 'poppins-medium',
                    fontSize: 14,
                    color: '#000',
                    marginTop: 6,
                  }}>
                  Brand Company Worked with Certificate
                </Text>
                <TouchableOpacity
                  style={styles.uploadbox}
                  onPress={() => setCertificateVisible(true)}>
                  {s3Certificate ? (
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
                        onPress={() => sets3Certificate()}>
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
                            uri: s3Certificate,
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
                      <Text style={styles.uploadtext}>
                        Training/Experience/RPL Certificate
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
                {/* <View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.fullinput}
                        onBlur={onBlur}
                        placeholder='Brand Company Worked with'
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        keyboardType='default'
                      />
                    )}
                    name="company_worked_with"
                    defaultValue=""
                    rules={{
                      required: true
                    }}
                  />
                  {errors.company_worked_with && <Text style={{ color: "red" }}>This field in required!</Text>}
                </View> */}
                {/* <TouchableOpacity style={styles.fullinput}>
                  <Picker
                    selectedValue={brand}
                    onValueChange={(itemValue) => setBrand(itemValue)}
                  >

                    <Picker.Item label="Brand/Company " value="work" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                    <Picker.Item label="Company Name" value="Company Name" style={{ fontSize: 16, fontWeight: "bold", fontFamily: "poppins-semibold", multiline: true, numberOfLines: 1, color: "black" }} />
                  </Picker>
                </TouchableOpacity> */}
              </View>
              {/* Reference person details (if any) */}
              {/* <View>
                <Text style={styles.headline}>
                  Reference person deatils (if any)<Text style={styles.star}>*</Text>
                </Text>
                <View style={styles.halfview}>
                  <View style={{ width: "48%" }}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
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
                          placeholder='Name'
                          onChangeText={(value) => onChange(value)}
                          value={value}
                        />
                      )}
                      name="reference_person_name"
                      defaultValue=""
                    />
                  </View>
                  <View style={{ width: "48%" }}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
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
                          placeholder='Phone Number'
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          keyboardType="numeric"
                        />
                      )}
                      name="reference_person_mobile"
                      defaultValue=""
                      rules={{
                        pattern: {
                          value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                          message: "Enter valid phone number!"
                        }
                      }}
                    />
                    {errors.reference_person_mobile?.type === "pattern" &&
                      <Text style={{ color: "red" }}>
                        Enter a valid mobile number!
                      </Text>}
                  </View>
                </View>
              </View> */}
              <View>
                <View>
                  <Text style={styles.headline}>Secondary Service</Text>
                  <TouchableOpacity
                    style={[
                      styles.fullinput,
                      {height: 60, justifyContent: 'center'},
                    ]}
                    onPress={() => setServiceModal(true)}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        color: COLORS.BLACK
                      }}>
                      {secondaryService?.service_name
                        ? secondaryService?.service_name.split('-')[0]
                        : 'Select'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Button */}
              <TouchableOpacity
                onPress={handleSubmit(onsubmit)}
                // onPress={() => navigation.navigate("GenerateQR")}
                //onPress={() => uploadImage()}
                style={{
                  width: '100%',
                  backgroundColor: '#00796A',
                  borderRadius: 4,
                  marginVertical: 10,
                }}>
                <Text style={styles.btn}>Continue</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}
const styles = StyleSheet.create({
  picture: {
    height: 75,
    width: '20%',
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
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
  uploadbox: {
    marginTop: 10,
    backgroundColor: '#F1F1F1',
    height: 88,
    width: '100%',
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
  dropDown: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'poppins-semibold',
    multiline: true,
    numberOfLines: 1,
    color: 'black',
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
});
