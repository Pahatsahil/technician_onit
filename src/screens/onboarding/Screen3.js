import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Third from "../../images/third.png";
import Logo from "../../images/logo1.png";
import { useDispatch } from 'react-redux';
import { setOnbaordingShown } from '../../../redux-toolkit/slice';

const { height, width } = Dimensions.get("screen");

const Screen1 = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <ImageBackground
      source={Third}
      style={styles.backgroundImage}
    >
      <View
        style={{ flexGrow: 1, width: width, paddingHorizontal: "10%", position: "absolute", bottom: "16%" }}
      >
        <Text style={{
          color: '#fff',
          fontSize: 25,
          marginBottom: 4,
          fontFamily: 'poppins-semibold',
        }}>
          Let's get started...
        </Text>
        <Text style={{
          color: '#fff',
          fontSize: 18,
          fontFamily: 'poppins-regular',
        }}>
          In just simple 3 steps
        </Text>

        <Image
          source={Logo}
          style={{
            height: 100,
            width: 180,
            resizeMode: "contain",
          }}
        />
        <TouchableOpacity
          onPress={() => {dispatch(setOnbaordingShown());navigation.replace('SignUp')}}>
          <View style={styles.joinbtn}>
            <Text style={styles.join}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'poppins-regular',
              paddingVertical: 10
            }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => { dispatch(setOnbaordingShown()); navigation.replace('SignIn')}}>
            <Text
              style={{
                fontSize: 16,
                color: '#00796A',
                fontFamily: 'poppins-regular',
                textDecorationLine: 'underline',
                paddingVertical: 10
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
};

export default Screen1;
const styles = StyleSheet.create({
  backgroundImage: {
    height: height,
    width: width,
    alignItems: "center",
  },
  viewbox: {
    height: 30,
    width: 30,
    backgroundColor: '#20C944',
    marginVertical: 13,
    borderRadius: 8,
  },
  num: {
    marginVertical: 5,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'poppins-medium',
  },
  intro: {
    color: '#fff',
    fontSize: 18,
    margin: 15,
    fontFamily: 'poppins-regular',
  },
  head: {
    color: '#fff',
    marginLeft: 30,
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'poppins-semibold',
  },
  subhead: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 30,
    fontFamily: 'poppins-regular',
  },
  joinbtn: {
    width: '100%',
    backgroundColor: '#00796A',
    borderRadius: 2,
    marginVertical: 8
  },
  join: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poppins-semibold',
    alignSelf: 'center',
    paddingVertical: 14,
  },
});
