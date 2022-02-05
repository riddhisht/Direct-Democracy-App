import { View, Text,Button } from 'react-native';
import React from 'react';


export default function Hompage({route,navigation}) {
  const mail = route.params.email;
  return (
    <View>
      <Text>Welcome, {mail} </Text>
      <Button title='Signout' color='blue' onPress={()=>navigation.replace("Login")}/>
    </View>
  );
}
