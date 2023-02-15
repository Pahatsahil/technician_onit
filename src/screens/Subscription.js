import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { useSelector } from "react-redux";
import {
  AFTER_PAYMENT_PAY_ONBOARDING_KIT,
  PAY_ONBOARDING_KIT,
  RAZORPAY_API_KEY,
} from "../utils/endpoints";
import sub from "../images/sub.png";

const Subscription = () => {
  const { accessToken, isLoggedIn, userData } = useSelector(
    (state) => state.auth
  );
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  console.log(
    userData?.userDetails?.center_id[0]?.payment_details
      ?.paid_for_onboarding_kit
  );
  const payment = () => {
    setVisible(true);
    try {
      axios({
        method: "post",
        url: PAY_ONBOARDING_KIT,
        headers: {
          "x-access-token": accessToken,
        },
      })
        .then((res) => {
          handlePaymentRequest(res?.data?.data?.payment_response);
          setVisible(false);
        })
        .catch((error) => {
          console.log("Here-->", error?.response?.data?.message);
          ToastAndroid.show(
            error?.response?.data?.message.split(":")[1],
            ToastAndroid.SHORT
          );
          navigation.navigate("Tab", { screen: "Booking" });
        });
    } catch (err) {
      console.log(err);
      setVisible(false);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      navigation.navigate("Tab", { screen: "Booking" });
    }
  };

  const handlePaymentRequest = (payment_response) => {
    if (payment_response) {
      var options = {
        // currency: payment_response?.currency.toString(),
        key: RAZORPAY_API_KEY, // Your api key
        amount: payment_response?.amount.toString(),
        name: userData?.userDetails?.personal_details?.name.toString(),
        order_id: payment_response?.id.toString(),
        prefill: {
          // email: userData.userDetails?.personal_details?.email.toString() || "",
          // contact: userData.userDetails?.personal_details?.phone?.country_code + userData?.populatedTechnicianDetails?.personal_details?.phone?.mobile_number.toString() || "",
          name: "Razorpay Software",
        },
      };
      console.log("Options ---> ", options);
      RazorpayCheckout.open(options)
        .then((data) => {
          console.log("This---->", data);
          try {
            paymentConformation(data);
          } catch (err) {
            console.log(err);
            ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
            navigation.navigate("Tab", { screen: "Booking" });
          }
        })
        .catch((error) => {
          console.log("Here");
          console.log(error);
          ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
          navigation.navigate("Tab", { screen: "Booking" });
        });
    } else {
      console.log("Here");
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      navigation.navigate("Tab", { screen: "Booking" });
    }
  };

  const paymentConformation = async (data) => {
    setVisible(true);
    try {
      await axios({
        method: "post",
        url: AFTER_PAYMENT_PAY_ONBOARDING_KIT,
        headers: {
          "x-access-token": accessToken,
        },
        data: data,
      }).then((res) => {
        setVisible(false);
        console.log("Payment Conformation", res?.data);
        navigation.navigate("Tab");
      });
    } catch (err) {
      setVisible(false);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      navigation.navigate("Tab", { screen: "Booking" });
    }
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <ActivityIndicator animating={visible} size="large" />
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderRadius: 20,
            alignSelf: "center",
            elevation: 10,
          }}
        >
          {/* <TouchableOpacity
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            margin:10,
            alignSelf: "flex-start",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#000",
              // fontWeight:"bold",
              fontFamily: "poppins-medium",
            }}
          >
            {"<"} Back
          </Text>
        </TouchableOpacity> */}
          <View style={{ alignItems: "center", marginTop: 2, height: "20%" }}>
            <Image
              source={require("../images/logo.png")}
              resizeMode="contain"
              resizeMethod="resize"
              style={{ height: 100, width: 150 }}
            />
          </View>

          <Text
            style={{
              // backgroundColor: "#00796A",
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 8,
              color: "#0095ff",
              fontSize: 26,
              fontWeight: "500",
            }}
          >
            Limited Period Offer
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}>
              Create Your Own Booking
            </Text>
            <Text style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}>
              Link & QR
            </Text>
            <Text
              style={{
                fontFamily: "poppins-semibold",
                fontSize: 16,
                color: "rgba(0,0,0,0.6)",
                marginHorizontal: 20,
                marginVertical: 4,
                textAlign: "center",
              }}
            >
              Bring Your Business Online & Get Unlimited Tickets Directly from
              Customers, Dealers and Societies.
            </Text>
          </View>

          <View
            style={{
              width: "80%",
              backgroundColor: "rgba(255, 255, 255, 1)",
              alignItems: "center",
              padding: 20,
              paddingVertical: 28,
              borderRadius: 18,
              marginBottom: 10,
              elevation: 4,
            }}
          >
            <Text
              style={{
                // backgroundColor: "#00796A",
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 8,
                color: "#00796A",
                fontSize: 22,
                fontWeight: "500",
                fontFamily: "poppins-semibold"
              }}
            >
              Annual Subscription
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 26,
                fontFamily: "poppins-semibold",
              }}
            >
              <Text
                style={{
                  color: "#00796A",
                  textDecorationLine: "line-through",
                }}
              >
                ₹4999
              </Text>{" "}
              ₹1999/-
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#00796A",
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 6,
                marginVertical: 10,
              }}
              onPress={() => payment()}
              disabled={
                !!userData?.userDetails?.center_id[0]?.payment_details
                  ?.paid_for_onboarding_kit
              }
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#0095ff",
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 6,
              borderRadius: 30,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("Tab", { screen: "Booking" })}
            disabled={
              !!userData?.userDetails?.center_id[0]?.payment_details
                ?.paid_for_onboarding_kit
            }
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Start 15 Days Free Trial
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Subscription;
