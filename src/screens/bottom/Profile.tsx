import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Linking,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import addtechnician from '../../images/addTechnician.png';
import subscription from '../../images/subscription.png';
import support from '../../images/support.png';
import terms from '../../images/terms.png';
import privacy from '../../images/privacy.png';
import about from '../../images/about.png';
import angle from '../../images/angle.png';
import logOut from '../../images/logout.png';
import refer from '../../images/refer.png';
import youtube from '../../images/youtube.png';
import language from '../../images/language.png';
import share from '../../images/share.png';
import report from '../../images/report.png';
import faq from '../../images/faq.png';
import profile from '../../images/profile.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  logout,
  setAccessToken,
  setUserData,
} from '../../../redux-toolkit/slice';
// import QRCode from 'react-native-qrcode-generator';
import QRCode from 'react-native-qrcode-svg';
import {useRef} from 'react';
import Share from 'react-native-share';
import {COLORS} from '../../utils/constants';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

export default function Profile({navigation: {navigate}}) {
  const {accessToken, isAuthorized, userData, profileImageUrl} = useSelector(
    (state: any) => state.auth,
  );
  const [open, setOpen] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const dispatch = useDispatch();
  const [qrimage, setQrimage] = useState();
  const [accType, setAccType] = useState();

  const subject = 'Support and queries';
  const message = 'Write your query or problem.';
  const PROFILE_ITEMS = [
    {
      name: 'Technicians',
      uri: addtechnician,
      onPress: () => navigate('TechniciansList'),
    },
    {
      name: 'Subscription',
      uri: subscription,
      onPress: () => navigate('Subscription'),
    },
    {
      name: 'Support',
      uri: support,
      onPress: () =>
        Linking.openURL(
          `mailto:help@onit.services?subject=${subject}&body=${message}`,
        ),
    },
    {
      name: 'Terms & Conditions',
      uri: terms,
      onPress: () => navigate('TermsCondition'),
    },
    {
      name: 'About OniT',
      uri: about,
      onPress: () => navigate('AboutUs'),
    },

    {
      name: 'Privacy Policy',
      uri: privacy,
      onPress: () => navigate('PrivacyPolicy'),
    },
    // {
    //   name: "FAQ's",
    //   uri: faq,
    //   onPress: () =>{}
    // },
    {
      name: 'Refer',
      uri: refer,
      onPress: () =>
        Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.onit.partners',
        ),
    },
    {
      name: 'Youtube',
      uri: youtube,
      onPress: () =>
        Linking.openURL('https://www.youtube.com/@onitservices3959/videos'),
    },
    {
      name: 'Language',
      uri: language,
      // onPress: () => Linking.openURL("https://www.youtube.com/@onitservices3959/videos")
    },
    {
      name: 'LogOut',
      uri: logOut,
      onPress: () => {
        setLogOutModal(true);
      },
    },
  ];
  const url = (Data: any) => {
    console.log(Data);
    setQrimage(Data);
  };

  const captureAndShareScreenshot = () => {
    let shareImage = {
      message: `https://app.onit.services/#/booking/${userData.userDetails?.center_id[0].qr_details.qr_id}`,
      url: `data:image/png;base64,${qrimage}`,
    };
    Share.open(shareImage).catch(err => console.log(err));
  };

  const QRCodeModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
          <View
            style={{
              width: '80%',
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 12,
                width: '60%',
                alignSelf: 'center',
                fontFamily: 'poppins-medium',
                textAlign: 'center',
              }}>
              Scan QR and book Ticket for
              <Text style={{fontSize: 20, color: '#00796A'}}>
                {'\n' + userData?.userDetails?.center_id[0]?.center_name + '\n'}
              </Text>{' '}
              @ Zero Charges
            </Text>
            <QRCode
              value={`https://app.onit.services/#/booking/${userData.userDetails?.center_id[0].qr_details.qr_id}`}
              // value={`http://facebook.github.io/react-native/`}
              size={200}
              // bgColor="white"
              // fgColor="black"
              getRef={(img: any) => {
                img?.toDataURL(url);
              }}
            />
            <TouchableOpacity
              style={{
                height: 35,
                // width: 30,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: 'grey',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                padding: 5,
                paddingHorizontal: 10,
              }}
              onPress={() => captureAndShareScreenshot()}>
              <Image
                style={{width: 22, height: 22, marginRight: 2}}
                source={share}
              />
              <Text
                style={{
                  color: COLORS.DARK_GREEN,
                  fontSize: 15,
                  textAlignVertical: 'top',
                }}>
                Share & Get Leads for Free
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const ProfileHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          backgroundColor: '#00796A',
          paddingTop: StatusBar.currentHeight,
          paddingBottom: 10,
        }}>
        <View>
          <Image
            style={{height: 120, width: 120}}
            source={{uri: profileImageUrl}}
          />
        </View>
        <View style={{marginLeft: 20, width: '60%'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: '50%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>
                  {userData.userDetails?.personal_details?.name}{' '}
                </Text>
                {accType ? (
                  <Image
                    source={require('../../images/tick.png')}
                    style={{height: 17, width: 17}}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../images/greenTick.png')}
                    style={{height: 17, width: 17}}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text style={{fontSize: 13, color: 'white', paddingBottom: 10}}>
                {'\n'}
                {userData.userDetails?.personal_details?.phone?.country_code}
                {' ' +
                  userData.userDetails?.personal_details?.phone?.mobile_number}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setOpen(true)}>
              <Image
                source={require('../../images/qrcode.png')}
                style={{
                  height: 46,
                  width: 46,
                  borderColor: 'white',
                  borderWidth: 1,
                }}
              />
              <Text style={{fontFamily: 'poppins-regular', color: '#fff'}}>
                My QR
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.buttonBorder, {alignSelf: 'center'}]}
            onPress={() => navigate('EditProfile')}>
            <Text style={{color: 'white', fontSize: 15}}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const LogOutConfirm = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={logOutModal}
        onRequestClose={() => setLogOutModal(false)}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
          <View
            style={{
              height: height * 0.27,
              width: width * 0.8,
              // justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.WHITE,
              marginHorizontal: 30,
              marginTop: 'auto',
              marginBottom: 'auto',
              elevation: 5,
              padding: 15,
              paddingTop: 45,
              borderRadius: 5,
            }}>
            <Text style={{color: COLORS.BLACK, fontSize: 15}}>
              Do you really want to Log Out from your Account ??
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.5,
                alignSelf: 'center',
                marginTop: height * 0.1,
              }}>
              <TouchableOpacity onPress={() => setLogOutModal(false)}>
                <Text style={{color: COLORS.DARK_GREEN, fontSize: 16}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(logout())}>
                <Text style={{color: COLORS.RED_DARK, fontSize: 16}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <LogOutConfirm />
      <QRCodeModal />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.GREY2,
        }}>
        <ProfileHeader />

        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{flex: 1, paddingTop: 20}}>
          {PROFILE_ITEMS.map(PROFILE_ITEMS => {
            return (
              <TouchableOpacity
                key={PROFILE_ITEMS.name}
                style={styles.button}
                onPress={PROFILE_ITEMS.onPress}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View>
                    <Image
                      style={{height: 30, width: 30}}
                      source={PROFILE_ITEMS.uri}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.font,
                        {
                          color:
                            PROFILE_ITEMS.name === 'Subscription'
                              ? COLORS.DARK_GREEN
                              : COLORS.BLACK,
                        },
                      ]}>
                      {PROFILE_ITEMS.name}
                    </Text>
                  </View>
                </View>
                <Image style={{height: 30, width: 30}} source={angle} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  font: {
    fontSize: 16,
    paddingLeft: 20,
  },
  buttonBorder: {
    borderRadius: 5,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    width: width / 2,
    backgroundColor: '#00796A',
    borderWidth: 1,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    marginLeft: '-10%',
  },
});
