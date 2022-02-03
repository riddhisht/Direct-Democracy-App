import { View, Text } from 'react-native';
import React from 'react';

export default function Hompage({route}) {
  const mail = route.params.email;
  return (
    <View>
      <Text>Welcome, {mail} </Text>
    </View>
  );
}
