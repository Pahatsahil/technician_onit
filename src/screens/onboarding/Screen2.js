import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

import Second from "../../images/second.png";
import Logo from "../../images/logo1.png";

const { height, width } = Dimensions.get("screen");

const Screen2 = () => (
  <ImageBackground
    source={Second}
    style={styles.backgroundImage}
  >
    <Image
      source={Logo}
      style={{
        height: height * 0.1,
        width: width * 0.5,
        resizeMode: "contain",
        position: "absolute",
        top: "24%"
      }}
    />
    <View
      style={{ flexGrow: 1, width: width, paddingHorizontal: "10%", position: "absolute", bottom: "15%" }}
    >
      <Text style={{
        color: '#fff',
        fontSize: 25,
        marginBottom: 4,
        fontFamily: 'poppins-semibold',
      }}>
        Get more business...
      </Text>
      <Text style={{
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'poppins-regular',
      }}>
        Grow your business 3-4 times
      </Text>
      <View style={styles.box}>
        <View style={styles.viewbox}>
          <Image
            style={styles.arrow}
            source={require('../../images/arrow.png')}
          />
        </View>
        <Text style={styles.intro}>Multiple service creation methods</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.viewbox}>
          <Image
            style={styles.arrow}
            source={require('../../images/arrow.png')}
          />
        </View>
        <Text style={styles.intro}>Utilising more than one skill</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.viewbox}>
          <Image
            style={styles.arrow}
            source={require('../../images/arrow.png')}
          />
        </View>
        <Text style={styles.intro}>
          Serve in multiple pincodes
        </Text>
      </View>

      <View style={styles.box}>
        <View style={styles.viewbox}>
          <Image
            style={styles.arrow}
            source={require('../../images/arrow.png')}
          />
        </View>
        <Text style={styles.intro}>Build your team</Text>
      </View>

    </View>
  </ImageBackground>
);

export default Screen2;
const styles = StyleSheet.create({
  backgroundImage: {
    height: height,
    width: width,
    alignItems: "center",
  },
  box: {
    flexDirection:"row",
    alignItems:"center",
    marginVertical: 10,
  },
  viewbox: {
    height:30,
    width: 30,
    backgroundColor:"#20C944",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:15,
    borderColor:"#fff",
    borderWidth:2,
  },
  arrow: {
    height:"60%",
    width:"60%",
  },
  intro: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'poppins-regular',
  },
});
