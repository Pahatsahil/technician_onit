import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Completed, NewRequest, Pending} from './requesttabs';
import {Header} from '../components/Header';
import axios from 'axios';
import plus from '../images/plus.png';
import {
  GET_ALL_SERVICES,
  GET_NOTIFICATION_TOKEN,
  GET_WALLET_BALANCE,
} from '../utils/endpoints';
import {useDispatch, useSelector} from 'react-redux';
import {setWalletBalance} from '../../redux-toolkit/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();

const Home = ({navigation, route}) => {
  const {walletBalance, userId, accessToken} = useSelector(
    (state: any) => state.auth,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(GET_ALL_SERVICES);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    console.log('USERID', userId);
    NotificationToken()
    if (userId) {
      WalletBalanceAPI();
    }
  }, []);

  const WalletBalanceAPI = async () => {
    try {
      let payload = {
        userId: userId,
        // amount: 99
      };
      const res = await axios({
        url: 'https://api.onit.fit/payment/wallet-balance',
        method: 'post',
        headers: {
          'x-access-token': accessToken,
        },
        data: payload,
      });
      if (res) {
        console.log('DATA_BALANCE', res.data);
        dispatch(setWalletBalance(res.data.wallet_balance));
      } else {
        console.log('ERROR BALANCE', res.error);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const NotificationToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    let device_id = await AsyncStorage.getItem('device_id');
    console.log('abhay', fcmToken);
    const payload = {
      token: fcmToken,
      device_id: device_id?.toString(),
    };
    try {
      console.log('NOTIFICATIONs',payload)
      const res = await axios({
        method: 'post',
        url: GET_NOTIFICATION_TOKEN,
        data: payload,
      })
      if(res){
        console.log('NotificationToken', res.data);
      }
      console.log('', res)
    } catch (err) {
      console.log('errorToken', err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <View style={{height: height * 0.76}}>
        <TopBar />
        <TouchableOpacity
          style={{
            backgroundColor: '#00796A',
            height: 60,
            borderRadius: 30,
            position: 'absolute',
            bottom: height * 0.003,
            right: '5%',
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 18,
          }}
          onPress={() => navigation.navigate('CreateTicket')}>
          <Image
            source={plus}
            style={{
              resizeMode: 'contain',
              height: 50,
              width: 50,
            }}
          />
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            Create Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function TopBar() {
  return (
    <Tab.Navigator
      initialRouteName="NewRequest"
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: '#00796A', height: 2},
        tabBarActiveTintColor: '#00796A',
        tabBarInactiveTintColor: '#000000',
        tabBarPressColor: 'transparent',
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
          fontFamily: 'poppins-regular',
        },
        tabBarContentContainerStyle: {marginVertical: 4},
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
        options={{tabBarLabel: 'Pending'}}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{tabBarLabel: 'Completed'}}
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
    alignSelf: 'center',
  },
});
