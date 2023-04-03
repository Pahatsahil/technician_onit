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
        {!isLoggedIn ? (
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

// import { View, Text, Button } from 'react-native'
// import React, { useState } from 'react'
// import DatePicker from 'react-native-date-picker'
// import { Calendar } from 'react-native-calendars';


// const App = () => {
//     const [date, setDate] = useState(new Date())
//     const [open, setOpen] = useState(false)

//     return (
//         <View>
//             <Text>App</Text>
//             <View>
//                 <Text>wee all are grrot</Text>
//                 <Button title="open" onPress={() => setOpen(true)} />
//                 <DatePicker
//                     modal
//                     open={open}
//                     date={date}

//                     onConfirm={(date) => {
//                         setOpen(false)
//                         setDate(date)
//                     }}
//                     onCancel={() => {
//                         setOpen(false)
//                     }}
//                 />
//                 <Calendar
//                     current={'2023-01-01'}
//                     minDate={'2018-01-01'}
//                     maxDate={'2050-12-31'}
//                     hideExtraDays={true}
//                     hideArrows={false}
//                     disableMonthChange={false}
//                     firstDay={1}
//                     enableSwipeMonths={true}
//                     markedDates={{
//                         '2023-04-01': { selected: true },
//                         '2023-04-02': { selected: true },
//                         '2023-04-03': { selected: true },
//                     }}
//                     theme={{
//                         backgroundColor: '#ffffff',
//                         calendarBackground: '#ffffff',
//                         textSectionTitleColor: '#b6c1cd',
//                         selectedDayBackgroundColor: '#00adf5',
//                         selectedDayTextColor: '#ffffff',
//                         todayTextColor: '#00adf5',
//                         dayTextColor: '#2d4150',
//                         textDisabledColor: '#d9e1e8',
//                         dotColor: '#00adf5',
//                         selectedDotColor: '#ffffff',
//                         arrowColor: 'orange',
//                         monthTextColor: 'blue',
//                         textDayFontFamily: 'monospace',
//                         textMonthFontFamily: 'monospace',
//                         textDayHeaderFontFamily: 'monospace',
//                         textDayFontSize: 16,
//                         textMonthFontSize: 16,
//                         textDayHeaderFontSize: 16
//                     }}
//                 />
//             </View>
//         </View>
//     )
// }

// export default App
