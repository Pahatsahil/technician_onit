import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import MainStack from './src/navigation/stack/MainStack';
import AuthStack from './src/navigation/stack/AuthStack';

import {useSelector, useDispatch} from 'react-redux';
import {CompleteProfile, GenerateQR} from './src/screens';
import {AddTechnician} from './src/screens/AddTechnician';
import {setProfileImageUrl, setUserData} from './redux-toolkit/slice';
import axios from 'axios';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {deviceInfo} from './src/utils/deviceInfo';
//import Subscription from "./src/screens/Subscription";
import {GET_USER_DETAILS} from './src/utils/endpoints';
// import ReviewScreen from './src/screens/ReviewScreen';

const Stack = createStackNavigator();

export default function App() {
  const {accessToken, isLoggedIn, userData} = useSelector(state => state.auth);
  console.log(userData);
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    deviceInfo();
  }, []);

  useEffect(() => {
    if (accessToken !== '') {
      axios({
        method: 'get',
        url: GET_USER_DETAILS,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
        },
      }).then(res => {
        dispatch(setUserData(res?.data?.data));
      });
    }
  }, []);

  return (
    <>
      <NavigationContainer>
        {isLoggedIn ? (
          <MainStack />
        ) : (
          <>
            <AuthStack />
          </>
        )}
      </NavigationContainer>
      {/* <Subscription /> */}
    </>
  );
}
