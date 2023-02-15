import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Completed, NewRequest, Pending } from './requesttabs';
import { Header } from '../components/Header';
import axios from 'axios';
import plus from "../images/plus.png"
import { GET_ALL_SERVICES } from '../utils/endpoints';

const { height, width } = Dimensions.get("screen");
const Tab = createMaterialTopTabNavigator();

const Home = ({ navigation, route }) => {
  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(GET_ALL_SERVICES);
    }
    fetchServices()
  }, [])

  return (
    <View style={{flex: 1, backgroundColor:"white"}}>
      <Header />
      <View style={{height:height * 0.76}}>
        <TopBar />
        <TouchableOpacity
          style={{
            backgroundColor: "#00796A",
            height: 60,
            borderRadius: 30,
            position: "absolute",
            bottom: height * 0.005,
            right: "5%",
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"row",
            paddingHorizontal:18
          }}
          onPress={() => navigation.navigate("CreateTicket")}
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
            Create Ticket
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TopBar() {
  return (
    <Tab.Navigator
      initialRouteName="New Request"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#00796A', height: 2 },
        tabBarActiveTintColor: '#00796A',
        tabBarInactiveTintColor: '#000000',
        tabBarPressColor: 'transparent',
        tabBarLabelStyle: {
          fontSize: 13,
          textTransform: 'capitalize',
          fontFamily: 'poppins-regular',
        },
        tabBarContentContainerStyle: { marginVertical:4 },
        swipeEnabled: true,
      }}>
      <Tab.Screen
        name="NewRequest"
        component={NewRequest}
        options={{tabBarLabel: 'New Request'}}
      />
      <Tab.Screen
        name="Pending"
        component={Pending}
        options={{ tabBarLabel: 'Pending' }}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{ tabBarLabel: 'Completed' }}
      />
    </Tab.Navigator>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flex: 0.6,
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },

  profile: {
    width: 42,
    height: 42,
  },
  padding: {
    marginHorizontal: 10,
  },
  nav_image: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginVertical: 5,
  },
  nav_text: {
    fontSize: 10,
    fontFamily: 'poppins-medium',
    color: '#00796a',
    alignSelf: 'center'
  }
});
