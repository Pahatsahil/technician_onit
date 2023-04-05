import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
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
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useSelector} from 'react-redux';
import {Header} from '../../components/Header';
import {COLORS} from '../../utils/constants';

const {width, height} = Dimensions.get('screen');

const Expenses = ({navigation}: any) => {
  const {accessToken} = useSelector((state: any) => state.auth);
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

  const ExpensesText = [
    {
      id: 1,
      name: 'Amount Paid to Platform',
      subText: '',
      amount: 200,
    },
    {
      id: 2,
      name: 'Platform Charge for New Ticket',
      subText: '(Ticket Count - Amount)',
      amount: 200,
    },
    {
      id: 3,
      name: 'Losses & Penalities',
      subText: 'Calls Count moved for No Action',
      amount: 358,
    },
    {
      id: 4,
      name: 'Admin Charge',
      subText: '',
      amount: 154,
    },
    {
      id: 5,
      name: 'In App Purchases',
      subText: '',
      amount: 99,
    },
  ];

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

  return (
    <>
      {/* <CustomDate /> */}
      <View style={styles.modalView3}>
        <ImageBackground
          style={{flex: 0.6 / 2, marginTop: -42, width: width}}
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
            <TouchableOpacity
            onPress={() => navigation.goBack()}
              style={{
                width: '50%',
                backgroundColor: COLORS.DARK_GREEN,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Earning
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                backgroundColor: '#0066FF',
                width: '50%',
                textAlign: 'center',
                letterSpacing: 0.5,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              Expense
            </Text>
            {/* <View>
            <TouchableOpacity>
            </TouchableOpacity>
          </View> */}
            {/* modal Expenses click */}

            {/* <>
              <ExpensesModal />
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
            </> */}
          </View>
        </ImageBackground>
        <View>
          <View
            style={{
              backgroundColor: '#0066FF',
              width: 350,
              height: 85,
              marginTop: -91,
              // marginLeft: 11,
              alignSelf: 'center',
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                // backgroundColor: COLORS.RED_DARK,
                marginBottom: 5,
                marginTop: 25,
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

            {ExpensesText.map(item => {
              return (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: COLORS.WHITE,
                    flexDirection: 'row',
                    marginVertical: 10,
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    paddingTop: 20,
                    width: width * 0.9,
                  }}>
                  <View style={{width: width * 0.65, marginHorizontal: 10}}>
                    <Text
                      style={{
                        color: '#0066FF',
                        fontWeight: '500',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: '#0066FF',
                        fontSize: 13,
                      }}>
                      {item.subText}
                    </Text>
                  </View>
                  <Text
                    style={{color: '#0066FF', fontWeight: '500', fontSize: 16}}>
                    {item.amount && '₹ '}
                    {item.amount}
                  </Text>
                </View>
              );
            })}
            <View style={styles.centeredView2}></View>
          </View>
        </View>
      </View>
    </>
  );
};
export default Expenses;

const styles = StyleSheet.create({
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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

  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});