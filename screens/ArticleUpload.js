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

const ArticleUp = ({navigation, route}) => {
  const [title, settitle] = useState('');
  const [data, setdata] = useState('');
  const [hashtags, sethashtags] = useState([]);
  const [likes, setlikes] = useState(0);
  const [dislikes, setdislikes] = useState(0);
  const [filter, setFilter] = useState();
  const [tog, setTog] = useState('');
  const [arts, setArts] = useState([]);



  //   const uname = route.params.name;
  const uname = route.params.uname;
  const billkey = route.params.billkey;
  const frombill = route.params.frombill;
  const userId = route.params.userId;

  const article = {
    title: title,
    data: data,
    hashtags: hashtags,
    likes: likes,
    dislikes: dislikes,
    uname: uname,
    
  };


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
  const clickhandler = async () => {

    if (frombill===true) {
      const newart = await firestore().collection('Article').add(article)
      console.log("hello ",newart.id)
  
  
  
      firestore().collection('Bills').doc(billkey).update({
        // arts: FieldValue.arrayU;nion("newvalueeeeee")
        arts: firestore.FieldValue.arrayUnion(newart.id)
      })
    
    
    
    } else {
      navigation.navigate("thankYou",{ article:article, "userId" :userId })  
      // firestore().collection('Article').add(article)
      // console.log("hello 000000")


    }
    


  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* style = { styles.bottom} */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Article Upload {billkey}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.titles}>Title</Text>
          <TextInput
            placeholder="Enter the title of your article"
            onChangeText={val => {
              settitle(val);
            }}
            style={styles.inputs}
          />

          <Text style={styles.titles}>Hashtags</Text>
          <TextInput
            placeholder="Add some hashtags for your article"
            //onChangeText = {(val)=> {setsalonname(val.charAt(0).toUpperCase()+ val.slice(1).toLowerCase())}}
            onChangeText={val => {
              sethashtags(val.split(" "));
            }}
            style={styles.inputs}
          />

          <Text style={styles.titles}>Article</Text>
          <TextInput
            placeholder="Paste or write your article"
            style={styles.mininputs}
            multiline={true}
            numberOfLines={5}
            onChangeText={val => {
              setdata(val);
            }}
          />
          <View style={styles.buttonView}>
            <Button
              style={styles.button}
              title="Submit"
              onPress={clickhandler}
              color="#18A999"
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

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
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  buttonView: {
    marginTop: 25,
  },
  cont: {
    padding: 50,
  },
});

export default ArticleUp;
