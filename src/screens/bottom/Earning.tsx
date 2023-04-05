import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Alert,
  StatusBar,
  TextInput,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../components/Header';
import {COLORS} from '../../utils/constants';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import {setWalletBalance} from '../../../redux-toolkit/slice';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZOR_TEST_KEY, RECHARGE_WALLET} from '../../utils/endpoints';

const {width, height} = Dimensions.get('screen');

const Earning = ({navigation}) => {
  const dispatch = useDispatch();
  const {accessToken, userData, userId, walletBalance} = useSelector(
    (state: any) => state.auth,
  );
  const [orderDetailsList, setOrderDetailsList] = useState();
  const [loader, setLoader] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [customDateModal, setCustomDateModal] = useState(false);
  const [ModalLight, setModalLIght] = useState(false);
  const [modalDark, setModalDark] = useState(false);
  const [modalPink, setModalPink] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Last Month');
  const [fromDate, setFromDate] = useState<Date>();
  const [fromDateModal, setFromDateModal] = useState();
  const [toDate, setToDate] = useState();
  const [walletModal, setWalletModal] = useState(false);
  const [rechargeAmt, setRechargeAmt] = useState('');
  let CustomDateis = fromDate + ' - ' + toDate;
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
        console.log('Order Data', res.data.data.paymentDetails);
        setOrderDetailsList(res.data.data.paymentDetails);
        setLoader(false);
      });
    } catch (err) {
      console.log('Error Data', err);
    }
  };
  useEffect(() => {
    getOrderList();
    WalletBalanceAPI()
  }, []);

  const EarningText = [
    {
      id: 1,
      icon: require('../../images/pouch.png'),
      name: 'Bonus (Accrued)',
      subText: '',
      amount: 99,
    },
    {
      id: 2,
      icon: require('../../images/invoice.png'),
      name: 'Earning from Own Ticket',
      subText: '(ZeroCommission)',
      amount: 200,
    },
    {
      id: 3,
      icon: require('../../images/slip.png'),
      name: 'Earning from Tickets throught URL',
      subText: '(ZeroCommission)',
      amount: 358,
    },
    {
      id: 4,
      icon: require('../../images/payment.png'),
      name: 'Earning from New Ticket',
      subText: '(Customer)',
      amount: 154,
    },
    {
      id: 5,
      icon: require('../../images/slip1.png'),
      name: 'Earning from New Ticket',
      subText: '(Platform to Pay)',
      amount: 99,
    },
    {
      id: 6,
      icon: require('../../images/wallet.png'),
      name: 'Wallet Recharge',
      subText: '',
      amount: null,
    },
  ];

  const AdjustRecharge = () => {
    return (
      <>
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
                      Alert.alert('coming soon');
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
                backgroundColor: '#00796A',
                width: width * 0.4,
                height: 40,
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
      </>
    );
  };

  const CalendarData = [
    {
      id: 1,
      name: 'Last 24 hours',
    },
    {
      id: 2,
      name: 'Last week',
    },
  ];

  const CalendarData2 = [
    {
      id: 1,
      name: 'Last month',
    },
    {
      id: 2,
      name: 'Custom Range',
    },
  ];

  // const CustomDate = () => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={customDateModal}
  //       onRequestClose={() => {
  //         setCustomDateModal(!customDateModal);
  //       }}>
  //       <View style={styles.modalBlack}>
  //         <View style={styles.modalView5}>
  //           <View
  //             style={{flexDirection: 'row', justifyContent: 'space-between'}}>
  //             <View style={{alignItems: 'center',marginBottom: 15}}>
  //               <Text style={{color: '#17523C', fontSize: 14, paddingBottom: 10}}>From</Text>
  //               <Text
  //                 style={{
  //                   borderRadius: 10,
  //                   borderColor: COLORS.DARK_GREEN,
  //                   borderWidth: 1,
  //                   width: width * 0.35,
  //                 }}
  //               >{fromDate}</Text>
  //                     <DateTimePicker
  //                       isVisible={open}
  //                       mode="date"
  //                       onConfirm={date => {
  //                         setFromDateModal(false);
  //                         setFromDate(date);
  //                       }}
  //                       onCancel={() => {
  //                         setFromDateModal(false);
  //                       }}
  //                       minimumDate={moment().subtract(18, 'years')._d}
  //                       date={moment().subtract(18, 'years')._d}
  //                     />
  //             </View>
  //             <View style={{alignItems: 'center',marginBottom: 15}}>
  //               <Text style={{color: '#17523C', fontSize: 14, paddingBottom: 10}}>To</Text>
  //               <TextInput
  //                 style={{
  //                   borderRadius: 10,
  //                   borderColor: COLORS.DARK_GREEN,
  //                   borderWidth: 1,
  //                   width: width * 0.35,
  //                 }}
  //                 onChangeText={(text: any) => setToDate(text)}
  //                 value={toDate}
  //               />
  //             </View>
  //           </View>
  //           <TouchableOpacity>
  //             <View
  //               style={{
  //                 marginRight: 1,
  //                 backgroundColor: '#00796A',
  //                 // width: 300,
  //                 // height: 51,
  //                 // marginTop: 20,
  //                 borderRadius: 10,
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 padding: 10,
  //               }}>
  //               <Text
  //                 style={{
  //                   color: '#FFFFFF',
  //                   fontWeight: '600',
  //                   fontSize: 20,
  //                   letterSpacing: 1,
  //                 }}
  //                 onPress={() => {
  //                   setCustomDateModal(!customDateModal);
  //                   setSelectedDate(CustomDateis);
  //                 }}>
  //                 OK
  //               </Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };

  const CalendarModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModal}
        onRequestClose={() => {
          Alert.alert('Calendar has been closed.');
          setDateModal(!dateModal);
        }}>
        <View style={styles.modalBlack}>
          <View style={styles.modalView}>
            <View>
              {CalendarData.map((item: any) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{alignSelf: 'auto', margin: 5}}
                    onPress={() => {
                      setSelectedDate(item.name);
                      setDateModal(!dateModal);
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#F5F5F5',
                        padding: 20,
                        fontWeight: '600',
                        color: '#00796A',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              {CalendarData2.map((item: any) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{alignSelf: 'auto', margin: 5}}
                    onPress={() => {
                      item.name == 'Custom Range'
                        ? setCustomDateModal(true)
                        : setSelectedDate(item.name);
                      setDateModal(!dateModal);
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#F5F5F5',
                        padding: 20,
                        fontWeight: '600',
                        color: '#00796A',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <Pressable
                style={{alignSelf: 'center'}}
                onPress={() => setDateModal(!dateModal)}>
                <Image source={require('../../images/cross2.png')} />
              </Pressable>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Modal>
    );
  };
  const CashRecharge = () => {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPink}
          onRequestClose={() => {
            Alert.alert('Cash Recharge has been closed.');
            setDateModal(!modalPink);
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
                      // style={styles.checkbox}
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
                        Alert.alert('coming soon');
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
                    Alert.alert('coming soon');
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
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              width: width * 0.4,
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
      </>
    );
  };

  const WalletBalanceAPI = async () => {
    try {
      let payload = {
        userId: userId,
        // amount: 99
      };
      const res = await axios({
        url: 'https://api.onit.fit/payment/wallet-balance',
        method: 'post',
        headers: {
          'x-access-token': accessToken,
        },
        data: payload,
      });
      if (res) {
        console.log('DATA_BALANCE', res.data);
        dispatch(setWalletBalance(res.data.wallet_balance));
      } else {
        console.log('ERROR BALANCE', res.error);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const rechargeWallet = async (data: any) => {
    try {
      setLoader(true)
      let payload = {
        userId: userId,
        amount: rechargeAmt,
        ...data,
      }
      const res = await axios({
        method: 'post',
        url: RECHARGE_WALLET,
        data: payload,
        headers: {
          "x-access-token": accessToken
        }
      })
      if (res) {
        console.log('Recharged', res.data)
        WalletBalanceAPI()
      } else {
        console.log('Recharged', res)  
      }
    } catch (error) {
      console.log('RechargedER', error)  
    }
  };
  const handlePaymentRequest = () => {
    let amt = parseInt(rechargeAmt);
    if (amt) {
      var options = {
        currency: 'INR',
        // currency: payment_response?.currency.toString(),
        key: RAZOR_TEST_KEY, // Your api key
        amount: (amt * 100).toString(),
        name: userData?.userDetails?.personal_details?.name.toString(),
        // order_id: payment_response?.id.toString(),
        prefill: {
          email: userData.userDetails?.personal_details?.email.toString() || '',
          contact:
            userData.userDetails?.personal_details?.phone?.country_code +
              userData?.populatedTechnicianDetails?.personal_details?.phone?.mobile_number.toString() ||
            '',
          name: 'Razorpay Software',
        },
      };
      console.log('Options ---> ', options);
      RazorpayCheckout.open(options)
        .then((data: any) => {
          console.log('This---->', data);
          try {
            rechargeWallet(data);
          } catch (err) {
            ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
            navigation.goBack();
          }
        })
        .catch((error: any) => {
          console.log(error);
          ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
          navigation.navigate('Tab', {screen: 'Booking'});
        });
    } else {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };
  const WalletRecharge = () => {
    return (
      <Modal
        visible={walletModal}
        onRequestClose={() => setWalletModal(!walletModal)}
        animationType="fade"
        transparent>
        <View style={styles.modalBlack}>
          <View style={styles.walletModalView}>
            <View
              style={{
                // alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.DARK_GREEN,
                  fontFamily: 'poppins',
                  fontSize: 18,
                  fontWeight: '700',
                  marginLeft: width * 0.2,
                }}>
                Wallet Recharge
              </Text>
              <Pressable
                style={{alignSelf: 'center'}}
                onPress={() => setWalletModal(!walletModal)}>
                <Image source={require('../../images/cross2.png')} />
              </Pressable>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <TextInput
                value={rechargeAmt}
                onChangeText={(text: any) => setRechargeAmt(text)}
                placeholder={'Enter Amount'}
                keyboardType="number-pad"
                style={{
                  width: width * 0.6,
                  borderWidth: 1,
                  borderColor: COLORS.LIGHT_BORDER,
                  fontSize: 16,
                  paddingHorizontal: 10,
                }}
              />
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <TouchableOpacity
                  style={styles.amt}
                  onPress={() => setRechargeAmt('100')}>
                  <Text style={{color: COLORS.LIGHT_BORDER}}>₹ 100</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.amt}
                  onPress={() => setRechargeAmt('200')}>
                  <Text style={{color: COLORS.LIGHT_BORDER}}>₹ 200</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.amt}
                  onPress={() => setRechargeAmt('500')}>
                  <Text style={{color: COLORS.LIGHT_BORDER}}>₹ 500</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.amt}
                  onPress={() => setRechargeAmt('1000')}>
                  <Text style={{color: COLORS.LIGHT_BORDER}}>₹ 1000</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handlePaymentRequest()}>
                <View
                  style={{
                    backgroundColor: '#00796A',
                    width: width * 0.4,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontWeight: '600',
                      letterSpacing: 0.5,
                    }}>
                    Recharge
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      {/* <CustomDate /> */}
      <WalletRecharge />
      <View style={styles.modalView3}>
        <ImageBackground
          style={{marginTop: -42, paddingBottom: 10, width: width}}
          source={require('../../images/Rect.png')}>
          <Header />
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.8,
              paddingVertical: 10,
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                backgroundColor: '#0066FF',
                width: '50%',
                textAlign: 'center',
                letterSpacing: 0.5,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              Earning
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Expenses')}
              style={{
                width: '50%',
                backgroundColor: COLORS.DARK_GREEN,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <Text
                style={{
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  color: '#fff',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Expenses
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#00796A',
              width: 350,
              height: 85,
              alignSelf: 'center',
              borderRadius: 20,
              marginTop: 5,
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
              onPress={() => WalletBalanceAPI()}
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
              {'₹'}
              {walletBalance}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            marginTop: 25,
            marginBottom: 5,
            marginHorizontal: 20,
            alignItems: 'center',
            width: width,
          }}>
          {/* Calender Model */}
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width * 0.9,
                // backgroundColor: COLORS.RED_DARK,
                justifyContent: 'space-between',
              }}>
              <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                <CalendarModal />
                <TouchableOpacity onPress={() => setDateModal(true)}>
                  <Image
                    source={require('../../images/Iconmodal.png')}
                    style={{marginLeft: 8}}
                  />
                  <Text style={{color: '#17523C', fontSize: 14}}>Date</Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: '#00796A',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: -15,
                }}>
                {selectedDate}
              </Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginRight: 26,
                  // marginVertical: 10,
                }}>
                <TouchableOpacity>
                  <Image source={require('../../images/email.png')} />
                </TouchableOpacity>
                <Text
                  style={{color: '#17523C', fontSize: 14, marginRight: -16}}>
                  Export
                </Text>
              </View>
            </View>

            {EarningText.map(item => {
              return item.id == 6 ? (
                <TouchableOpacity
                  onPress={() => setWalletModal(!walletModal)}
                  key={item.id}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    flexDirection: 'row',
                    marginVertical: 3,
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    width: width * 0.9,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={item.icon}
                    style={{alignSelf: 'center'}}
                  />
                  <View style={{width: width * 0.65, marginHorizontal: 10}}>
                    <Text
                      style={{
                        color: COLORS.DARK_GREEN,
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {item.name}{item.amount && '  >>>'}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.DARK_GREEN,
                        fontSize: 13,
                      }}>
                      {item.subText}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: COLORS.DARK_GREEN,
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    {item.amount && '₹ '}
                    {item.amount}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    flexDirection: 'row',
                    marginVertical: 3,
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    width: width * 0.9,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={item.icon}
                    style={{alignSelf: 'center'}}
                  />
                  <View style={{width: width * 0.65, marginHorizontal: 10}}>
                    <Text
                      style={{
                        color: COLORS.DARK_GREEN,
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.DARK_GREEN,
                        fontSize: 13,
                      }}>
                      {item.subText}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: COLORS.DARK_GREEN,
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    {item.amount && '₹ '}
                    {item.amount}
                  </Text>
                </View>
              );
            })}
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: -10,
              }}>
              <AdjustRecharge />
              <CashRecharge />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default Earning;

const styles = StyleSheet.create({
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  amt: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: COLORS.LIGHT_BORDER,
    borderWidth: 1,
    marginHorizontal: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalBlack: {
    flex: 1,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MODAL_BACKGROUND,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    flexDirection: 'row',
    // alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    width: width * 0.9,
    height: width * 0.5,
    elevation: 10,
  },
  walletModalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    width: width * 0.9,
    height: height * 0.3,
    elevation: 10,
  },
  modalView5: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // flexDirection: 'row',
    // alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    width: width * 0.9,
    height: width * 0.5,
    elevation: 10,
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
    flex: 1,
    backgroundColor: '#F5F5F5',
    // backgroundColor: COLORS.RED_DARK,
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
