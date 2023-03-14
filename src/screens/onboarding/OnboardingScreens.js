import React from 'react';
import Swiper from 'react-native-swiper';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Screen1, Screen2, Screen3} from './';

const OnboardingScreens = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Swiper
        loop={false}
        autoplay={true}
        autoplayTimeout={5}
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: 14,
              height: 14,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
              borderRadius:12
            }}>
            <View
              style={{backgroundColor: '#fff', width: '80%', height: '80%',margin:'10.9%',borderRadius:50,borderWidth:1,borderColor:'black'}}>
              </View>
          </View>
        }
        dot={
          <View
            style={{
                backgroundColor: '#707070',
                width: 14,
                height: 14,
                borderRadius: 4,
                marginLeft: 4,
                marginRight: 4,
                marginTop: 4,
                marginBottom: 4,
                borderRadius:12
            }}
          />
        }
        >
        <Screen1 navigation={navigation} />
        <Screen2 navigation={navigation} />
        <Screen3 navigation={navigation} />
      </Swiper>
    </View>
  );
};
export default OnboardingScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
