import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import React from 'react';
import profile from '../../images/profile.png';
import {Header} from '../../components/Header';
import plus from '../../images/plus.png';
import {useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {BottomTabs} from '../../navigation/Tabs/BottomTabs';
import CheckBox from '@react-native-community/checkbox';
const {width, height} = Dimensions.get('window');
const transaction = [
  {
    item: 'tshirt',
    amount: -200,
  },
  {
    item: 'In app Purchases',
    amount: -200,
  },
  {
    item: 'Monthly Subscription',
    amount: -200,
  },
  {
    item: 'Call Credit',
    amount: -200,
  },
  {
    item: 'Call Credit',
    amount: -200,
  },
  {
    item: 'In app Purchases',
    amount: -200,
  },
  {
    item: 'Monthly Subscription',
    amount: -200,
  },
  {
    item: 'Call Credit',
    amount: -200,
  },
  {
    item: 'Call Credit',
    amount: -200,
  },
];

export default function Recharge({navigation}) {
  const {accessToken} = useSelector(state => state.auth);
  const [orderDetailsList, setOrderDetailsList] = useState();
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalLight, setModalLIght] = useState(false);
  const [modalDark, setModalDark] = useState(false);
  const [modalPink, setModalPink] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const getOrderList = async () => {
    setLoader(true);
    try {
      await axios({
        url: 'https://api.onit.fit/technicianapp/list-order-details',
        method: 'get',
        headers: {
          'x-access-token': accessToken,
        },
      }).then(res => {
        console.log(res.data.data.paymentDetails);
        setOrderDetailsList(res.data.data.paymentDetails);
        setLoader(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <View style={styles.modalView3}>
      <ImageBackground
        style={{flex: 0.7 / 2, marginTop: -42, width: width}}
        source={require('../../images/Rect.png')}>
        <Header />
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 17,
                  color: '#FFFFFF',
                  fontSize: 20,
                  backgroundColor: '#0066FF',
                  width: 172,
                  height: 30,
                  textAlign: 'center',
                  letterSpacing: 0.5,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}>
                Earning
              </Text>
            </TouchableOpacity>
          </View>
          {/* modal Expenses click */}

          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalDark}
              onRequestClose={() => {
                Alert.alert('Expenses has been closed.');
                setModalDark(!modalDark);
              }}>
              <View style={{flex: 1}}>
                <View style={styles.modalView3}>
                  <>

                 
                 
                    <ImageBackground
                      style={{flex: 0.6 / 2, width: width, marginTop: -36}}
                      source={require('../../images/Rect.png')}>
                      <Header />

                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              marginLeft: 25,
                              marginTop: 19,
                              fontSize: 20,
                              backgroundColor: '#00796A',
                              width: 172,
                              height: 30,
                              textAlign: 'center',
                              borderTopLeftRadius: 20,
                              letterSpacing: 0.5,
                              borderBottomLeftRadius: 20,
                            }}>
                            Earning
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                          <Text
                            style={{
                              marginTop: 19,
                              color: '#FFFFFF',
                              fontSize: 20,
                              backgroundColor: '#0066FF',
                              width: 172,
                              height: 30,
                              textAlign: 'center',
                              borderBottomRightRadius: 20,
                              letterSpacing: 0.5,
                              borderTopRightRadius: 20,
                            }}>
                            Expenses
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>

                    <View
                      style={{
                        backgroundColor: '#0066FF',
                        width: 350,
                        height: 85,
                        marginTop: -92,
                        marginLeft: 2,
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 20,
                          fontWeight: '600',
                          textAlign: 'center',
                          marginTop: 10,
                          letterSpacing: 0.5,
                        }}>
                        Platform Charges
                      </Text>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          marginRight: 40,
                        }}>
                        <Image source={require('../../images/reload.png')} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#FFFFFF',
                          fontSize: 32,
                          fontWeight: 'bold',
                          marginTop: -20,
                        }}>
                        ₹99
                      </Text>
                      {/* Calendar Modal        */}
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: '-23%',
                          marginTop: 7,
                        }}>
                        <View style={styles.centeredView}>
                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                              Alert.alert('Calendar has been closed.');
                              setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginTop: -16,
                                  }}>
                                  <TouchableOpacity>
                                    <Text
                                      style={{
                                        backgroundColor: '#F5F5F5',
                                        width: 100,
                                        height: 25,
                                        marginLeft: -2,
                                        fontWeight: '600',
                                        color: '#00796A',
                                        fontSize: 14,
                                        textAlign: 'center',
                                        shadowColor: '#00000029',
                                      }}>
                                      Last 24 hours
                                    </Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <Text
                                      style={{
                                        backgroundColor: '#F5F5F5',
                                        width: 100,
                                        height: 25,
                                        fontWeight: '600',
                                        marginLeft: 10,
                                        color: '#00796A',
                                        fontSize: 14,
                                        textAlign: 'center',
                                        shadowColor: '#00000029',
                                      }}>
                                      Last Week
                                    </Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity>
                                    <Text
                                      style={{
                                        backgroundColor: '#F5F5F5',
                                        width: 100,
                                        height: 25,
                                        fontWeight: '600',
                                        marginLeft: 10,
                                        color: '#00796A',
                                        fontSize: 14,
                                        textAlign: 'center',
                                        shadowColor: '#00000029',
                                      }}>
                                      Last Month
                                    </Text>
                                  </TouchableOpacity>
                                </View>

                                <TouchableOpacity>
                                  <Text
                                    style={{
                                      backgroundColor: '#F5F5F5',
                                      width: 100,
                                      height: 25,
                                      fontWeight: '600',
                                      marginLeft: 10,
                                      marginTop: 10,
                                      color: '#00796A',
                                      fontSize: 14,
                                      textAlign: 'center',
                                      shadowColor: '#00000029',
                                    }}>
                                    Custom Range
                                  </Text>
                                </TouchableOpacity>
                                <Pressable
                                  onPress={() =>
                                    setModalVisible(!modalVisible)
                                  }></Pressable>
                              </View>
                            </View>
                          </Modal>
                          <TouchableOpacity
                            onPress={() => setModalVisible(true)}>
                            <Image
                              source={require('../../images/Iconmodal.png')}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text
                          style={{
                            color: '#00796A',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15,
                            marginRight: 80,
                          }}>
                          Last 7 Days
                        </Text>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginRight: 26,
                            marginTop: 10,
                          }}>
                          <TouchableOpacity>
                            <Image source={require('../../images/email.png')} />
                          </TouchableOpacity>
                          <Text
                            style={{
                              color: '#17523C',
                              fontSize: 14,
                              marginRight: -16,
                            }}>
                            Export
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#FFFFFF',

                          height: 54,
                          width: 343,
                          flexDirection: 'row',
                          marginHorizontal: 1,
                          marginVertical: 7,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 20,
                            fontWeight: '500',
                            marginHorizontal: 20,
                          }}>
                          Amount Paid To Platform
                        </Text>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '500',
                            marginLeft: 25,
                          }}>
                          ₹200
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 54,
                          width: 343,
                          flexDirection: 'row',
                          marginHorizontal: 1,
                          marginTop: 2,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '600',
                            marginHorizontal: 16,
                            marginTop: -25,
                          }}>
                          Platform Charge for New Ticket
                        </Text>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '500',
                            marginTop: -25,
                          }}>
                          ₹200
                        </Text>

                        <Text
                          style={{
                            marginHorizontal: '-92%',
                            color: '#0066FF',
                            fontSize: 14,
                            marginTop: 17,
                          }}>
                          (Ticket Count – Amount)
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 54,
                          width: 343,
                          flexDirection: 'row',
                          marginHorizontal: 1,
                          alignItems: 'center',
                          marginTop: 12,
                        }}>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginHorizontal: 17,
                            marginTop: -25,
                          }}>
                          Platform Charge for New Ticket
                        </Text>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '500',
                            marginTop: -25,
                            marginLeft: 37,
                          }}>
                          ₹200
                        </Text>

                        <Text
                          style={{
                            marginHorizontal: '-91%',
                            color: '#0066FF',
                            fontSize: 14,
                            marginTop: 17,
                          }}>
                          (Ticket Count – Amount)
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 122,
                          width: 343,
                          flexDirection: 'row',
                          marginHorizontal: 1,
                          alignItems: 'center',
                          marginTop: 11,
                        }}>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginHorizontal: 20,
                            marginTop: -70,
                          }}>
                          Losses and Penalties
                        </Text>
                        <Text
                          style={{
                            marginLeft: -195,
                            fontSize: 16,
                            color: '#0066FF',
                            marginTop: -17,
                            fontWeight: '400',
                          }}>
                          Calls Count Moved for No Action
                        </Text>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '500',
                            marginTop: -59,
                            marginLeft: 40,
                          }}>
                          ₹ 99
                        </Text>
                        <Text
                          style={{
                            marginLeft: -105,
                            marginTop: 19,
                            color: '#0066FF',
                            fontWeight: '700',
                          }}>
                          (Paid for Picking)
                        </Text>
                        <Text
                          style={{
                            marginTop: 60,
                            marginLeft: -19,
                            color: '#0066FF',
                            fontWeight: '600',
                          }}>
                          43
                        </Text>

                        <Text
                          style={{
                            marginHorizontal: '-90%',
                            color: '#0066FF',
                            fontSize: 16,
                            marginTop: 50,
                            fontWeight: '500',
                          }}>
                          Warranty Liabilities
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 54,
                          width: 343,
                          flexDirection: 'row',
                          marginHorizontal: 1,
                          alignItems: 'center',
                          marginTop: 12,
                        }}>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginHorizontal: 20,
                          }}>
                          Admin Charge
                        </Text>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '500',
                            marginLeft: 130,
                          }}>
                          ₹200
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: 54,
                          width: 343,
                          flexDirection: 'row',
                          marginHorizontal: 1,
                          alignItems: 'center',
                          marginTop: 12,
                        }}>
                        <Text
                          style={{
                            color: '#0066FF',
                            fontSize: 18,
                            fontWeight: '600',
                            marginHorizontal: 20,
                          }}>
                          In App Purchases
                        </Text>
                      </View>
                    </View>
                  </>
                </View>

                <TouchableOpacity onPress={() => setModalDark(!modalDark)}>
                  <Image
                    source={require('../../images/back.png')}
                    style={{
                      height: 40,
                      width: 40,
                      marginLeft: 23,
                      marginVertical: '-176%',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalDark(true)}>
              <Text
                style={{
                  marginLeft: 1,
                  marginTop: 17,
                  color: '#FFFFFF',
                  fontSize: 20,
                  backgroundColor: '#00796A',
                  width: 170,
                  height: 30,
                  textAlign: 'center',
                  borderBottomRightRadius: 20,
                  borderTopRightRadius: 20,
                  letterSpacing: 0.5,
                }}>
                Expenses
              </Text>
            </TouchableOpacity>
          </>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: '#00796A',
          width: 350,
          height: 85,
          marginTop: -91,
          marginLeft: 11,
          borderRadius: 20,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 10,
            letterSpacing: 0.5,
          }}>
          Wallet Balance
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: 40,
          }}>
          <Image source={require('../../images/reload.png')} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 32,
            fontWeight: 'bold',
            marginTop: -16,
          }}>
          ₹99
        </Text>
        {/* Calender Model */}
        <View style={{flexDirection: 'row', marginLeft: '-29%', marginTop: 7}}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Calendar has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{flexDirection: 'row', marginTop: -16}}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          backgroundColor: '#F5F5F5',
                          width: 100,
                          height: 25,
                          marginLeft: -2,
                          fontWeight: '600',
                          color: '#00796A',
                          fontSize: 14,
                          textAlign: 'center',
                          shadowColor: '#00000029',
                        }}>
                        Last 24 hours
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text
                        style={{
                          backgroundColor: '#F5F5F5',
                          width: 100,
                          height: 25,
                          fontWeight: '600',
                          marginLeft: 10,
                          color: '#FFFFFF',
                          fontSize: 14,
                          textAlign: 'center',
                          shadowColor: '#00000029',
                          backgroundColor: '#00796A',
                        }}>
                        Last Week
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text
                        style={{
                          backgroundColor: '#F5F5F5',
                          width: 100,
                          height: 25,
                          fontWeight: '600',
                          marginLeft: 10,
                          color: '#00796A',
                          fontSize: 14,
                          textAlign: 'center',
                          shadowColor: '#00000029',
                        }}>
                        Last Month
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity>
                    <Text
                      style={{
                        backgroundColor: '#F5F5F5',
                        width: 100,
                        height: 25,
                        fontWeight: '600',
                        marginLeft: 10,
                        marginTop: 10,
                        color: '#00796A',
                        fontSize: 14,
                        textAlign: 'center',
                        shadowColor: '#00000029',
                      }}>
                      Custom Range
                    </Text>
                  </TouchableOpacity>
                  <Pressable
                    style={{marginLeft: '100%', marginTop: -15}}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={require('../../images/cross2.png')} />
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require('../../images/Iconmodal.png')} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: '#00796A',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 15,
              marginRight: 80,
            }}>
            Last 7 Days
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: 26,
              marginTop: 10,
            }}>
            <TouchableOpacity>
              <Image source={require('../../images/email.png')} />
            </TouchableOpacity>
            <Text style={{color: '#17523C', fontSize: 14, marginRight: -16}}>
              Export
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 54,
            width: 343,
            flexDirection: 'row',
            marginHorizontal: 1,
            marginVertical: 13,
            alignItems: 'center',
          }}>
          <Image
            style={{marginLeft: 10}}
            source={require('../../images/pouch.png')}
          />
          <Text
            style={{
              color: '#00796A',
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: 20,
            }}>
            Bonus (Accrued)
          </Text>
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: '700',
              marginLeft: 70,
            }}>
            ₹99
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 54,
            width: 343,
            flexDirection: 'row',
            marginHorizontal: 1,
            marginVertical: -4,
            alignItems: 'center',
          }}>
          <Image
            style={{marginLeft: 10, alignItems: 'center'}}
            source={require('../../images/invoice.png')}
          />
          <Text
            style={{
              color: '#00796A',
              fontSize: 19,
              fontWeight: 'bold',
              marginHorizontal: 20,
              marginTop: -25,
            }}>
            Earning From Own Ticket
          </Text>
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: '500',
              marginTop: -25,
            }}>
            ₹200
          </Text>

          <Text
            style={{
              marginHorizontal: '-80%',
              color: '#00796A',
              fontSize: 14,
              marginTop: 17,
              letterSpacing: 0.5,
            }}>
            (Zero Commission)
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 54,
            width: 343,
            flexDirection: 'row',
            marginHorizontal: 1,
            alignItems: 'center',
            marginTop: 18,
          }}>
          <Image
            style={{marginLeft: 10, alignItems: 'center'}}
            source={require('../../images/slip.png')}
          />
          <Text
            style={{
              color: '#00796A',
              fontSize: 15,
              fontWeight: 'bold',
              marginHorizontal: 20,
              marginTop: -25,
            }}>
            Earning from Tickets Thru URL
          </Text>
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: '500',
              marginTop: -25,
            }}>
            ₹358
          </Text>

          <Text
            style={{
              marginHorizontal: '-79%',
              color: '#00796A',
              fontSize: 14,
              marginTop: 17,
              letterSpacing: 0.5,
            }}>
            (Zero Commission)
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 54,
            width: 343,
            flexDirection: 'row',
            marginHorizontal: 1,
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Image
            style={{marginLeft: 10, alignItems: 'center'}}
            source={require('../../images/payment.png')}
          />
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: 20,
              marginTop: -25,
            }}>
            Earning from New Ticket
          </Text>
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: '500',
              marginTop: -25,
              marginLeft: 10,
            }}>
            ₹154
          </Text>

          <Text
            style={{
              marginHorizontal: '-79%',
              color: '#00796A',
              fontSize: 14,
              marginTop: 17,
              letterSpacing: 0.5,
            }}>
            (Customer)
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 54,
            width: 343,
            flexDirection: 'row',
            marginHorizontal: 1,
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Image
            style={{marginLeft: 10, alignItems: 'center'}}
            source={require('../../images/slip1.png')}
          />
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: 20,
              marginTop: -25,
            }}>
            Earning from New Ticket
          </Text>
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: '500',
              marginTop: -25,
              marginLeft: 10,
            }}>
            ₹154
          </Text>

          <Text
            style={{
              marginHorizontal: '-79%',
              color: '#00796A',
              fontSize: 14,
              marginTop: 17,
              letterSpacing: 0.5,
            }}>
            (Platform To Pay)
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 54,
            width: 343,
            flexDirection: 'row',
            marginHorizontal: 1,
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Image
            style={{marginLeft: 10, alignItems: 'center'}}
            source={require('../../images/wallet.png')}
          />
          <Text
            style={{
              color: '#00796A',
              fontSize: 18,
              fontWeight: 'bold',
              marginHorizontal: 20,
            }}>
            Wallet Recharge
          </Text>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalLight}
            onRequestClose={() => {
              Alert.alert('Adjust for Recharge has been closed.');
              setModalLIght(!ModalLight);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView2}>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    shadowOpacity: '#00000029',
                    height: 54,
                    width: 300,
                    flexDirection: 'row',
                    marginHorizontal: 1,
                    marginVertical: 20,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{marginLeft: 10}}
                    source={require('../../images/pouch.png')}
                  />
                  <Text
                    style={{
                      color: '#00796A',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 20,
                    }}>
                    Bonus (Accrued)
                  </Text>
                  <Text
                    style={{
                      color: '#00796A',
                      fontSize: 18,
                      fontWeight: '700',
                      marginLeft: 30,
                    }}>
                    ₹99
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    shadowOpacity: '#00000029',
                    height: 54,
                    width: 300,
                    flexDirection: 'row',
                    marginHorizontal: 1,
                    alignItems: 'center',
                    marginTop: -3,
                  }}>
                  <Image
                    style={{marginLeft: 10, alignItems: 'center'}}
                    source={require('../../images/plat.png')}
                  />
                  <Text
                    style={{
                      color: '#00796A',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginHorizontal: 20,
                      marginTop: -25,
                    }}>
                    Earning from New Ticket
                  </Text>
                  <Text
                    style={{
                      color: '#00796A',
                      fontSize: 18,
                      fontWeight: '500',
                      marginTop: -25,
                      marginLeft: 8,
                      fontWeight: 'bold',
                    }}>
                    ₹154
                  </Text>

                  <Text
                    style={{
                      marginHorizontal: '-79%',
                      color: '#00796A',
                      fontSize: 14,
                      marginTop: 17,
                      fontWeight: '600',
                    }}>
                    (Platform To Pay)
                  </Text>
                </View>

                <TouchableOpacity>
                  <View
                    style={{
                      marginRight: 1,
                      backgroundColor: '#00796A',
                      width: 300,
                      height: 51,
                      marginTop: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontWeight: '600',
                        fontSize: 20,
                        letterSpacing: 1,
                      }}
                      onPress={() => {
                        alert('coming soon');
                      }}>
                      Adjust for Recharge
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{marginVertical: '-88%'}}
                  onPress={() => setModalLIght(!ModalLight)}>
                  <Image source={require('../../images/cross2.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setModalLIght(true)}>
              <View
                style={{
                  marginRight: 190,
                  backgroundColor: '#00796A',
                  width: 165,
                  height: 40,
                  marginTop: -7,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '600',
                    letterSpacing: 0.5,
                  }}>
                  Adjust for Recharge
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* cash Recharge Modal */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalPink}
            onRequestClose={() => {
              Alert.alert('Cash Recharge has been closed.');
              setModalVisible(!modalPink);
            }}>
            <View style={{flex: 1}}>
              <View style={styles.modalView4}>
                <>
                  <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#F5F5F5"
                  />

                  <View
                  // style={{
                  //   flexDirection: "row",
                  //   backgroundColor: "#fff",
                  //   height: 60,
                  //   marginTop:30
                  // }}
                  >
                    <Text
                      style={{
                        marginTop: 20,
                        marginLeft: 123,
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      Cash Recharge
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 20,
                      marginBottom: 0,
                      fontSize: 15,
                      fontWeight: '500',
                    }}>
                    Pay Using:
                  </Text>

                  {/* for upi ssection */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 60,
                      marginTop: 15,
                      marginLeft: 20,
                      marginRight: 20,
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: '#00796A',
                    }}>
                    <Image
                      source={require('../../images/upi2.png')}
                      style={{
                        alignItems: 'center',
                        marginLeft: 5,
                      }}
                    />

                    <Text
                      style={{
                        flex: 0.9,
                        fontWeight: '400',
                        fontSize: 16,
                        color: 'black',
                        marginLeft: 20,
                      }}>
                      UPI
                    </Text>
                    <Image
                      source={require('../../images/check.png')}
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    />
                    {/* <Text>hi</Text> */}
                  </View>

                  {/* for wallet section */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 60,
                      marginTop: 15,
                      marginLeft: 20,
                      marginRight: 20,
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: '#00796A',
                    }}>
                    <Image
                      source={require('../../images/bxs-wallet.png')}
                      style={{
                        alignItems: 'center',
                        marginLeft: 5,
                      }}
                    />
                    <Text
                      style={{
                        flex: 0.9,
                        fontWeight: '400',
                        fontSize: 16,
                        color: 'black',
                        marginLeft: 20,
                      }}>
                      Wallet
                    </Text>
                    <Text style={{color: 'green', fontSize: 16}}></Text>
                    <Image
                      source={require('../../images/check.png')}
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    />
                  </View>

                  {/*for card section  */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 60,
                      marginTop: 15,
                      marginLeft: 20,
                      marginRight: 20,
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: '#00796A',
                    }}>
                    <Image
                      source={require('../../images/card.png')}
                      style={{
                        alignItems: 'center',
                        marginLeft: 4,
                      }}
                    />
                    <Text
                      style={{
                        flex: 0.9,
                        fontWeight: '400',
                        fontSize: 16,
                        color: 'black',
                        marginLeft: 20,
                      }}>
                      Credit/Debit card
                    </Text>
                    <Image
                      source={require('../../images/check.png')}
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    />
                    {/* <Text>hi</Text> */}
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 20,
                      marginBottom: 0,
                      fontSize: 15,
                      fontWeight: '500',
                    }}>
                    Details:
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 56,
                      margin: 16,
                      marginBottom: 0,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: '#ddd',
                    }}>
                    <TextInput
                      style={{
                        flex: 1,
                        fontWeight: '600',
                        fontSize: 15,
                        color: 'black',
                        marginLeft: 15,
                      }}
                      label="Email"
                      placeholder="Card Holder Name "
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#737373"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 56,
                      margin: 16,
                      marginBottom: 5,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: '#ddd',
                    }}>
                    <TextInput
                      style={{
                        flex: 1,
                        fontWeight: '600',
                        fontSize: 15,
                        color: 'black',
                        marginLeft: 15,
                      }}
                      placeholder="Card Number "
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#737373"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '96%',
                    }}>
                    <TextInput
                      style={{
                        flex: 1,
                        fontWeight: '600',
                        fontSize: 15,
                        color: 'black',
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        backgroundColor: '#fff',
                        marginLeft: 16,
                        height: 56,
                        padding: 20,
                        marginTop: 14,
                      }}
                      placeholder="CVV "
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#737373"
                    />
                    <TextInput
                      style={{
                        flex: 1,
                        fontWeight: '600',
                        fontSize: 15,
                        color: 'black',
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        backgroundColor: '#fff',
                        marginLeft: 16,
                        height: 56,
                        padding: 20,
                        marginTop: 12,
                      }}
                      placeholder="Valid Thru "
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#737373"
                    />
                  </View>
                  <View style={{flexDirection: 'row', letterSpacing: 3}}>
                    {/* checkbox */}
                    <View style={{marginTop: 15, marginLeft: 12}}>
                      <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                      />
                    </View>

                    <Text
                      style={{
                        marginLeft: 7,
                        marginTop: 20,
                        marginBottom: 0,
                        fontSize: 16,
                        fontWeight: '400',
                      }}>
                      Save for later,Your Card is
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: '#08B0DC',
                          borderBottomWidth: 1,
                          borderColor: '#08B0DC',
                          width: 50,
                          fontSize: 16,
                          marginTop: 20,
                          marginLeft: 4,
                        }}
                        onPress={() => {
                          alert('coming soon');
                        }}>
                        Secure
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      width: '92%',
                      backgroundColor: '#00796A',
                      height: 50,
                      marginTop: 18,
                      marginLeft: 20,
                      borderRadius: 3,
                    }}
                    //</View>onPress={() => { console.log("coming soon") }}>
                    onPress={() => {
                      alert('coming soon');
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 18,
                        letterSpacing: 1,
                        textAlign: 'center',
                        position: 'relative',
                        color: '#fff',
                      }}>
                      Pay Now
                    </Text>
                  </TouchableOpacity>
                </>
              </View>
              <TouchableOpacity onPress={() => setModalPink(!modalPink)}>
                <Image
                  source={require('../../images/back.png')}
                  style={{
                    height: 40,
                    width: 40,

                    marginVertical: '-174%',
                    marginLeft: 18,
                  }}
                />
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => setModalPink(true)}>
            <View
              style={{
                backgroundColor: '#0066FF',
                width: 165,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginTop: -7,
                marginLeft: 180,
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 15,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                }}>
                Cash Recharge
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: 343,
    height: 89,
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 10,
    shadowRadius: 4,
    elevation: 20,
  },

  modalView2: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: 343,
    height: 293,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView3: {
    width: width,
    height: '93%',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalView4: {
    width: width,
    height: '93%',
    backgroundColor: '#F5F5F5',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
