import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashBoardImage from '../../images/nav_dashboard-min.png';
import RechargeImage from '../../images/nav_recharge-min.png';
import BookingImage from '../../images/nav_bookings-min.png';
import ChatImage from '../../images/nav_chat-min.png';
import ProfileImage from '../../images/nav_profile-min.png';
import {Image, StyleSheet, View} from 'react-native';
import {
  Chat,
  Dashboard,
  Profile,
  Recharge,
  Expenses,
} from '../../screens/bottom';
import {Home} from '../../screens';
import {AddTechnician} from '../../screens/AddTechnician';
import Earning from '../../screens/bottom/Earning';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Booking"
      screenOptions={({route, navigation}) => ({
        tabBarStyle: {
          borderColor: 'rgba(52, 52, 52, 0.1)',
          borderWidth: 2,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          backgroundColor: '#fff',
          paddingHorizontal: 4,
          position: 'absolute',
          bottom: -1,
          paddingBottom: 3,
        },
        tabBarIcon: ({focused}) => {
          let imageName;
          switch (route.name) {
            case 'Dashboard':
              imageName = DashBoardImage;
              break;
            case 'Accounts':
              imageName = RechargeImage;
              break;
            case 'Booking':
              imageName = BookingImage;
              break;
            case 'Chat':
              imageName = ChatImage;
              break;
            case 'Profile':
              imageName = ProfileImage;
              break;
          }
          return <Image style={styles.nav_image} source={imageName} />;
        },
        tabBarLabelStyle: styles.nav_text,
        tabBarLabel: route.name,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Accounts" component={Earning} />
      <Tab.Screen name="Booking" component={Home} />
      {/* <Tab.Screen name='Chat' component={Chat} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'center',
  },
});
