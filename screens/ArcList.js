/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
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
import {ActivityIndicator} from 'react-native';
const ArcList = ({navigation}) => {
  const [dat, setDat] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const art = firestore()
      .collection('Article')
      .get()
      .then(collectionSnapshot => {
        bills = [];
        collectionSnapshot.forEach(documentSnapshot => {
          bills.push({
            key: documentSnapshot.id,
            title: documentSnapshot.data().title,
            data: documentSnapshot.data().data,
            likes: documentSnapshot.data().likes,
            dislikes: documentSnapshot.data().dislikes,
            hashtags: documentSnapshot.data().hashtags,
            uname: documentSnapshot.data().uname,
          });
        });

        setDat(bills);
        setLoad(false);
      });
    return () => art;
  });
  if (load) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dat}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() => navigation.navigate('ArticleView', item)}>
            <View style={styles.listitem}>
              <View>
                <Text style={styles.title}>Title: {item.title}</Text>

                <Text style={styles.number}>
                  BY {item.uname} {'\n'}
                  <Text>Likes:{item.likes}</Text> {'\n'}
                  <Text>dislikes:{item.dislikes}</Text>
                </Text>
              </View>
            </View>
            <View>
              <Text>Likes</Text>
              <Text>Dislikes</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'black',
  },
  listitem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'brown',
    padding: 10,
    marginTop: 10,
    borderRadius: 0,
    height: 160,
    //marginLeft:20
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    opacity: 1,
  },
  title: {
    //flex:1,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  number: {
    paddingTop: 7,
    color: 'black',
    fontSize: 16,
  },
  avatar: {
    paddingLeft: 50,
  },
});
export default ArcList;
