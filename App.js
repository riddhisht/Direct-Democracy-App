import React from 'react';
import {Text, View, Button} from 'react-native';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BillProposal from './screens/BillPropasal';
import thankYou from './screens/thankYou';
import Profile from './screens/profile';
import DummyView from './screens/dummyview';
import ViewBill from './screens/billview';
import billvoting from './screens/billvoting';
import Homepage from './screens/Hompage';
import PreviousBills from './screens/PreviousBills';
import AdminLoginScreen from './screens/Adminlogin';
import AdminPage from './screens/AdminPage';
import {ScreenStackHeaderLeftView} from 'react-native-screens';
import ArcList from './screens/ArcList';
import ArticleView from './screens/ArticleView';
// import Tabs from './navigation/tabNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ArticleUp from './screens/ArticleUpload';
import messaging from '@react-native-firebase/messaging'
import billArticles from './screens/billArticles';
import AdminReport from './screens/adminReport';
import BillEdit from './screens/billEdit';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
//       <Stack.Screen name="AdminPage" component={AdminPage} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//       <Stack.Screen name="Homepage" component={Homepage} />
//       <Stack.Screen name="Bill Proposal" component={BillProposal} />
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="View" component={DummyView} />
//       <Stack.Screen name="ViewBill" component={ViewBill} />
//       <Stack.Screen name="billvoting" component={billvoting} />
//       <Stack.Screen name="ArcList" component={ArcList} />
//       <Stack.Screen name="ArticleView" component={ArticleView} />
//       <Stack.Screen name="ArticleUp" component={ArticleUp} />
//       <Stack.Screen name="PreviousBills" component={PreviousBills} />
//       <Stack.Screen name="billArticles" component={billArticles} />
//       <Stack.Screen name="adminReport" component={AdminReport} />
//       <Stack.Screen name="billEdit" component={BillEdit} />
//     </Stack.Navigator>
//   );
// };
const App = () => {
  messaging().subscribeToTopic('All');
  return (
    <NavigationContainer>
      {/* <Tab.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="View" component={DummyView} />
        <Stack.Screen name="ArcList" component={ArcList} />
        <Tab.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator> */}
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Bill Proposal" component={BillProposal} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="View" component={DummyView} />
        <Stack.Screen name="ViewBill" component={ViewBill} />
        <Stack.Screen name="billvoting" component={billvoting} />
        <Stack.Screen name="ArcList" component={ArcList} />
        <Stack.Screen name="thankYou" component={thankYou} />

        <Stack.Screen name="ArticleView" component={ArticleView} />
        <Stack.Screen name="ArticleUp" component={ArticleUp} />
        <Stack.Screen name="PreviousBills" component={PreviousBills} />
        <Stack.Screen name="billArticles" component={billArticles} />
        <Stack.Screen name="adminReport" component={AdminReport} />
        <Stack.Screen name="billEdit" component={BillEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
