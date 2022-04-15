import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
            userId: userId,
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
      <View style={styles.bottomTabNavigator}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('View', {name: name, userId: userId})
          }>
          <Text>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ArcList', {userId: userId, name: name})
          }>
          <Text>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {name: name, userId: userId})
          }>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
          <Text>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bottomTabNavigator: {
    flexDirection: 'row',
    color: 'black',
    backgroundColor: 'red',
    position: 'absolute',
    top: 614,
    width: '100%',
    height: 60,
    borderRadius: 20,
  },
});
