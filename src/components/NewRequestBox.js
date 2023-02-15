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

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get("screen");
export default function NewRequestBox() {
  const navigation = useNavigation()
  const { accessToken, isLoggedIn, userData } = useSelector((state) => state.auth);
  const [allTickets, setAllTickets] = useState();
  useEffect(() => {
    try {
      const fetchTickets = async () => {
        await axios({
          method: "get",
          url: "https://api.onit.fit/technicianApp/get-pending-tickets",
          headers: {
            "x-access-token": accessToken
          }
        }).then(res => setAllTickets(res.data.data));
      }
      fetchTickets()
    } catch (err) {
      console.log(err);
    }

  }, [])
  return (

    <FlatList showsVerticalScrollIndicator={false}
      data={[]}
      ListEmptyComponent={
        <View style={{ height: "100%", width: "100%", backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: '#1D4831',
              fontFamily: 'poppins-semibold',
              fontSize: 15
            }}
          >
            No Ticket Available
          </Text>
        </View>
      }
      contentContainerStyle={{
        minHeight: height * 0.8,
        width: width, backgroundColor: "white",
        paddingTop: 20
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#e9e9e9",
            borderRadius: 10,
            flexGrow:1, 
            marginBottom:6
          }}
          onPress={() => navigation.navigate("Reviews")}
        >
          <View>
            <View
              style={{
                height:height*0.1,
                borderBottomWidth: 1,
                borderColor: '#e9e9e9',
                flexDirection: 'row',
                paddingLeft:12
              }}>
              <View
                style={{
                  width: '65%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{ width: 22, height: 22, marginHorizontal:2 }}
                  source={require('../images/water-tap.png')}
                />
                {/* left side box of new request */}
                <Text
                  style={{
                    color: '#1D4831',
                    fontFamily: 'poppins-regular',
                  }}>
                  Booking ID :{' '}
                  <Text
                    style={{
                      color: '#1D4831',
                      fontFamily: 'poppins-semibold',
                    }}>
                    {item?.ticket_id}
                  </Text>
                </Text>
              </View>
              {/* right right box of new request */}
              <View
                style={{
                  width: '35%',
                  backgroundColor: '#e9e9e9',
                  borderColor: '#e9e9e9',
                  borderTopEndRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems:"center" }}>
                  <Image
                    style={styles.smlimage}
                    source={require('../images/date.png')}
                  />
                  <Text style={styles.smltext}> 10th March 2022</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Image
                    style={styles.smlimage}
                    source={require('../images/time.png')}
                  />
                  <Text style={styles.smltext}> 09:00 - 11:00 am</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                alignItems:"flex-start",
                paddingHorizontal:12,
                paddingVertical:6,
                minHeight:"10%",
              }}>
              <View
                style={{width:"40%"}}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={styles.smlimage}
                    source={require('../images/warning.png')}
                  />
                  <Text style={styles.smltext}>
                    Problem:
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'poppins-medium',
                    fontSize: 13,
                    color: '#1D4831',
                  }}>
                  {item?.specific_requirement}
                </Text>
              </View>
              <View style={{backgroundColor:"red"}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: 'poppins-regular',
                    fontSize: 14,
                    color: item?.admin_setting?.is_paid ? "white" : "black",
                    backgroundColor: item?.admin_setting?.is_paid ? "green" : "yellow",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}>
                  {item?.admin_setting?.is_paid ? 'PAID' : 'DUE'}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'poppins-medium',
                    color: '#1D4831',
                    alignSelf: 'center',
                  }}>
                  ₹ {item?.ticket_price}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderColor: '#e9e9e9',
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 12,
                height: 50,
                backgroundColor:"rgba(0,0,0,0.2)",
                borderBottomLeftRadius:6,
                borderTopEndRadius:6
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={[styles.smlimage]}
                  source={require('../images/location.png')}
                />
                <Text style={ {
                  fontFamily: 'poppins-regular',
                  fontSize: 12,
                  color: '#1D4831', marginLeft: 8, color: '#32acff' }}>
                  {item?.address_details?.city}, {item?.address_details?.state}, {item?.address_details?.pincode}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1D4831',
                  borderRadius: 4,
                }}>
                <View>
                  <Text style={{ fontFamily: 'poppins-medium', color: '#fff' }}>
                    Accept
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
        </TouchableOpacity>
      )}
    />

  );
}

const styles = StyleSheet.create({
  requests: {
    backgroundColor: "white",
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
