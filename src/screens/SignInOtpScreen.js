import axios from 'axios';
import React, { useRef, useState, } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { useDispatch, useSelector } from "react-redux";
import { login, setAccessToken, setProfileImageUrl, setUserData, setUserId } from '../../redux-toolkit/slice';
import { GET_USER_DETAILS, LOGIN_WITH_OTP, SEND_OTP } from '../utils/endpoints';

const { width, height } = Dimensions.get('window');

const SignInOtpScreen = ({ navigation, route }) => {
  const { accessToken, isAuthorized, userData, profileImageUrl, userId } = useSelector((state) => state.auth);
  //console.log(accessToken)
  const data = route?.params?.data
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [visible, setVisible] = useState(false);
  const [_otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(99)
  // ?console.log("This", accessToken)
  //console.log("This", userData?.userDetails?.document_details?.aadhar_number)
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [device_id, setDeviceID] = useState();

  useEffect(() => {
    const deviceInfo = async () => {
      const deviceID = await getUniqueId();
      setDeviceID(deviceID);
    }
    deviceInfo()
  }, [])

  const resendOTP = async () => {
    setVisible(true)
    console.log(data)
    try {
      await axios({
        method: "post",
        url: SEND_OTP,
        data: data,
        confif: {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      }).then(() => {
        setVisible(false)
        ToastAndroid.show("OTP sent", ToastAndroid.SHORT);
        //navigation.navigate('SignInOtp', { data: payload })
        setOtp({ 1: '', 2: '', 3: '', 4: '' })
        setCounter(99)
      }
      )
    } catch (error) {
      setVisible(false)
      ToastAndroid.show(error?.response?.data?.message + "!", ToastAndroid.SHORT);
    }
  }

  const setUserDetails = async (_accessToken) => {
    console.log("Called!", _accessToken)
    try {
      await axios({
        method: "get",
        url: GET_USER_DETAILS,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': _accessToken
        },
      }).then(res => {
        console.log("User Details--->", res?.data)
        dispatch(setUserData(res?.data?.data));
        dispatch(setUserId(res?.data?.data?.userDetails?.personal_details?.phone?.mobile_number));
        setTimeout(() => {
          if (res?.data?.data?.userDetails?.document_details?.aadhar_number) {
            console.log("User Data---->", userData)
            console.log("User ID---->", userId)
            dispatch(setProfileImageUrl(res?.data?.data?.userDetails?.personal_details?.profile_picture));
            setVisible(false)
            dispatch(login());
          }
          else {
            setVisible(false)
            navigation.navigate("CompleteProfile")
            //console.log("err",userData)
          }
        }, 1500);
      })
    } catch (err) {
      setVisible(false)
      console.log(err)
      navigation.goBack()
    }
  }

  const confirmOtp = async () => {
    setVisible(true)
    const otp = _otp[1] + _otp[2] + _otp[3] + _otp[4]
    const payload = { ...data, otp, device_id };
    console.log(payload);
    try {
      await axios({
        method: "post",
        url: LOGIN_WITH_OTP,
        data: payload,
      }).then((res) => {
        ToastAndroid.show("Logged in successfully!", ToastAndroid.SHORT);
        dispatch(setAccessToken(res?.data?.data?.token));
        setUserDetails(res?.data?.data?.token);
      }
      )
    } catch (error) {
      setVisible(false);
      console.log(error)
      ToastAndroid.show(error?.response?.data?.message + "!", ToastAndroid.SHORT);
    }
  }
  return (

    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.content}>
        We have sent you 4 digit verification code on {''}
        {/* <Text style={styles.phoneNumberText}>{number}</Text> */}
      </Text>
      <Text style={styles.fornumber}>{data?.country_code + " " + data?.mobile_number}</Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={true}
            ref={firstInput}
            onChangeText={text => {
              setOtp({ ..._otp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({ ..._otp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({ ..._otp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({ ..._otp, 4: text });
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <View style={{ height: 10 }}></View>
      <View style={styles.btnsize}>
        <TouchableOpacity
          style={{ backgroundColor: _otp[1] === "" || _otp[2] === "" || _otp[3] === "" || _otp[4] === "" ? "grey" : '#00796A' }}
          disabled={_otp[1] === "" || _otp[2] === "" || _otp[3] === "" || _otp[4] === ""}
          //onPress={() => dispatch(login())}
          onPress={() => confirmOtp()}
        >
          <Text style={styles.submit}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }}></View>
      <View style={{ width: '38%', alignSelf: 'center', flexDirection: 'row', justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => resendOTP()}
          //onPress={() => dispatch(login())}
          style={{ flexDirection: "row" }}
          disabled={counter !== 0}
        >
          <Text style={[styles.resend, { color: counter !== 0 ? "grey" : "#00796A" }]}>Resend OTP</Text>

        </TouchableOpacity>
        <Text style={{
          alignSelf: 'center',
          color: counter === 0 ? "grey" : "#00796A",
          fontSize: 14,
        }}> {counter? (counter + "s"): ''}</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}>
        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <ActivityIndicator animating={visible} size="large" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontFamily: 'poppins-semibold',
    color: '#000',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 100

  },
  content: {
    fontSize: 15,
    fontFamily: 'poppins-regular',
    alignSelf: 'center',
    marginBottom: 5,
  },
  fornumber: {
    color: '#000',
    fontFamily: 'poppins-semibold',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 20

  },

  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {

    borderBottomWidth: 2,
    borderColor: '#20C944'
  },
  otpText: {
    fontSize: 25,
    padding: 0,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontFamily: 'poppins-medium'
  },
  btnsize: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#00796A',
    justifyContent: 'center',
    borderRadius: 2,
    alignSelf: 'center'
  },
  submit: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 14,
    fontFamily: 'poppins-semibold',
  },
  resend: {
    fontFamily: 'poppins-regular',
    alignSelf: 'center',
    color: '#00796A',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#00796A'
  }
});

export default SignInOtpScreen;
