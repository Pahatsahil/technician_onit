import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import First from "../../images/first.png";
import Logo from "../../images/logo1.png";

const { height, width } = Dimensions.get("screen");

const Screen1 = () => (
  <ImageBackground
    source={First}
    style={styles.backgroundImage}
  >
    <Image
      source={Logo}
      style={{
        height: height * 0.1,
        width: width * 0.5,
        resizeMode: "contain",
        position:"absolute",
        top:"24%"
      }}
    />
    <View
      style={{ flexGrow: 1, width: width, paddingHorizontal:"10%", position:"absolute", bottom:"15%" }}
    >
      <Text style={{
        color: '#fff',
        fontSize: 25,
        marginBottom: 10,
        fontFamily: 'poppins-semibold',
      }}>
        Welcome OniT
      </Text>
      <Text style={{
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'poppins-regular',
      }}>
        Get Started 
      </Text>
      
      <View style={{
        flexDirection: "row"
      }}>
        <Text style={styles.num}>1</Text>
        <Text style={styles.intro}>Free Ticket Creation</Text>
      </View>
      <View style={{
        flexDirection: "row"
      }}>
        <Text style={styles.num}>2</Text>
        <Text style={styles.intro}>Free Sign up</Text>
      </View>
      <View style={{
        flexDirection: "row"
      }}>
        <Text style={styles.num}>3</Text>
        <Text style={styles.intro}>Free Digital QR Code*</Text>
      </View>
    </View>
  </ImageBackground>
);

export default Screen1;
const styles = StyleSheet.create({
  backgroundImage: {
    height: height, 
    width: width, 
    alignItems: "center"
  },
  num: {
    backgroundColor:"#20C944",
    height:30,
    width:30,
    paddingHorizontal:10,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'poppins-medium',
    borderRadius: 5,
    textAlign:"center",
    textAlignVertical:"center"
  },
  intro: {
    color: '#fff',
    fontSize: 18,
    margin: 15,
    fontFamily: 'poppins-regular',
  },
});
