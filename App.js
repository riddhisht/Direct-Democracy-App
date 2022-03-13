import React from 'react';
import {Text, View, Button} from 'react-native';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BillProposal from './screens/BillPropasal';
import Profile from './screens/profile';
import DummyView from './screens/dummyview';
import ViewBill from './screens/billview';
import billvoting from './screens/billvoting';
import Homepage from './screens/Hompage';
import PreviousBills from './screens/PreviousBills';
import {ScreenStackHeaderLeftView} from 'react-native-screens';
import ArcList from './screens/ArcList';
import ArticleView from './screens/ArticleView';
// import Tabs from './navigation/tabNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ArticleUp from './screens/ArticleUpload';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen
        name="Bill Proposal"
        component={BillProposal}
        options={{
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="BS"
              color="red"
            />
          ),
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="View" component={DummyView} />
      <Stack.Screen name="ViewBill" component={ViewBill} />
      <Stack.Screen name="billvoting" component={billvoting} />
      <Stack.Screen name="ArcList" component={ArcList} />
      <Stack.Screen name="ArticleView" component={ArticleView} />
      <Stack.Screen name="ArticleUp" component={ArticleUp} />
      <Stack.Screen name="PreviousBills" component={PreviousBills} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tabs" component={Tabs} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Signup" component={SignupScreen} />
        <Tab.Screen name="Bill Proposal" component={BillProposal} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;