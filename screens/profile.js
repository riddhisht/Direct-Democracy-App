import {Button, ThemeProvider, Avatar} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
function Profile() {
  const name = 'manav';
  const [toggleState, setToggleState] = useState(1);
  const [articles, setarticles] = useState([]);
  const [bills, setbills] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Article')
      // Filter results
      .where('uname', '==', name)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        ar = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id, documentSnapshot.data());
          ar.push({
            key: documentSnapshot.id,
            title: documentSnapshot.data().title,
            data: documentSnapshot.data().data,
            likes: documentSnapshot.data().likes,
            dislikes: documentSnapshot.data().dislikes,
            hashtags: documentSnapshot.data().hashtags,
            uname: documentSnapshot.data().uname,
          });
        });
        // bill fetching

        setarticles(ar);
        setloading(false);
      });
    const sub2 = firestore()
      .collection('Bills')
      // Filter results
      .where('name', '==', name)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        const big = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id, documentSnapshot.data());
          big.push({
            key: documentSnapshot.id,
            title: documentSnapshot.data().title,
            upvotes: documentSnapshot.data()['total downvotes'],
            downvotes: documentSnapshot.data()['total upvotes'],
            uname: documentSnapshot.data().name,
          });
        });
        // bill fetching

        setbills(big);
      });

    return () => [subscriber, sub2];
  }, []);

  const toggleTab = index => {
    setToggleState(index);
  };
  console.log(toggleState);
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userinfo}>
        <View style={styles.bell}>
          <Icon reverse name="bell" type="evilicon" color="black" />
        </View>
        <View style={styles.navicon}>
          <Icon reverse name="navicon" type="evilicon" color="black" />
        </View>
        <View style={styles.pic}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: 'https://media.vanityfair.com/photos/5cae5ea3f038af13baee9656/1:1/w_1332,h_1332,c_limit/jane-the-virgin-season-5-michael-memories-twist-raphael.jpg',
            }}
          />
          <Text style={styles.name}>Jane Doe</Text>
        </View>
      </View>
      <View style={styles.options}>
        <View>
          <Button
            style={toggleState === 1 ? styles.visible : styles.notVisible}
            onPress={() => {
              setToggleState(1);
              setdata(articles);
            }}
            title="Articles"
            color="Black"
          />
        </View>
        <View>
          <Button
            style={toggleState === 2 ? styles.visible : styles.notVisible}
            onPress={() => {
              setToggleState(2);
              setdata(bills);
            }}
            title="Bills"
            color="black"
          />
        </View>
        <View>
          <Button
            style={toggleState === 3 ? styles.visible : styles.notVisible}
            onPress={() => setToggleState(3)}
            title="Profile"
            color="black"
          />
        </View>
      </View>
      <View style={styles.feed}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View style={styles.listItem}>
                <View
                  style={
                    toggleState === 1 ? styles.visible : styles.notVisible
                  }>
                  <Text>{item.title}</Text>
                </View>
                <View
                  style={
                    toggleState === 2 ? styles.visible : styles.notVisible
                  }>
                  <Text>{item.title}</Text>
                </View>
                <View
                  style={
                    toggleState === 3 ? styles.visible : styles.notVisible
                  }>
                  <Text>What's 3</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userinfo: {
    flex: 1,
    maxHeight: 400,
    backgroundColor: 'lightblue',
  },
  pic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visible: {
    color: 'black',
  },
  notVisible: {
    display: 'none',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 100,
    backgroundColor: 'grey',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bell: {
    position: 'absolute',
    top: 30,
    right: 0,
  },
  navicon: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feed: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    padding: 40,
    margin: 10,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'space-between',
  },
});

export default Profile;
