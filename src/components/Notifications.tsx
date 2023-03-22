import React, {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const NotificationProps = () => {
  // const {userId} = useSelector((state: any) => state.auth);
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    GetFCMToken();
  }, []);

  const GetFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmToken) {
      try {
        let fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('FCM TOKEN', fcmToken);
          AsyncStorage.setItem('fcmtoken', fcmToken);
        }
      } catch (error) {
        console.log('ERROR in Token', error);
      }
    } else {
      console.log("FCMTOKEN", fcmToken)
    }
  };

  
  // PushNotification.createChannel(
  //   {
  //     channelId: '9873371012', // (required)
  //     channelName: 'CreatedChannel', // (required)
  //     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  //     playSound: false, // (optional) default: true
  //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //   },
  //   created => {
  //     console.log(`createChannel returned '${created}'`); // (optional) callback returns whether the channel was created, false means it already existed.
  //     // return (created);
  //   },
  // );
};

export const NotificationListener = () => {
    
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
    messaging().onMessage(async remoteMessage => {
      console.log('Notification in foreground state', remoteMessage);
      
    })
}
