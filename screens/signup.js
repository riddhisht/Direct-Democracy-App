import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNum] = useState(0);
  const [aadhar, setaadhar] = useState(0);
  const [password, setpassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const putdata = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        firestore()
          .collection('Users')
          .add({
            Name: name,
            Aadhar: aadhar,
            Email: email,
            Mobile_No: number,
            Password: password,
            Confirm_Password: confirmPass,
          })
          .then(() => {
            console.log('User added!');
            navigation.navigate('Homepage', {email: email});
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    //addItem(name, email, number, aadhar, password);
    //Alert.alert('Item saved successfully');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>REGISTRATION</Text>

        <Text style={styles.text}>username</Text>
        <TextInput
          title="name"
          onChangeText={val => setName(val)}
          style={styles.inputStyle}
        />

        <Text style={styles.text}>email</Text>
        <TextInput
          title="email"
          onChangeText={val => setEmail(val)}
          style={styles.inputStyle}
        />
        <Text style={styles.text}>phone number</Text>
        <TextInput
          title="phone"
          keyboardType="numeric"
          onChangeText={val => setNum(val)}
          style={styles.inputStyle}
        />
        <Text style={styles.text}>aadhar number</Text>
        <TextInput
          title="aadhar"
          onChangeText={val => setaadhar(val)}
          style={styles.inputStyle}
        />
        <Text style={styles.text}>password</Text>
        <TextInput
          title="password"
          onChangeText={val => setpassword(val)}
          style={styles.inputStyle}
        />
        <Text style={styles.text}> confirm password</Text>
        <TextInput
          title="confirmPass"
          onChangeText={val => setConfirmPass(val)}
          style={styles.inputStyle}
        />
        <View style={styles.submit}>
          <Button
            title="Register"
            onPress={putdata}
            style={styles.submitButton}
          />
        </View>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 37,
    marginTop: 30,
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 5,
  },
  inputStyle: {
    backgroundColor: '#C4C4C4',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
  },
  submit: {
    marginTop: 10,
    marginBottom: 10,
  },
  submitButton: {
    color: '#000',
  },
  // background: {
  //   backgroundColor: 'black',
  // },
  headerText: {
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 10,
  },
  link: {
    fontSize: 15,
    color: 'blue',
    marginBottom: 10,
  },
});
export default SignupScreen;
