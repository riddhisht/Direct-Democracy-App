import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BillProposal from './screens/BillPropasal';
import Profile from './screens/profile'
import DummyView from './screens/dummyview';
import ViewBill from './screens/billview';
import billvoting from './screens/billvoting';
import Homepage from './screens/Hompage';
import ArtUpload from './screens/ArticleUpload';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import ArcList from './screens/ArcList';
import ArticleView from './screens/ArticleView';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Bill Proposal" component={BillProposal} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="View" component={DummyView} />
        <Stack.Screen name="ViewBill" component={ViewBill} />
        <Stack.Screen name="billvoting" component={billvoting}/>
        <Stack.Screen name="Homepage" component={Homepage}/>
        <Stack.Screen name = "ArtUpload" component={ArtUpload}/>
        <Stack.Screen name = "ArcList" component={ArcList}/>
        <Stack.Screen name = "ArticleView" component={ArticleView}/>
        


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

