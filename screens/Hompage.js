import {View, Text, Button, ActivityIndicator} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

export default function Hompage({route, navigation}) {
  const mail = route.params.email;
  const [loading, setloading] = useState(true);
  const [name, setname] = useState('');
  const [userId, setuserId] = useState('');
  const usersCollection = firestore()
    .collection('Users')
    .where('Email', '==', mail)
    .get()
    .then(collectionSnapshot => {
      collectionSnapshot.forEach(documentSnapshot => {
        console.log(
          'User ID: ',
          documentSnapshot.id,
          documentSnapshot.data().Name,
        );
        setname(documentSnapshot.data().Name);
        setuserId(documentSnapshot.id);
        setloading(false);
      });
    });

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Welcome, {name} </Text>
      <Button
        title="Signout"
        color="blue"
        onPress={() => navigation.replace('Login')}
      />
      <Button
        title="Bill Proposal"
        color="blue"
        onPress={() => navigation.navigate('Bill Proposal', {name: name})}
      />
      <Button
        title="Bills"
        color="#841584"
        onPress={() =>
          navigation.navigate('View', {name: name, userId: userId})
        }
      />
      <Button
        title="Article"
        color="#841584"
        onPress={() =>
          navigation.navigate('ArticleUp', {
            uname: name,
            frombill: false,
            billkey: null,
          })
        }
      />
      <Button
        title="Article List"
        color="#841584"
        onPress={() =>
          navigation.navigate('ArcList', {userId: userId, name: name})
        }
      />
    </View>
  );
}
