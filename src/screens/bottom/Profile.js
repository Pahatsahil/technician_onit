import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, StatusBar, Linking, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import addtechnician from "../../images/addTechnician.png";
import subscription from "../../images/subscription.png"
import report from "../../images/report.png"
import support from "../../images/support.png"
import terms from "../../images/terms.png"
import privacy from "../../images/privacy.png"
import about from "../../images/about.png"
import faq from "../../images/faq.png"
import angle from "../../images/angle.png"
import logOut from "../../images/logout.png"
import profile from "../../images/profile.png"
import refer from "../../images/refer.png"
import youtube from "../../images/youtube.png"
import language from "../../images/language.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAccessToken, setUserData } from '../../../redux-toolkit/slice';
import QRCode from 'react-native-qrcode-generator';
import { useRef } from 'react';
import share from "../../images/share.png"
import Share from 'react-native-share';
const { width, height } = Dimensions.get('window');

export default function Profile({ navigation }) {
  const { accessToken, isAuthorized, userData, profileImageUrl } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [qrimage, setQrimage] = useState();

  const subject = "Support and queries";
  const message = "Write your query or problem.";


  const PROFILE_ITEMS = [
    {
      name: "Technicians",
      uri: addtechnician,
      onPress: () => navigation.navigate("TechniciansList"),
    },
    {
      name: "Subscription",
      uri: subscription,
      onPress: () => navigation.navigate("Subscription"),
    },
    {
      name: "Support",
      uri: support,
      onPress: () => Linking.openURL(`mailto:help@onit.services?subject=${subject}&body=${message}`)
    },
    {
      name: "Terms & Conditions",
      uri: terms,
      onPress: () => navigation.navigate("TermsCondition")
    },
    {
      name: "About OniT",
      uri: about,
      onPress: () => navigation.navigate("AboutUs")
    },

    {
      name: "Privacy Policy",
      uri: privacy,
      onPress: () => navigation.navigate("PrivacyPolicy")
    },
    // {
    //   name: "FAQ's",
    //   uri: faq,
    //   onPress: () =>{}
    // },
    {
      name: "Refer",
      uri: refer,
      onPress: () => Linking.openURL("https://play.google.com/store/apps/details?id=com.onit.partners")
    },
    {
      name: "Youtube",
      uri: youtube,
      onPress: () => Linking.openURL("https://www.youtube.com/@onitservices3959/videos")
    },
    {
      name: "Language",
      uri: language,
      // onPress: () => Linking.openURL("https://www.youtube.com/@onitservices3959/videos")
    },
    {
      name: "LogOut",
      uri: logOut,
      onPress: () => { dispatch(logout()) }
    }
  ]

  const captureAndShareScreenshot = () => {
    let shareImage = {
      message: `https://app.onit.services/#/booking/${userData.userDetails?.center_id[0].qr_details.qr_id}`,
      url: qrimage,
    }
    Share.open(shareImage).catch(err => console.log(err));
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
          />
          <View
            style={{
              
              width: "80%",
              borderRadius: 20,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ marginBottom: 10, fontSize: 12, width: "60%", alignSelf: "center", fontFamily: 'poppins-medium',textAlign:"center" }}>Scan QR and book Ticket for
              <Text style={{ fontSize: 20, color:"#00796A"}}>
                {"\n" + userData?.userDetails?.center_id[0]?.center_name + "\n"}
              </Text> @ Zero Charges</Text>
            <QRCode
              value={`https://app.onit.services/#/booking/${userData.userDetails?.center_id[0].qr_details.qr_id}`}
              size={200}
              bgColor='black'
              fgColor='white'
              getImageOnLoad={(img) => setQrimage(img)}
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: "#00796A",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10
              }}
              onPress={() => captureAndShareScreenshot()}
            >
              <Image
                style={{ width: 22, height: 22, marginHorizontal: 2 }}
                source={share}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          height: "100%",
          width: "100%"
        }}
      >

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, backgroundColor: '#00796A', paddingTop: StatusBar.currentHeight, paddingBottom: 10 }}>
          <View>
            <Image
              style={{ height: 120, width: 120 }}
              source={{ uri: profileImageUrl }}
            />
          </View>
          <View style={{ marginLeft: 20, width: "60%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10
              }}
            >
              <View
                style={{
                  width: "50%",
                }}
              >
                <Text style={{ fontSize: 18, color: 'white' }}>{userData.userDetails?.personal_details?.name}</Text>
                <Text style={{ fontSize: 14, color: 'white', paddingBottom: 10 }}>
                  {userData.userDetails?.personal_details?.phone?.country_code}
                  {" " + userData.userDetails?.personal_details?.phone?.mobile_number}
                </Text>
              </View>
              <TouchableOpacity
                style={{ width: "40%", justifyContent: "center", alignItems: "center" }}
                onPress={() => setOpen(true)}
              >
                <Image
                  source={require("../../images/qrcode.png")}
                  style={{
                    height: 46,
                    width: 46,
                    borderColor: "white",
                    borderWidth: 1,
                  }}
                />
                <Text style={{ fontFamily: "poppins-regular", color: "#fff" }}>My QR</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.buttonBorder, { alignSelf: "center" }]} onPress={() => navigation.navigate("EditProfile")}>
              <Text style={{ color: 'white' }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ flex: 4, paddingTop: 20 }}>
          {PROFILE_ITEMS.map(PROFILE_ITEMS => {
            return (
              <TouchableOpacity key={PROFILE_ITEMS.name} style={styles.button} onPress={PROFILE_ITEMS.onPress} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <View>
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={PROFILE_ITEMS.uri}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={[styles.font, {color: PROFILE_ITEMS.name === "Subscription" ? "#00796A" : undefined}]}>{PROFILE_ITEMS.name}</Text>
                  </View>
                </View>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={angle}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  font: {
    fontSize: 16,
    paddingLeft: 20
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
    borderBottomColor: 'white'
  }
});
