import React, {useState, useEffect} from 'react';
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

const thankYou = ({navigation, route}) => {
  
    const article = route.params.article
    const data = route.params.article.data
    const userId = route.params.userId
    const [email, setEmail] = useState("")

    const [trig, setTrig] = useState(false)
    const [exp, setExp] = useState("")
    const [thank, setThank] = useState("")
    //console.log(data)

    useState(()=>{
    
        console.log('helllllll');
        firestore()
        .collection("Users")
        .doc(userId)
        .onSnapshot(documentSnapshot=>{
           

            setEmail(documentSnapshot.data().Email)

        })
    
      fetch('http://10.0.2.2:5000/', {
        method: 'POST',
        headers: {
          //   'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John',
          password: 'John123',
          data: data,
          api: "filter"
          //utags: tags,
        }),
      })
        .then(response => response.json())
        .then(json => {
          console.log("returned data: " + json);
          setExp(json)
          setTrig(true)
          //setUpdated(json);

          //console.log(updated);
          //setLoad(false);
        });
    
    },[data])


    useEffect(()=>{

        if(exp==='False'){

            firestore().collection('Article').add(article)
            setThank("Your article has been uploaded, Thank you.")

        }

        if(exp==='True'){
            setThank("Malicious content found, cannot upload the article.")
        }
    },[trig])

return(
    
    <View>
    <Text style={styles.text}>{thank} </Text>
    
    <Button
    title='Back to Home'
        onPress={()=>navigation.navigate("Homepage", {"email":email})}
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
});

export default thankYou;
