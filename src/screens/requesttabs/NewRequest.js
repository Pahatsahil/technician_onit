import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {GET_BROADCAST_TICKET} from '../../utils/endpoints';
import {COLORS} from '../../utils/constants';

const {height, width} = Dimensions.get('screen');
export default function NewRequestBox() {
  const navigation = useNavigation();
  const {accessToken, isLoggedIn, userData} = useSelector(state => state.auth);
  const [_allTickets, setAllTickets] = useState();
  const [accept, setAccept] = useState(false);
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);
  const [refetching, setRefetcing] = useState(false);

  const fetchTickets = async () => {
    setRefetcing(true);
    await axios({
      method: 'get',
      url: GET_BROADCAST_TICKET,
      headers: {
        'x-access-token': accessToken,
      },
    })
      .then(res => {
        setAllTickets(res.data.data);
        setRefetcing(false);
      })
      .catch(err => {
        console.log(err);
        setRefetcing(false);
      });
  };

  useEffect(() => {
    try {
      fetchTickets();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Modal
        visible={accept}
        transparent={true}
        animationType={'slide'}
        onRequestClose={() => setAccept(false)}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: height,
            width: width,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: height / 3,
              width: width,
              backgroundColor: 'white',
              padding: 30,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Are your sure you want to{' '}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                accept the booking?{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => setAccept(false)}
                style={{
                  backgroundColor: 'white',
                  height: height / 15,
                  width: width / 3,
                  borderWidth: 1,
                  borderColor: '#8e8e8e',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setAccept(false),
                    navigation.navigate('Payment', {data: item});
                }}
                style={{
                  backgroundColor: '#00796A',
                  height: height / 15,
                  width: width / 3,
                  borderWidth: 1,
                  borderColor: '#8e8e8e',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          height: '90%',
          backgroundColor: COLORS.GREY2,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={() => fetchTickets()}
          refreshing={refetching}
          data={_allTickets}
          ListEmptyComponent={
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!_allTickets && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <ActivityIndicator animating={!_allTickets} size="large" />
                </View>
              )}
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'poppins-semibold',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                No Request Available
                {'\n'}
                {'Share your QR from Profile'}
              </Text>
            </View>
          }
          contentContainerStyle={{
            flexGrow: 1,
            width: width,
            backgroundColor: 'white',
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item._id}
              style={{
                backgroundColor: 'white',
                width: '95%',
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: 12,
                borderWidth: 0.4,
                borderColor: '#d6d6d6',
                marginVertical: 10,
                elevation: 3,
              }}
              // onPress={() => navigation.navigate("Reviews", { id: item._id })}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#d6d6d6',
                  borderBottomWidth: 0.8,
                  padding: 10,
                }}>
                <View style={{paddingLeft: 10}}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../../images/water-tap.png')}
                  />
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 16}}>
                  <Text style={{fontSize: 16, color: COLORS.BLACK}}>
                    Booking ID:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: COLORS.BLACK,
                    }}>
                    {' '}
                    {item?.ticket_obj_id?.ticket_id}
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 6,
                    paddingHorizontal: 10,
                  }}>
                  <View style={{width: '70%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{width: 22, height: 22}}
                        source={require('../../images/warning.png')}
                      />
                      <Text style={{fontSize: 12, color: COLORS.BLACK}}>
                        {' '}
                        Problems:
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: COLORS.BLACK,
                      }}>
                      {' '}
                      {item?.ticket_obj_id?.specific_requirement}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      paddingBottom: 10,
                    }}>
                    <View>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontFamily: 'poppins-regular',
                          fontSize: 14,
                          color: item?.admin_setting?.is_paid
                            ? 'white'
                            : 'black',
                          backgroundColor: item?.admin_setting?.is_paid
                            ? 'green'
                            : 'yellow',
                          paddingHorizontal: 4,
                          borderRadius: 6,
                        }}>
                        {item?.admin_setting?.is_paid ? 'PAID' : 'DUE'}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: 'poppins-medium',
                        color: '#1D4831',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'center',
                      }}>
                      ₹{item?.ticket_obj_id?.ticket_price}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  flexGrow: 1,
                  marginBottom: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{width: 22, height: 22}}
                    source={require('../../images/location.png')}
                  />
                  <Text
                    style={{
                      fontFamily: 'poppins-regular',
                      fontSize: 12,
                      color: '#1D4831',
                      marginLeft: 8,
                      color: '#32acff',
                    }}>
                    {item?.ticket_obj_id?.address_details?.city},{' '}
                    {item?.ticket_obj_id?.address_details?.state},{' '}
                    {item?.ticket_obj_id?.address_details?.pincode}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#1D4831',
                    borderRadius: 4,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    setAccept(true);
                    setItem(item);
                  }}>
                  <View style={{alignSelf: 'center', padding: 8}}>
                    <Text style={{fontFamily: 'poppins-medium', color: '#fff'}}>
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '10%',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  requests: {
    backgroundColor: 'white',
  },
  booking: {
    // height: 200,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 10,
  },
  smlimage: {
    height: 15,
    width: 15,
  },
  smltext: {
    fontFamily: 'poppins-regular',
    fontSize: 12,
    color: '#1D4831',
  },
});
