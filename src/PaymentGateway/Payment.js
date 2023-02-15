import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import angleLeft from "../images/angleLeft.png";
import { Card } from "react-native-paper";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import {
  ACCEPT_BROADCAST_TICKET,
  ACCEPT_TICKET_AFTER_PAYMENT,
  RAZORPAY_API_KEY,
} from "../utils/endpoints";

export const Payment = ({ navigation, route }) => {
  const { accessToken, isLoggedIn, userData } = useSelector(
    (state) => state.auth
  );
  const data = route?.params?.data;
  const [visible, setVisible] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState();
  console.log("Payment screen");
  useEffect(() => {
    setVisible(true);
    if (data?._id) {
      let payload = {
        broadcast_obj_id: data?._id,
      };
      try {
        axios({
          method: "post",
          url: ACCEPT_BROADCAST_TICKET,
          headers: {
            "x-access-token": accessToken,
          },
          data: payload,
        })
          .then((res) => {
            setPaymentRequest(res?.data?.data);
            handlePaymentRequest(res?.data?.data?.payment_response);
            setVisible(false);
          })
          .catch((error) => {
            console.log("Here-->", error?.response?.data?.message);
            ToastAndroid.show(
              error?.response?.data?.message.split(":")[1],
              ToastAndroid.SHORT
            );
            navigation.goBack();
          });
      } catch (err) {
        setVisible(false);
        ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
        navigation.goBack();
      }
    } else {
      setVisible(false);
      navigation.goBack();
    }
  }, []);

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
            ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
            navigation.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
          navigation.navigate("Tab", { screen: "Booking" });
        });
    } else {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  const paymentConformation = async (data) => {
    setVisible(true);
    try {
      await axios({
        method: "post",
        url: ACCEPT_TICKET_AFTER_PAYMENT,
        headers: {
          "x-access-token": accessToken,
        },
        data: data,
      }).then((res) => {
        setVisible(false);
        console.log("Payment Conformation", res?.data);
        navigation.replace("Tab", { screen: "Booking" });
      });
    } catch (err) {
      setVisible(false);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  return (
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
  );

  // return (
  //     <View
  //         style={{
  //             height: "100%",
  //             width: "100%",
  //             backgroundColor: "#fff",
  //         }}
  //     >
  //         <View
  //             style={{ flexDirection: "row", width: "100%", alignItems: "center", marginTop: StatusBar.currentHeight }}
  //         >
  //             <TouchableOpacity
  //                 onPress={() => navigation.goBack()}
  //             >
  //                 <Image
  //                     style={{ height: 40, width: 40, resizeMode: "contain" }}
  //                     source={angleLeft}
  //                 />
  //             </TouchableOpacity>
  //             <Text
  //                 style={{
  //                     fontFamily: 'poppins-semibold',
  //                     color: '#000',
  //                     fontSize: 20,
  //                     marginVertical: 10,
  //                 }}>
  //                 Payment
  //             </Text>
  //         </View>
  //         <Card
  //             style={{
  //                 height: "40%",
  //                 width: "90%",
  //                 marginTop: 30,
  //                 alignSelf: "center",
  //                 padding: 15,
  //                 elevation:10,
  //                 borderRadius:30,
  //             }}
  //         >
  //         <View
  //         style={{
  //             width:"100%",
  //             height:"100%",
  //             alignItems:"center",
  //         }}
  //         >
  //                 <Text
  //                     style={{
  //                         fontFamily: 'poppins-semibold',
  //                         color: '#000',
  //                         fontSize: 16,
  //                         marginVertical: 10,
  //                     }}
  //                 >
  //                     Order ID: {data?.ticket_id}
  //                 </Text>
  //                 <Text
  //                     style={{
  //                         fontFamily: 'poppins-semibold',
  //                         color: '#000',
  //                         fontSize: 14,
  //                         marginVertical: 10,
  //                     }}
  //                 >
  //                     Amount Payable: ₹{data?.ticket_price}
  //                 </Text>
  //                 <TouchableOpacity
  //                     style={{
  //                         backgroundColor: "#00796A",
  //                         width: "40%",
  //                         alignItems: "center",
  //                         justifyContent: "center",
  //                         position: "absolute",
  //                         bottom: 40,
  //                         borderRadius:10
  //                     }}
  //                     onPress={handlePaymentRequest}
  //                 >
  //                     <Text
  //                         style={{
  //                             fontFamily: 'poppins-semibold',
  //                             color: '#fff',
  //                             fontSize: 14,
  //                             marginVertical: 10,
  //                         }}
  //                     >
  //                         Pay Now
  //                     </Text>
  //                 </TouchableOpacity>
  //         </View>
  //         </Card>
  //     </View>
  // )
};
