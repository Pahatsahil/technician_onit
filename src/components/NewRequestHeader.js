import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native'
import React from 'react'
import acmin from '../images/ac-min.png'
import plumberingmin from '../images/plumbering-min.png'
export default function NewRequestHeader() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.services}>
        <View>
          <TouchableNativeFeedback>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={acmin}
              />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.imagetitle}>AC Service</Text>
        </View>

        <View>
          <TouchableNativeFeedback>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={plumberingmin}
              />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.imagetitle}>Plumber</Text>
        </View>

        <View>
          <TouchableNativeFeedback>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={require('../images/electronics-min.png')}
              />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.imagetitle}>Appliance</Text>
        </View>
        <View>
          <TouchableNativeFeedback>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={require('../images/cleaning-min.png')}
              />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.imagetitle}>Cleaning</Text>
        </View>

        <View>
          <TouchableNativeFeedback>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={require('../images/gift-min.png')}
              />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.imagetitle}>Refer Earn</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  services: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 110,
  },
  images: {
    height: 40,
    width: 40,
  },
  imageback: {
    padding: 10,
    backgroundColor: '#c7ddda',
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  imagetitle: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    alignSelf: 'center',
    color: '#000',
  },
})