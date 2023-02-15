import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Header } from '../../components/Header';
import Center from '../ChatTabs/Center';
import Consumer from '../ChatTabs/Consumer';
import OniTSupport from '../ChatTabs/OniTSupport';

const { height, width } = Dimensions.get("screen");
const Tab = createMaterialTopTabNavigator();
const TopBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Center"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#00796A', height: 2 },
        tabBarActiveTintColor: '#00796A',
        tabBarInactiveTintColor: '#000000',
        tabBarPressColor: 'transparent',
        tabBarLabelStyle: {
          fontSize: 15,
          textTransform: 'capitalize',
          fontFamily: 'poppins-regular',
        },
        tabBarContentContainerStyle: { marginVertical: -2 },
        swipeEnabled: true,
      }}>
      <Tab.Screen
        name="Center"
        component={Center}
        options={{
          tabBarLabel: 'Center',
          padding: 10,
        }}
      />
      <Tab.Screen
        name="Consumer"
        component={Consumer}
        options={{ tabBarLabel: 'Consumer' }}
      />
      <Tab.Screen
        name="OniTSupport"
        component={OniTSupport}
        options={{ tabBarLabel: 'OniT Support' }}
      />
    </Tab.Navigator>
  );
}
const Chat = ({ navigation }) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View style={{ height: height * 0.76 }}>
        <TopBar />
      </View>
    </View>
  );
}

export default Chat
const styles = StyleSheet.create({
 
});
