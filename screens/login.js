import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput
  } from 'react-native';
import auth from "@react-native-firebase/auth"
import { useState,useEffect } from 'react';


const LoginScreen = ({ navigation }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    useEffect(() => {
        navigation.setOptions({
            headerLeft: null
          });
    
      
    }, [navigation]);
    
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        }
    
    const login = () =>{
    

        auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
            console.log('User signed in!');
            
            console.log(email);
            navigation.replace('Homepage',{email:email})
            //navigation.navigate('Homepage');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            if (error.code ==='auth/wrong-password') {
                console.log('Invalid Password')
            }

            console.error(error);
        });
        auth().onAuthStateChanged(onAuthStateChanged);
        
    }
    if (!user) {
        return (
            
                <View style={styles.container}>
                <Text style= {styles.text}>
                    Email Id or Phone Number
                </Text>
                <TextInput
                placeholder='Enter Email ID' 
                onChangeText={(val)=>setEmail(val)}
                />
                <Text style = {styles.text}>
                    Password
                </Text>
                <TextInput 
                placeholder='Enter Password'
                onChangeText={(val)=>setPass(val)}
                />
                <Button title="Sign in"  onPress={login}/>
                
                <Button title="Sign up" color="#841584" onPress={() => navigation.navigate('Signup')}  />
                <Button title="Bill Proposal" color="#841584" onPress={() => navigation.navigate('Bill Proposal')}  />
                <Button title="Bill Voting" color="#841584" onPress={() => navigation.navigate('billvoting')}  />
                <Button title="Profile Page" color="#841584" onPress={() => navigation.navigate('Profile')}  />
                <Button title="Bills" color="#841584" onPress={() => navigation.navigate('View')}  />
                <Button title="ViewBill" color="#841584" onPress={() => navigation.navigate('ViewBill')}  />


                </View>
        
        );
    }
    return null;
        

};
const styles = StyleSheet.create({
    text : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color:'red'
    },
    container: {
        // flex:1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 10,
        // color: 'white'
    }
});


export default LoginScreen;