import React from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';

const LoginScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
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
      .then(json => {
        console.log(json);
      });
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
        navigation.replace('Homepage', {email: email});
        //navigation.navigate('Homepage');
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
        <View style={styles.whiteBg}>
          <Text style={styles.headerText}>LOGIN</Text>
          <Text style={styles.text}>username</Text>
          <TextInput
            placeholder="Enter Username"
            onChangeText={val => setEmail(val)}
            style={styles.inputStyle}
          />
          <Text style={styles.text}>password</Text>
          <TextInput
            placeholder="Enter Password"
            onChangeText={val => setPass(val)}
            style={styles.inputStyle}
          />
          <View style={styles.button}>
            <Button title="Sign in" onPress={login} />
          </View>
          <View>
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.signUp}>
              Don't have an account? Sign Up
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  container: {
    // flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    // color: 'white'
    width: '100%',
    backgroundColor: '#537A5A',
    height: 900,
  },
  whiteBg: {
    backgroundColor: 'white',
    width: '80%',
    marginTop: 100,
    marginLeft: 35,
    padding: 20,
    borderRadius: 20,
    height: 400,
  },
  inputStyle: {
    backgroundColor: '#C4C4C4',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  button: {
    width: 100,
    marginLeft: 90,
    marginTop: 15,
  },
  headerText: {
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 100,
    marginBottom: 10,
  },
  signUp: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#18A999',
  },
});

export default LoginScreen;
