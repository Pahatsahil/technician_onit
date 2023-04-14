import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Chat, Dashboard, Profile, Recharge} from '../../screens/bottom';
import {Home} from '../../screens';
import {BottomTabs} from '../Tabs/BottomTabs';
import ReviewScreen from '../../screens/ReviewScreen';
import {AddTechnician} from '../../screens/AddTechnician';
import {CreateTicket} from '../../screens/CreateTicket';
import {TechniciansList} from '../../screens/TechniciansList';
import {Payment} from '../../PaymentGateway/Payment';
import EditProfile from '../../screens/EditProfile';
import TermsCondition from '../../screens/Terms&Condition';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import AboutUs from '../../screens/AboutUs';
import Subscription from '../../screens/Subscription';
import {useSelector} from 'react-redux';
import OnboardingScreens from '../../screens/onboarding/OnboardingScreens';
import NewRequestBox from '../../components/NewRequestBox';
import JobCompleted from '../../screens/requesttabs/JobCompleted';
import CompletedRequestBox from '../../components/CompletedRequestBox';
import SearchTecnician from '../../screens/SearchTecnician';
// <<<<<<< HEAD
// =======
import Earning from '../../screens/bottom/Earning';
// >>>>>>> 7e7b8fb8b2a602f25b9ca85e9c99f516a4569163
import Expenses from '../../screens/bottom/Expenses';

const Stack = createStackNavigator();
const MainStack = () => {
  const {accessToken, isLoggedIn, userData} = useSelector(state => state.auth);
  return (
    <Stack.Navigator
      initialRouteName={
        userData?.userDetails?.center_id[0]?.payment_details
          ?.paid_for_onboarding_kit
          ? 'Tab'
          : 'Subscription'
      }>
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tab"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckTechnican"
        component={SearchTecnician}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Booking"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recharge"
        component={Recharge}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Earning"
        component={Earning}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="Reviews"
        component={ReviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobCompleted"
        component={JobCompleted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddTechnician"
        component={AddTechnician}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicket}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TechniciansList"
        component={TechniciansList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="profileCompleted"
        component={CompletedRequestBox}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
