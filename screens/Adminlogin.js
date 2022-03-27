import React from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';

const AdminLoginScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const email= "admin@gmail.com"
  const [pass, setPass] = useState('');

  useEffect(() => {
    console.log('helllllll');

    fetch('http://10.0.2.2:5000/', {
      method: 'POST',
      headers: {
        //   'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John',
        password: 'John123',
      }),
    })
      .then(response => response.json())
      .then(json =>

        {
          console.log(json);
        },
      );

  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, [navigation]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User signed in!');

        console.log(email);
        navigation.navigate('AdminPage');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Invalid Password');

        }

        console.error(error);
      });
    auth().onAuthStateChanged(onAuthStateChanged);
  };
  if (!user) {
    return (
      <View style={styles.container}>
        
        
        <Text style={styles.text}>Password</Text>
        <TextInput
          placeholder="Enter Password"
          onChangeText={val => setPass(val)}
        />
        <Button title="Sign in" onPress={login} />

      
       
      </View>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  container: {
    // flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    // color: 'white'
  },
});

export default AdminLoginScreen;
