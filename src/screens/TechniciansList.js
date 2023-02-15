import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import plus from "../images/plus.png";
import BottomImage from "../images/bottom.png";
import { GET_ALL_TECHNICIAN } from "../utils/endpoints";
const { width, height } = Dimensions.get("window");

export const TechniciansList = ({ navigation }) => {
  const { accessToken, userData } = useSelector((state) => state.auth);
  const [allTechnicianCenter, setAllTechnicianCenter] = useState();
  const [loader, setLoader] = useState(false);

  const getAllTechnicianCenter = async () => {
    setLoader(true);
    try {
      await axios({
        method: "get",
        url: GET_ALL_TECHNICIAN,
        headers: {
          "x-access-token": accessToken,
        },
      }).then((res) => {
        console.log(res?.data);
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

  return (
    <ImageBackground
      source={BottomImage}
      style={{}}
      // resizeMode="contain"
    >
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-semibold",
            color: "#000",
            fontSize: 17.5,
            paddingLeft: 20,
          }}
        >
          Technicians
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allTechnicianCenter}
        onRefresh={() => getAllTechnicianCenter()}
        refreshing={loader}
        ListEmptyComponent={
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                color: "black",
                fontSize: 18,
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: 10,
                borderRadius: 10,
              }}
            >
              No Technicians Found
            </Text>
          </View>
        }
        contentContainerStyle={{
          minHeight: height,
          width: width,
        }}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                width: "90%",
                height: 100,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
                alignSelf: "center",
                marginVertical: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                  paddingHorizontal: 18,
                }}
              >
                <View
                  style={{
                    height: "90%",
                    // width:"45%",
                    // backgroundColor: "red",
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.cardInfoText, { fontSize: 16 }]}>
                    {item?.personal_details?.name}
                  </Text>
                  <Text
                    style={[styles.cardInfoText, { color: "blue" }]}
                    onPress={() => {
                      Linking.openURL(
                        `tel:${
                          item?.personal_details?.phone?.country_code +
                          item?.personal_details?.phone?.mobile_number
                        }`
                      );
                    }}
                  >
                    {item?.personal_details?.phone?.country_code +
                      item?.personal_details?.phone?.mobile_number}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#00796A",
                    width: "25%",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      margin: 5,
                      fontSize: 10,
                      fontFamily: "poppins-regular",
                      color: "#fff",
                    }}
                  >
                    {item?.is_technician_admin ? "Admin" : "Technician"}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      />
      {userData.userDetails.is_technician_admin && (
        <TouchableOpacity
          style={{
            backgroundColor: "#00796A",
            height: 60,
            borderRadius: 30,
            position: "absolute",
            bottom: height * 0.15,
            right: "5%",
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"row",
            paddingHorizontal:18
          }}
          onPress={() => navigation.navigate("AddTechnician")}
        >
          <Image
            source={plus}
            style={{
              resizeMode: "contain",
              height: 50,
              width: 50,
            }}
          />
          <Text style={{color: "#fff", fontSize: 16, fontWeight:"bold" }}>
            Add Technician
          </Text>
        </TouchableOpacity>
      )}
      <Modal animationType="fade" transparent={true} visible={loader}>
        <View
          style={{
            height: height,
            width: width,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <ActivityIndicator animating={loader} size="large" />
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cardInfoText: {
    fontSize: 12,
    fontFamily: "poppins-regular",
    color: "#000",
  },
});
