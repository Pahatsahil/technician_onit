import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import BottomImage from "../images/bottom.png"
import axios from 'axios';
import { SEND_OTP } from '../utils/endpoints';


const { width, height } = Dimensions.get('window');

export default function SignIn({ navigation,route }) {
  const mobileNumber = route?.params?.mobileNumber
  const [visible, setVisible] = useState(false);
  const phoneInput = useRef(null);
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });
  const onsubmit = async ({ mobile_number }) => {
    setVisible(true)
    let payload = {
      country_code: "+" + phoneInput.current?.getCallingCode(),
      mobile_number,
    }
    console.log(payload)
    try {
      await axios({
        method: "post",
        url: SEND_OTP,
        data: payload,
        confif: {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      }).then(() => {
        setVisible(false)
        ToastAndroid.show("OTP sent", ToastAndroid.SHORT);
        navigation.navigate('SignInOtp', { data: payload })
      }
      )
    } catch (error) {
      setVisible(false)
      ToastAndroid.show(error?.response?.data?.message + "!", ToastAndroid.SHORT);
    }
  }

  return (
    <>
      <View style={{ backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
        <View style={{ alignContent: 'center' }}>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <View>
            <Image
              style={{ width: '100%', height: 126 }}
              source={require('../images/top2.png')}
            />
          </View>
          <View style={{ height: 350, alignItems: 'center' }}>
            <Image
              style={{
                height: 96.95,
                width: 205.33,
                marginBottom: 10,
              }}
              source={require('../images/logo.png')}
            />
            <Text style={styles.header}>Growing Business Digitally</Text>
            <Text style={styles.subheader}>Quick - Reliable - Economical</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <PhoneInput
                  ref={phoneInput}
                  value={value=mobileNumber||value}
                  defaultCode="IN"
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  withDarkTheme
                  withShadow
                  containerStyle={{
                    borderWidth: 1,
                    borderColor: '#00796A',
                    color: '#000',
                    borderRadius: 4,
                    fontFamily: 'poppins-semibold',
                    fontSize: 16,
                    width: "90%"
                  }}
                  textInputProps={onBlur}
                />
              )}
              name="mobile_number"
              defaultValue={mobileNumber || ""}
              rules={{
                required: true,
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Enter valid phone number!"
                }
              }}
            />
            {errors.mobile_number?.type === "pattern" && <Text style={{ color: "red", marginTop: 2, alignSelf: "flex-start", marginLeft: 20 }}>Enter a valid mobile number!</Text>}
            {errors.mobile_number?.type === "required" && <Text style={{ color: "red", marginTop: 2, alignSelf: "flex-start", marginLeft: 20 }}>Mobile number is required!</Text>}
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              style={styles.btnsize}
            >
              <Text style={styles.otp}>Get OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.account}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'poppins-regular',
                paddingVertical: 10
              }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity style={{ zIndex: 10 }} onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#00796A',
                  fontFamily: 'poppins-regular',
                  textDecorationLine: 'underline',
                  paddingVertical: 10 
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: width, alignItems: "center",  }}>
            <Image
              source={BottomImage}
              style={{
                width: "70%",
                height: 300,
                //height:"50%",
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}>
          <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
            <ActivityIndicator animating={visible} size="large" />
          </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    width: "100%",
    marginTop:6
  },
  header: {
    fontSize: 17,
    fontFamily: 'poppins-semibold',
    color: 'black',
    padding: 5,
  },
  subheader: {
    marginBottom: 30,
    color: 'grey',
    fontFamily: 'poppins-regular',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  btnsize: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#00796A',
    justifyContent: 'center',
    marginVertical: 8,
  },
});
