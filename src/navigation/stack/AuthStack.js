import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CompleteProfile,
  GenerateQR,
  SignIn,
  SignInOtpScreen,
  SignUp,
  SignUpOtpScreen,
} from '../../screens';
import OnboardingScreens from '../../screens/onboarding/OnboardingScreens';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const AuthStack = () => {
  const {onboardingShown} = useSelector(state => state.auth);
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      {onboardingShown && (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreens}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInOtp"
        component={SignInOtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpOtp"
        component={SignUpOtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenerateQR"
        component={GenerateQR}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
