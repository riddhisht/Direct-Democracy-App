import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const remark = ({navigation, route}) => {
  
    const key = route.params.key;
    const stat = route.params.stat;
    const [remark, setremark] = useState('');
    const [error,seterror] = useState('');
    const checkremark = (key,stat,remark) =>{
        if(remark){
            if(stat=='a'){
                firestore()
                    .collection('Bills')
                    .doc(key)
                    .update({
                        status: 'accepted',
                    })
                    .then(() => {
                        console.log('bill accepted');
                    });
                firestore()
                    .collection('Bills')
                    .doc(key)
                    .update({
                        remark:remark
                    })
                    .then(()=>console.log('remark taken'))
                navigation.replace('AdminPage')
            }
            else if (stat == 'r'){
                firestore()
                    .collection('Bills')
                    .doc(key)
                    .update({
                        status: 'rejected',
                    })
                    .then(() => {
                        console.log('bill rejected');
                    });
                firestore()
                    .collection('Bills')
                    .doc(key)
                    .update({
                        remark:remark
                    })
                    .then(()=>console.log('remark taken'))
                navigation.replace('AdminPage')
            }
        
        }
        else{
            seterror('please fill the remark')
        }
    }

   
    

return(
    
    <View>
    <Text style={styles.text}>Remark </Text>
    <TextInput
    title='remark'
    onChangeText={val=>setremark(val)}
    style={styles.inputs}
    />
    <Text style={styles.error}>{error}</Text>
    
    <Button
    title='confirm'
        onPress={()=>checkremark(key,stat,remark)}
    />
    </View>
    
)
    //   const uname = route.params.name;
//   const uname = route.params.uname;
//   const billkey = route.params.billkey;
//   const frombill = route.params.frombill;
  



  // useEffect(() => {
  //   console.log('effect');

  //   const output = async () =>{

  //     if (tog !== '') {
  //       fetch('http://10.0.2.2:5000/filter', {
  //         method: 'POST',
  //         headers: {
  //           //   'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           //name: 'John',
  //          // password: 'John123',
  //           data: article.data,
  //          // utags: Tags,
  //         }),
  //       })
  //         .then(response => response.json())
  //         .then(json => {
  //           //console.log("returned data: " + json);
  //           setFilter(json);
  
  
  //         });
  //     return
  //       }

  //       await output();
  //   }
    
  // }, [tog]);
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginLeft: 20,
  },
  form: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: 15,
  },
  inputs: {
    margin: 10,
    padding: 20,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  mininputs: {
    margin: 10,
    padding: 20,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  header: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#18A999',
    alignItems: 'center',
    width: '50%',
    marginLeft: 95,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  buttonView: {
    marginTop: 25,
  },
  cont: {
    padding: 50,
  },
  error: {
    color: 'red',
    fontSize: 10,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 5,
  },
});

export default remark;
