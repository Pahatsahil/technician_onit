import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

export default function PendingRequestBox() {
  return (
    
    <View style={styles.requests}>
      {/* request box upper layer */}
      <View style={styles.booking}>
        <View
          style={{
            height: 40,
            borderBottomWidth: 1,
            borderColor: '#e9e9e9',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '65%',
              borderTopStartRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexShrink: 1,
            }}>
            <Image
              style={{width: 22, height: 22}}
              source={require('../images/water-tap.png')}
            />
            {/* left side box of new request */}
            <Text
              style={{
                color: '#1D4831',
                fontFamily: 'poppins-regular',
                fontSize: 15,
              }}>
              Booking ID :{' '}
              <Text
                style={{
                  color: '#1D4831',
                  fontFamily: 'poppins-semibold',
                  fontSize: 15,
                }}>
                AA1585
              </Text>
            </Text>
          </View>
          {/* right right box of new request */}
          <View
            style={{
              width: '35%',
              backgroundColor: '#e9e9e9',
              borderColor: '#e9e9e9',
              borderTopEndRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.smlimage}
                source={require('../images/date.png')}
              />
              <Text style={styles.smltext}> 10th March 2022</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.smlimage}
                source={require('../images/time.png')}
              />
              <Text style={styles.smltext}> 09:00 - 11:00 am</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingLeft: 10, paddingVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                style={styles.smlimage}
                source={require('../images/warning.png')}
              />
              <Text style={[styles.smltext, {marginHorizontal: 8}]}>
                Problem:
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'poppins-medium',
                fontSize: 13,
                color: '#1D4831',
              }}>
              Tap Leaking and sink problem
            </Text>
          </View>
          <View style={{flex: 0.6}}>
          <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                  fontFamily: 'poppins-regular',
                  fontSize: 14,
                  color: '#1D4831',
                }}>
                DUE
              </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'poppins-medium',
                color: '#1D4831',
                alignSelf: 'center',
              }}>
              ₹ 200
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
            borderColor: '#e9e9e9',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={[styles.smlimage]}
              source={require('../images/location.png')}
            />
            <Text style={[styles.smltext, {marginLeft: 8, color: '#32acff'}]}>
              Basvanagudi, Delhi, 560004
            </Text>
            <TouchableNativeFeedback>
              <View
                style={{
                  backgroundColor: '#1D4831',
                  padding: 5,
                  paddingHorizontal: 20,
                  marginLeft: 50,
                  borderRadius: 4,
                }}>
                <Text style={{fontFamily: 'poppins-medium', color: '#fff'}}>
                  Update
                </Text>
              </View>
                </TouchableNativeFeedback>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            width: '95%',
            // height:50,
            borderRadius: 8,
            backgroundColor: '#f1f1f1',
            alignSelf: 'center',
            marginVertical: 10,
            paddingHorizontal: 8,
            paddingVertical: 4,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 11,
              fontFamily: 'poppins-semibold',
              color: '#000',
            }}>
            Plumber Remark:{' '}
            <Text style={{fontSize: 11, fontFamily: 'poppins-regular',color:'#000'}}>

          </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  requests: {
    display: 'flex',
  },
  booking: {
    display: 'flex',
    // height: 200,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#e9e9e9',
    marginVertical:10,
    borderWidth: 1,
    borderRadius: 10,
  },
  smlimage: {
    height: 15,
    width: 15,
    marginVertical: 2,
  },
  smltext: {
    fontFamily: 'poppins-regular',
    fontSize: 12,
    color: '#1D4831',
  },
});
