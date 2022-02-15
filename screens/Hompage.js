import { View, Text,Button } from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';


export default function Hompage({route,navigation}) {
  const mail = route.params.email;
  const [name, setname] = useState("");
  const usersCollection = firestore()
    .collection('Users')
    .where("Email","==",mail)
    .get()
    .then(collectionSnapshot => {
            collectionSnapshot
            .forEach(documentSnapshot => {
                console.log('User ID: ', documentSnapshot.id,documentSnapshot.data().Name);
                setname(documentSnapshot.data().Name);
            });
    });
  

  return (
    <View>
      <Text>Welcome, {name} </Text>
      <Button title='Signout' color='blue' onPress={()=>navigation.replace("Login")}/>
      <Button title='Bill Proposal' color='blue' onPress={()=>navigation.navigate('Bill Proposal',{name:name})}/>
      <Button title="Bills" color="#841584" onPress={() => navigation.navigate('View',{name:name})}  />
      <Button title="Article" color="#841584" onPress={() => navigation.navigate('ArtUpload',{name:name})}  />

    </View>
  );
}
