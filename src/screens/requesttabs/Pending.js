import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {onPress} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import {Payment} from '../../PaymentGateway/Payment';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment/moment';
import DatePicker from 'react-native-date-picker';
import {
  ASSIGN_TECHNICIAN,
  GET_ACCEPTED_TICKETS,
  GET_ALL_TECHNICIAN,
  UPDATE_TICKET_DETAILS,
} from '../../utils/endpoints';

const {height, width} = Dimensions.get('screen');
export default function Pending() {
  const navigation = useNavigation();
  const {accessToken, isLoggedIn, userData} = useSelector(state => state.auth);
  const [allTickets, setAllTickets] = useState();
  const [accept, setAccept] = useState(false);
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);
  const [allTechnicianCenter, setAllTechnicianCenter] = useState();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (item) {
      takeTime();
    }
  }, [date]);

  const takeTime = async () => {
    let payload = {
      ticket_obj_id: item._id,
      start_job: {
        start_time: new Date().toDateString(),
      },
      take_time: date,
    };
    await axios({
      method: 'post',
      url: UPDATE_TICKET_DETAILS,
      headers: {
        'x-access-token': accessToken,
      },
      data: payload,
    })
      .then(res => {
        fetchTickets();
        ToastAndroid.show('Time updated successfully!', ToastAndroid.LONG);
      })
      .catch(error => {
        console.log(error?.response?.data?.message);
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      });
  };

  const startWork = async id => {
    let payload = {
      ticket_obj_id: id,
      start_job: {
        start_time: new Date().toDateString(),
      },
    };
    await axios({
      method: 'post',
      url: UPDATE_TICKET_DETAILS,
      headers: {
        'x-access-token': accessToken,
      },
      data: payload,
    })
      .then(res => {
        fetchTickets();
        ToastAndroid.show('Work Started!', ToastAndroid.LONG);
      })
      .catch(error => {
        console.log(error?.response?.data?.message);
        ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      });
  };

  const fetchTickets = async () => {
    setVisible(true);
    try {
      await axios({
        method: 'get',
        url: GET_ACCEPTED_TICKETS,
        headers: {
          'x-access-token': accessToken,
        },
      }).then(res => {
        setAllTickets(res.data.data);
        setVisible(false);
        console.log(allTickets);
      });
    } catch (err) {
      console.log(err);
      setVisible(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getAllTechnicianCenter = async () => {
    setLoader(true);
    try {
      await axios({
        method: 'get',
        url: GET_ALL_TECHNICIAN,
        headers: {
          'x-access-token': accessToken,
        },
      }).then(res => {
        setAllTechnicianCenter(res?.data?.data);
      });
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  useEffect(() => {
    getAllTechnicianCenter();
  }, []);

  const assignTechnician = async id => {
    setVisible(true);
    let payload = {
      ticket_obj_id: item._id,
      techncian_obj_id: id,
    };
    try {
      await axios({
        method: 'post',
        url: ASSIGN_TECHNICIAN,
        headers: {
          'x-access-token': accessToken,
        },
        data: payload,
      }).then(res => {
        setAccept(false);
        setVisible(false);
        ToastAndroid.show(
          'Technician Assigned Successfully!',
          ToastAndroid.SHORT,
        );
        fetchTickets();
      });
    } catch (err) {
      console.log(err);
      setVisible(false);
      setAccept(false);
    }
  };

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
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView
            style={{
              maxHeight: '50%',
              width: '70%',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 12,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'poppins-semibold',
                  fontSize: 14,
                }}>
                Assign to Technician
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontFamily: 'poppins-regular',
                  fontSize: 12,
                }}>
                Choose one to Assign the Technician
              </Text>
            </View>
            {loader && <ActivityIndicator animating={loader} size="large" />}
            {allTechnicianCenter ? (
              allTechnicianCenter.map(item => (
                <TouchableOpacity
                  key={item?.personal_details?.name}
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.4,
                    marginBottom: 6,
                  }}
                  onPress={() => assignTechnician(item?._id)}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'poppins-medium',
                      fontSize: 13,
                    }}>
                    {item?.personal_details?.name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No Technician Available</Text>
            )}
          </ScrollView>
        </View>
      </Modal>
      <View
        style={{
          height: '90%',
        }}>
        <FlatList
          refreshing={visible}
          onRefresh={() => fetchTickets()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          data={allTickets}
          ListEmptyComponent={
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!allTickets && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <ActivityIndicator animating={!allTickets} size="large" />
                </View>
              )}
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'poppins-medium',
                  fontSize: 18,
                  textAlign: 'center'
                }}>
                No Request Available
                {'\n'}{'Share your QR from Profile'}
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
                flexGrow: 1,
                overflow: 'hidden',
              }}
              onPress={() => navigation.navigate('Reviews', {id: item._id})}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#00796A',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 16,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'poppins-medium',
                      fontSize: 20,
                    }}>
                    {item?.personal_details?.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: '35%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(
                      `tel:${
                        item?.personal_details?.primary_phone?.country_code +
                        item?.personal_details?.primary_phone?.mobile_number
                      }`,
                    );
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      height: 40,
                      width: 80,
                    }}>
                    <Image
                      source={require('../../images/phone.png')}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.smltext}>Call</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#d6d6d6',
                  borderBottomWidth: 0.8,
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{paddingLeft: 10}}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../../images/water-tap.png')}
                  />
                </View>
                <View style={{flexDirection: 'row', marginLeft: 16}}>
                  <Text style={{fontSize: 14}}>Booking ID:</Text>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    {' '}
                    {item?.ticket_id}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.smltext}>
                    <Image
                      source={require('../../images/date.png')}
                      style={{
                        height: 16,
                        width: 16,
                      }}
                    />
                    {' ' +
                      moment(item?.time_preference?.specific_date_time).format(
                        'Do MMM YYYY',
                      )}
                  </Text>
                  <Text style={styles.smltext}>
                    <Image
                      source={require('../../images/time.png')}
                      style={{
                        height: 16,
                        width: 16,
                      }}
                    />
                    {' ' +
                      moment(item?.time_preference?.specific_date_time).format(
                        'LT',
                      )}
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
                      <Text style={{fontSize: 12}}> Problems:</Text>
                    </View>
                    <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                      {' '}
                      {item?.specific_requirement}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                          backgroundColor: 'green',
                          paddingHorizontal: 4,
                          borderRadius: 6,
                        }}>
                        {item?.broadcast_status === 'matched_in_same_center'
                          ? 'FREE'
                          : 'PAID'}
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
                      ₹
                      {item?.broadcast_status === 'matched_in_same_center'
                        ? 0
                        : item?.ticket_price}
                    </Text>
                    {item?.assigned_ids?.assigned_technician_id &&
                      allTechnicianCenter && (
                        <Text style={styles.smltext}>
                          {[...allTechnicianCenter]
                            ?.filter(
                              element =>
                                element._id ===
                                item?.assigned_ids?.assigned_technician_id,
                            )[0]
                            ?.personal_details?.name?.toString()}
                        </Text>
                      )}
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '50%',
                  }}>
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
                    {item?.address_details?.house_number},{' '}
                    {item?.address_details?.locality},
                    {item?.address_details?.city},{' '}
                    {item?.address_details?.pincode}
                  </Text>
                </View>
                <View>
                  {userData?.userDetails?.is_technician_admin && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#1D4831',
                        borderRadius: 4,
                        alignSelf: 'center',
                      }}
                      // disabled={item?.assigned_ids?.assigned_technician_id}
                      onPress={() => {
                        setAccept(true);
                        setItem(item);
                      }}>
                      <View style={{alignSelf: 'center', padding: 8}}>
                        <Text
                          style={{
                            fontFamily: 'poppins-medium',
                            color: '#fff',
                            fontSize: 10,
                          }}>
                          {item?.assigned_ids?.assigned_technician_id
                            ? 'Reassign Technician'
                            : 'Assign Technician'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#1D4831',
                      borderRadius: 4,
                      alignSelf: 'center',
                      marginTop: 8,
                      width: 100,
                    }}
                    // disabled={item?.assigned_ids?.assigned_technician_id}
                    onPress={() => {
                      item?.time_preference?.time_preference_type !==
                      'SPECIFIC_DATE_AND_TIME'
                        ? startWork(item?._id)
                        : setOpen(true);
                      setItem(item);
                    }}>
                    <View style={{alignSelf: 'center', padding: 8}}>
                      <Text
                        style={{
                          fontFamily: 'poppins-medium',
                          color: '#fff',
                          fontSize: 10,
                        }}>
                        {item?.time_preference?.time_preference_type ===
                        'SPECIFIC_DATE_AND_TIME'
                          ? 'Take Time'
                          : item?.start_job
                          ? 'Started'
                          : 'Start'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
      <DatePicker
        modal
        mode="datetime"
        open={open}
        date={date}
        minimumDate={new Date()}
        onConfirm={_date => {
          setOpen(false);
          setDate(_date);
          // takeTime();
        }}
        onCancel={() => {
          setOpen(false);
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
