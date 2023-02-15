import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
 ActivityIndicator

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { GET_CLOSED_TICKETS } from '../../utils/endpoints';

export default function Completed() {
  const navigation = useNavigation()
  const { accessToken, isLoggedIn, userData } = useSelector((state) => state.auth);
  const [allTickets, setAllTickets] = useState();
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    setLoader(true)
    try {
      await axios({
        method: "get",
        url: GET_CLOSED_TICKETS,
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        setAllTickets(res.data.data)
        setLoader(false)
      });
    } catch (err) {
      console.log(err);
      setLoader(false)
    }
  }
  console.log(allTickets)
  return (
    <>
      <View
        style={{
          height: "90%"
        }}
      >
        <FlatList
          refreshing={loader}
          onRefresh={() => fetchTickets()}
          showsVerticalScrollIndicator={false}
          data={allTickets}
          ListEmptyComponent={
            <View style={{ height: "100%", width: "100%", backgroundColor: "white", justifyContent: "center", alignItems: "center", }}>
              {
                !allTickets &&
                <View style={{ height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center", position: "absolute" }}>
                  <ActivityIndicator animating={!allTickets} size="large" />
                </View>
              }
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'poppins-medium',
                  fontSize: 18
                }}
              >
                No Ticket Available
              </Text>
            </View>
          }
          contentContainerStyle={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: "white",
          }}
          renderItem={({ item }) => (
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
                marginVertical: 10
              }}
              //onPress={() => navigation.navigate("Reviews", { id: item._id })}
            >
              <View style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "#d6d6d6",
                borderBottomWidth: 0.8,
                padding:10
              }}>
                <View style={{ paddingLeft: 10 }}>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require('../../images/water-tap.png')}
                  />
                </View>
                <View style={{ flexDirection: 'row', paddingLeft:16 }}>
                  <Text style={{ fontSize: 16 }}>Booking ID:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}> {item?.ticket_id}</Text>
                </View>
              </View>

              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6, paddingHorizontal: 10, paddingVertical:16 }}>
                  <View style={{ width: "70%" }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={{ width: 22, height: 22 }}
                        source={require('../../images/warning.png')}
                      />
                      <Text style={{ fontSize: 12 }}> Problems:</Text>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: 'bold' }}> {item?.specific_requirement}</Text>
                  </View>
                  <View style={{ width: "30%", alignItems: "center", justifyContent: "center", paddingBottom: 10 }}>
                    <View>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontFamily: 'poppins-regular',
                          fontSize: 14,
                          color: item?.admin_setting?.is_paid ? "white" : "black",
                          backgroundColor: item?.admin_setting?.is_paid ? "green" : "yellow",
                          paddingHorizontal: 4,
                          borderRadius: 6,
                        }}>
                        {item?.admin_setting?.is_paid ? 'PAID' : 'DUE'}
                      </Text>
                    </View>
                    <Text
                      style={{

                        fontFamily: 'poppins-medium',
                        color: '#1D4831',
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        alignSelf: "center"
                      }}>
                      ₹{+item?.ticket_price + +item?.closing_ticket_price}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
                alignContent: 'center',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                flexGrow: 1,
                marginBottom: 10
              }}
              >
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Image
                    style={{ width: 22, height: 22 }}
                    source={require('../../images/location.png')}
                  />
                  <Text style={{
                    fontFamily: 'poppins-regular', fontSize: 12, color: '#1D4831', marginLeft: 8, color: '#32acff'
                  }}>
                    {item?.address_details?.city}, {item?.address_details?.state}, {item?.address_details?.pincode}
                  </Text>
                </View>

                {/* <TouchableOpacity
                  style={{
                    backgroundColor: '#1D4831',
                    borderRadius: 4,
                    alignSelf: 'center',

                  }}
                  disabled={item?.assigned_ids?.assigned_technician_id}
                  onPress={() => { setAccept(true); setItem(item) }}
                >
                  <View style={{ alignSelf: 'center', padding: 8 }}>
                    <Text style={{ fontFamily: 'poppins-medium', color: '#fff', fontSize: 10 }}>
                      {item?.assigned_ids?.assigned_technician_id ? "Technician Assigned" : "Assign Technician"}
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          )
          }
        />
      </View>
      <View style={{
        backgroundColor: "#fff",
        width: "100%",
        height: "10%"
      }}
      />
    </>
  )
}