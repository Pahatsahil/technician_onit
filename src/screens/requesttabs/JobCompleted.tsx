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
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {COLORS} from '../../utils/constants';
import {BASE_URL} from '../../utils/endpoints';
import {Controller, useForm} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import angleLeft from '../../images/angleLeft.png';
import profile from '../../images/profile.png';
import date from '../../images/date.png';
import time from '../../images/time.png';
import warning from '../../images/warning.png';
import location from '../../images/location.png';
import watch from '../../images/watch.png';
import cash from '../../images/cash.png';
import currency from '../../images/currency.png';
import upi from '../../images/upi.png';
import online from '../../images/online.png';
import first from '../../images/first.png';
import second from '../../images/second.png';
import third from '../../images/third.png';
import {ActivityIndicator} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const JobCompleted = ({navigation, route}) => {
  const {accessToken, isAuthorized, userData, profileImageUrl} = useSelector(
    (state: any) => state.auth,
  );
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
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

  const K_OPTIONS = [
    {
      name: 'Visit Done, Work Completed (Payment Collected)',
    },
    {
      name: 'Visited - Estimate Not Approved / Site Not Ready',
    },
    {
      name: 'Visited - Unit not Repairable /Special Skill, Tools, Authorisation required',
    },
    {
      name: 'Not Visited -Can’t Deliver Service - Phone not Pick/ Far Location',
    },
    {
      name: 'Not Visited - Customer Refused (Work Already Done /Not Needed / Site Not Ready)',
    },
    {
      name: ' Visit Done, Work Completed (Free of Charge)',
    },
    {
      name: 'Visit Done, Unit Working Fine - Explaination Done',
    },
    {
      name: 'Part Changed (Defective given to customer) ',
    },
    {
      name: ' Part Changed with repaired part (refurbished)',
    },
    {
      name: 'Part Changed under Replacement with old part /in warranty (Free of Charge)',
    },
  ];

  const REVIEW_OPTIONS = [
    {
      name: 'Very Bad',
    },
    {
      name: 'Bad',
    },
    {
      name: 'Decent',
    },
    {
      name: 'Good',
    },
    {
      name: 'Very Good',
    },
  ];

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
    console.log('OSP', ticketDetails?.onsite_pictures);
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
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // style={{
          //     backgroundColor: "red"
          // }}
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

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#DCDCDC',
              justifyContent: 'space-around',
            }}>
            <View style={{}}>
              <Image style={{height: 40, width: 40}} source={warning} />
            </View>
            <View
              style={{
                width: '70%',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: COLORS.BLACK,
                }}>
                Problem :
              </Text>
              {ticketDetails?.service_provided_for?.service_name ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.BLACK,
                  }}>
                  {ticketDetails?.service_provided_for?.service_name}
                </Text>
              ) : (
                <ActivityIndicator size="large" animating={ticketLoader} />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              marginLeft: 10,
            }}>
            <Image style={{height: 25, width: 25}} source={location} />
            {ticketDetails?.address_details?.city &&
            ticketDetails?.address_details?.state &&
            ticketDetails?.address_details?.pincode ? (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#3dabf4',
                  marginLeft: 10,
                }}>
                {ticketDetails?.address_details?.house_number},{' '}
                {ticketDetails?.address_details?.locality},
                {ticketDetails?.address_details?.city},{' '}
                {ticketDetails?.address_details?.state},{' '}
                {ticketDetails?.address_details?.pincode}
              </Text>
            ) : (
              <ActivityIndicator size="large" animating={ticketLoader} />
            )}
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: '#DCDCDC',
              flexDirection: 'row',
              paddingVertical: 25,
            }}>
            <Image
              style={{height: 40, width: 40, marginHorizontal: 25}}
              source={watch}
            />
            <View>
              <Text style={{fontSize: 14, fontWeight: '600'}}>Status :</Text>
              {ticketDetails?.ticket_status ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color:
                      ticketDetails?.ticket_status === 'CLOSED'
                        ? '#00796A'
                        : ticketDetails?.assigned_ids?.assigned_technician_id
                        ? 'grey'
                        : '#DE970B',
                  }}>
                  {ticketDetails?.ticket_status === 'CLOSED'
                    ? 'CLOSED'
                    : ticketDetails?.assigned_ids?.assigned_technician_id
                    ? 'IN PROGRESS'
                    : 'PENDING'}
                </Text>
              ) : (
                <ActivityIndicator size="small" animating={ticketLoader} />
              )}
            </View>
          </View>

          <View style={{padding: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 20}}>
              Onsite Pictures<Text style={styles.star}>*</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}>
              {ticketDetails?.onsite_pictures &&
                ticketDetails?.onsite_pictures.map((item: any, i: number) => (
                  <View style={styles.picture} key={i}>
                    <Image
                      style={[styles.picture, {height: '100%', width: '100%'}]}
                      source={{
                        uri: item,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              {ticketDetails?.onsite_pictures.length < 1 && (
                <TouchableOpacity
                  style={styles.picture}
                  onPress={() => setVisible(true)}>
                  <Image
                    style={[{height: '50%', width: '50%'}]}
                    source={require('../../images/camera2.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingTop: 20,
              backgroundColor: '#e8e8e8',
              paddingBottom: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image style={{height: 40, width: 40}} source={cash} />
            </View>
            <View style={{paddingLeft: 20}}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>Advance </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                ₹
                {ticketDetails?.broadcast_status === 'matched_in_same_center'
                  ? 0
                  : ticketDetails?.ticket_price}
                /-
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 4,
              paddingVertical: 10,
              backgroundColor: '#e8e8e8',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height: 40, width: 40}} source={cash} />
                <Text style={{fontSize: 14, fontWeight: '600', marginLeft: 10}}>
                  Additional Charges{' '}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: errors?.closing_ticket_price ? 'red' : 'black',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '40%',
                }}>
                <Image style={{height: 25, width: 25}} source={currency} />
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={{
                        width: '80%',
                      }}
                      onBlur={onBlur}
                      placeholder=""
                      placeholderTextColor="grey"
                      onChangeText={value => onChange(value)}
                      value={value}
                      keyboardType="numeric"
                    />
                  )}
                  name="closing_ticket_price"
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {/* <TouchableOpacity style={styles.paymentIconsContainer}>
                <Image
                  source={upi}
                  style={{ height: 30, width: 60 }}
                  resizeMode="contain"
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => setPaymentType('Online')}
                style={[
                  styles.paymentIconsContainer,
                  {
                    backgroundColor:
                      paymentType === 'Online' ? '#00796A' : '#fff',
                  },
                ]}>
                <Image
                  source={online}
                  style={{height: 30, width: 60}}
                  resizeMode="contain"
                />
                <Text>Online</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaymentType('Cash')}
                style={[
                  styles.paymentIconsContainer,
                  {
                    backgroundColor:
                      paymentType === 'Cash' ? '#00796A' : '#fff',
                  },
                ]}>
                <Image
                  source={cash}
                  style={{height: 30, width: 60}}
                  resizeMode="contain"
                />
                <Text style={{color: COLORS.BLACK}}>Cash</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'poppins-semibold',
                paddingVertical: 14,
              }}>
              Rate Customer<Text style={styles.star}>*</Text>
            </Text>

            <View style={styles.input}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={itemvalue => onChange(itemvalue)}
                    placeholder={value}>
                    <Picker.Item
                      label="Rate Customer"
                      value=""
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-regular',
                        color: 'grey',
                      }}
                    />
                    {REVIEW_OPTIONS.map((item: any) => (
                      <Picker.Item
                        key={item.name}
                        label={item.name}
                        value={item.name}
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          fontFamily: 'poppins-semibold',
                          color: 'black',
                        }}
                      />
                    ))}
                  </Picker>
                )}
                name="customer_message"
                defaultValue=""
                rules={{
                  required: true,
                }}
              />
            </View>
            {errors.customer_message?.type === 'required' && (
              <Text style={{color: 'red', marginTop: 4}}>
                Please choose a Rating!
              </Text>
            )}
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'poppins-semibold',
                paddingVertical: 14,
              }}>
              Closure Remark<Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.input}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={itemvalue => onChange(itemvalue)}
                    placeholder={value}>
                    <Picker.Item
                      label="Choose Closure Remark"
                      value=""
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-regular',
                        color: 'grey',
                      }}
                    />
                    {K_OPTIONS.map((item: any) => (
                      <Picker.Item
                        key={item.name}
                        label={item.name}
                        value={item.name}
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          fontFamily: 'poppins-semibold',
                          color: 'black',
                        }}
                      />
                    ))}
                  </Picker>
                )}
                name="technician_remarks"
                defaultValue=""
                rules={{
                  required: true,
                }}
              />
            </View>
            {errors.technician_remarks?.type === 'required' && (
              <Text style={{color: 'red', marginTop: 4}}>
                Closure remark is required!
              </Text>
            )}
          </View>
          {ticketDetails?.ticket_status !== 'CLOSED' &&
            ticketDetails?.assigned_ids?.assigned_technician_id && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: '48%',
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    borderColor: '#00796A',
                    borderWidth: 1,
                  }}
                  onPress={() =>
                    ToastAndroid.show('Ticket on hold!', ToastAndroid.SHORT)
                  }>
                  <Text
                    style={{
                      color: '#00796A',
                      fontSize: 14,
                      fontFamily: 'poppins-regular',
                      alignSelf: 'center',
                      paddingVertical: 14,
                    }}>
                    Put on Hold
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '48%',
                    backgroundColor: '#00796A',
                    borderRadius: 4,
                  }}
                  onPress={handleSubmit(jobComplete)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: 'poppins-regular',
                      alignSelf: 'center',
                      paddingVertical: 14,
                    }}>
                    Job Completed
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
  picture: {
    height: 75,
    width: 75,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
  },
  paymentIconsContainer: {
    width: '31%',
    marginVertical: 10,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    // paddingRight:6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  star: {
    color: 'red',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 8,
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
});
export default JobCompleted;
