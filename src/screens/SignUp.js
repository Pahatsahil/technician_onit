import React, {useState} from 'react';
import Phone from '../components/Phone';
// import CheckBox from '@react-native-community/checkbox';
import PhoneInput from 'react-native-phone-number-input';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import text from '../document/Text';
import {useEffect} from 'react';
import axios from 'axios';
import {Controller, useForm} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {useRef} from 'react';
import {getUniqueId} from 'react-native-device-info';
import {GET_ALL_SERVICES, REGISTER_CENTER_SEND_OTP} from '../utils/endpoints';
// import CheckBox from '@react-native-community/checkbox';
import {COLORS} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const K_OPTIONS = [
  {
    name: 'Independent Service Provider',
    id: 'independentServiceProvider',
    val: 1,
  },
  {
    name: 'Service Center',
    id: 'serviceCenter',
    val: 10,
  },
  {
    name: 'Seller/Dealer',
    id: 'sellerOrDealer',
    val: 0,
  },

  {
    name: 'Residential Society',
    id: 'residentialSociety',
    val: 9,
  },
];

export default function SignUp({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [complainceModel, setComplainceModel] = useState(false);
  const [allServices, setAllServices] = useState();
  const [visible, setVisible] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [primaryService, setPrimaryService] = useState();
  const phoneInput = useRef(null);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const [device_id, setDeviceID] = useState();

  useEffect(() => {
    const deviceInfo = async () => {
      const deviceID = await getUniqueId();
      setDeviceID(deviceID);
      AsyncStorage.setItem('device_id', deviceID);
    };
    deviceInfo();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(GET_ALL_SERVICES);
      setAllServices(res.data.data);
    };
    fetchServices();
  }, []);

  const onsubmit = async ({
    center_name,
    pincode,
    mobile_number,
    no_of_technicians,
  }) => {
    setVisible(true);
    console.log(primaryService);
    // navigation.navigate("CompleteProfile"); If you dont want to send OTP
    let payload = {
      center_name,
      personal_details: {
        phone: {
          country_code: '+' + phoneInput.current?.getCallingCode(),
          mobile_number,
        },
      },
      primary_services: primaryService._id,
      address_details: {
        pincode,
      },
      no_of_technicians: no_of_technicians,
      device_id,
    };
    const _payload = {
      country_code: '+' + phoneInput.current?.getCallingCode(),
      mobile_number,
    };
    console.log(payload);
    try {
      await axios({
        method: 'post',
        url: REGISTER_CENTER_SEND_OTP,
        data: payload,
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      }).then(res => {
        setVisible(false);
        ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT);
        navigation.navigate('SignUpOtp', {
          data: _payload,
          registerData: payload,
        });
      });
    } catch (err) {
      console.log("ERROR",err);
      setVisible(false);
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'white',
        }}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <View>
          <Image
            style={{width: '100%', height: 126}}
            source={require('../images/top2.png')}
          />
          <Image
            style={{
              height: 80,
              width: 170,
              position: 'relative',
              resizeMode: 'contain',
              alignSelf: 'center',
              top: '-22%',
            }}
            source={require('../images/logo.png')}
          />
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text
            style={[
              styles.header,
              {
                marginBottom: 16,
              },
            ]}>
            SignUp! 👋
          </Text>

          <Text style={styles.title}>
            Shop / Center / Entity Name
            <Text style={[styles.title, {color: 'red'}]}>*</Text>
          </Text>

          <Controller
            control={control}
            rules={{required: true, pattern: /^[A-Z\s]+$/}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Enter your Shop Name"
                // onChangeText={value => onChange(value)}
                onChangeText={value => onChange(value)}
                placeholderTextColor="grey"
                value={value}
                autoCapitalize="characters"
              />
            )}
            name="center_name"
            defaultValue=""
            // rules={{required: true}}
          />
          {errors.center_name?.type === 'required' && (
            <Text style={{color: 'red'}}>Shop/ Center name is required!</Text>
          )}
          {errors.center_name?.type === 'pattern' && (
            <Text style={{color: 'red'}}>
              Input must be all Uppercase letters
            </Text>
          )}
          {/* {errors.center_name && (
            <Text style={{color: 'red'}}>Shop/ Center name is required!</Text>
          )} */}
          <Text style={styles.title}>
            Main service you offer
            <Text style={[styles.title, {color: 'red'}]}>*</Text>
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1.2,
              borderColor: '#00796A',
              color: '#000',
              borderRadius: 4,
              fontFamily: 'poppins-semibold',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              justifyContent: 'center',
            }}
            onPress={() => setServiceModal(true)}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'poppins-regular',
                paddingLeft: 11,
                paddingVertical: 14,
                color: COLORS.BLACK,
              }}>
              {primaryService?.service_name
                ? primaryService?.service_name.split('-')[0]
                : 'Select'}
            </Text>
          </TouchableOpacity>
          {!primaryService && (
            <Text style={{color: 'red'}}>Primary Service is required.</Text>
          )}

          <Text style={styles.title}>
            Service Area Pincode (main)
            <Text style={[styles.title, {color: 'red'}]}>*</Text>
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Area Pincode"
                onChangeText={value => onChange(value)}
                value={value}
                placeholderTextColor="grey"
                keyboardType="numeric"
              />
            )}
            name="pincode"
            defaultValue=""
            rules={{
              required: true,
              minLength: 5,
              maxLength: 6,
              pattern: {
                value: /^[1-9]{1}[0-9]{2}[0-9]{3}$/,
                message: 'Please enter a number',
              },
            }}
          />
          {errors.pincode?.type === 'pattern' && (
            <Text style={{color: 'red'}}>Enter valid PIN code.</Text>
          )}
          {errors.pincode?.type === 'required' && (
            <Text style={{color: 'red'}}>Pincode is required.</Text>
          )}
          {errors.pincode?.type === 'minLength' && (
            <Text style={{color: 'red'}}>Enter valid PIN code.</Text>
          )}
          {errors.pincode?.type === 'maxLength' && (
            <Text style={{color: 'red'}}>Enter valid PIN code.</Text>
          )}

          <Text style={styles.title}>
            Mobile Number<Text style={[styles.title, {color: 'red'}]}>*</Text>
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <PhoneInput
                ref={phoneInput}
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
                textInputProps={{placeholderTextColor: 'grey', maxLength: 12}}
              />
            )}
            name="mobile_number"
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
          {errors.mobile_number?.type === 'pattern' && (
            <Text style={{color: 'red'}}>Enter a valid mobile number!</Text>
          )}
          {errors.mobile_number?.type === 'required' && (
            <Text style={{color: 'red'}}>Mobile number is required!</Text>
          )}

          <Text style={styles.title}>
            Choose Profile Type
            <Text style={[styles.title, {color: 'red'}]}>*</Text>
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
                    label="Choose Profile Type"
                    value=""
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      fontFamily: 'poppins-regular',
                      color: 'grey',
                    }}
                  />
                  {K_OPTIONS.map(item => (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={item.val}
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        fontFamily: 'poppins-semibold',
                        color: 'black',
                      }}
                    />
                  ))}
                </Picker>
              )}
              name="no_of_technicians"
              defaultValue=""
              rules={{
                required: true,
              }}
            />
          </View>
          {errors.no_of_technicians?.type === 'required' && (
            <Text
              style={{
                color: 'red',
              }}>
              Profile Type is required!
            </Text>
          )}

          <View style={styles.checkboxContainer}>
            <View
              style={{
                marginRight: 10,
                borderRadius: 4,
                // backgroundColor: 'rgba(0,0,0,.1)',
              }}>
              <CheckBox
                style={styles.checkbox}
                value={toggleCheckBox}
                tintColor={COLORS.BLACK}
                // value={toggleCheckBox}
                onValueChange={(val) => setToggleCheckBox(val)}
                // status
                
                
              />
              {/* <Text>{toggleCheckBox ? 'Checked' : 'Unchecked'}</Text> */}
            </View>
            <Text
              style={{
                marginVertical: 4,
                fontFamily: 'poppins-regular',
                color: '#000',
              }}>
              I accept the{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setComplainceModel(!complainceModel);
              }}>
              <Text
                style={{
                  marginVertical: 4,
                  color: 'blue',
                  textDecorationLine: 'underline',
                  fontFamily: 'poppins-regular',
                }}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.btnsize,
              {
                backgroundColor: toggleCheckBox ? '#00796A' : 'grey',
              },
            ]}
            disabled={!toggleCheckBox}
            onPress={handleSubmit(onsubmit)}
            //onPress={() => navigation.navigate("CompleteProfile")}
          >
            <Text style={styles.otp}>Get OTP</Text>
          </TouchableOpacity>

          <View style={styles.account}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'poppins-regular',
                paddingVertical: 10,
              }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#00796A',
                  fontFamily: 'poppins-regular',
                  textDecorationLine: 'underline',
                  paddingVertical: 10,
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        visible={complainceModel}
        onRequestClose={() => setComplainceModel(false)}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            height: height,
            width: width,
          }}>
          <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
          <View
            style={{
              backgroundColor: '#fff',
              height: '90%',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/logo.png')}
              style={{
                width: '100%',
                height: 60,
                resizeMode: 'contain',
                marginTop: 30,
              }}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: '90%',
              }}>
              <Text
                style={{
                  fontFamily: 'poppins-regular',
                  fontWeight: 'bold',
                }}>
                {text}
              </Text>
              <TouchableOpacity
                style={[styles.btnsize, {width: '40%'}]}
                onPress={() => {
                  setComplainceModel(false);
                  setToggleCheckBox(true);
                }}>
                <Text style={styles.otp}>I accept</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <ScrollView>
          <View
            style={{
              height: height,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator animating={visible} size="large" />
          </View>
        </ScrollView>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={serviceModal}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
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
            <View style={{height: '100%'}}>
              {allServices ? (
                <ScrollView>
                  {allServices.map(item => (
                    <TouchableOpacity
                      onPress={() => {
                        setPrimaryService(item);
                        setServiceModal(false);
                      }}
                      key={item._id}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          fontFamily: 'poppins-semibold',
                          padding: 10,
                          color: COLORS.BLACK,
                        }}
                        //
                      >
                        {item.service_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <View
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator animating={!allServices} size="large" />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otp: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 14,
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  header: {
    fontSize: 26,
    fontFamily: 'poppins-semibold',
    color: 'black',
    marginBottom: 4,
  },
  subheader: {
    marginBottom: 30,
    color: 'grey',
    fontFamily: 'poppins-regular',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  btnsize: {
    width: '100%',
    backgroundColor: '#00796A',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 14,
  },
  checkbox: {
    height: 30,
    width: 30,
    // marginRight: 1,
    backgroundColor:"white"
  },
  modelContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  modelView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 20,
    padding: 20,
    alignItems: 'center',
  },
  continueButton: {
    marginTop: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#00796A',
    height: 20,
  },
  agree: {
    padding: 20,
    borderRadius: 18,
  },
  title: {
    fontFamily: 'poppins-semibold',
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1.2,
    borderColor: '#00796A',
    borderRadius: 4,
    padding: 11,
    paddingLeft: 14,
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
});
