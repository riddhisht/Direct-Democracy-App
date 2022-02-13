import React, {useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput
  } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//   import { ReactNativeFirebase } from '@react-native-firebase/app';
//   import database from '@react-native-firebase/database';



//   let addItem = (name, email, number, aadhar, password)=> {
//     database().ref('/draft').push({
//       name: name,
//       email: email,
//       number: parseInt(number),
//       aadhar: parseInt(aadhar),
//       password: password
//     });
//   };

  
  const SignupScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [number, setNum] = useState(0);
  const [aadhar, setaadhar] = useState(0);
  const [password, setpassword] = useState("");

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
          Email : email,
          Mobile_No : number,

      })
      .then(() => {
          console.log('User added!');
          navigation.replace('Homepage',{email:email});
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

    
}
    return (
            <View style={styles.container}>
                <View>
                <Text style = {styles.text}>Name</Text>
                <TextInput title='name'
                onChangeText = {(val) => setName(val)}
                />
                
                <Text style = {styles.text}>Email Id</Text>
                <TextInput title='email'
                onChangeText = {(val) => setEmail(val)}/>
                <Text style = {styles.text}>Phone Number</Text>
                <TextInput title='phone'
                keyboardType='numeric'
                onChangeText = {(val) => setNum(val)}/>
                <Text style = {styles.text}>Aadhar Number</Text>
                <TextInput title = 'aadhar'
                onChangeText = {(val) => setaadhar(val)}/>
                <Text style = {styles.text}>Password</Text>
                <TextInput title = 'password'
                onChangeText = {(val) => setpassword(val)}/>
                <Button title="Sign up" 
                onPress = {putdata}/>
                </View>


                
            </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 10
    },
    text: {
        // flex:1,
        // justifyContent: 'center',
        // alignItems:'center'
    }
});
export default SignupScreen;