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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
//heelp
const ArcList = ({navigation, route}) => {
  const userId = route.params.userId;
  const namex = route.params.name;
  const [dat, setDat] = useState([]);
  const [load, setLoad] = useState(true);
  const [tags, setTags] = useState([]);
  const [userKey, setUserKey] = useState({});
  const [updated, setUpdated] = useState([]);
  const [filterDat, setFilterDat] = useState([]);
  const [searchText, setSearchText] = useState('');


  const liked = item => {
    console.log('likedd', item);
    setUserKey(item);
    firestore()
      .collection('Article')
      .doc(item.key)
      .update({
        likes: item.likes + 1,
      });
    // firestore()
    //   .collection('Users')
    //   .doc(userId)
    //   .onSnapshot(documentSnapshot => {
    //     setTags(documentSnapshot.data().tags);
    //     console.log('ho');
    //     setusertrigger(!usetrigger);
    //   });
    item.hashtags.map(tag => {
      firestore()
        .collection('Users')
        .doc(userId)
        .update({
          tags: firestore.FieldValue.arrayUnion(tag),
        });
    });
  };
  const disliked = item => {
    console.log('disssss', item);
    firestore()
      .collection('Article')
      .doc(item.key)
      .update({
        dislikes: item.dislikes + 1,
      });
  };


  const searchFilter = text => {
    if (text) {
      const newData = dat.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const itemData2 = item.preamble
          ? item.data.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
        );
      });
      setFilterDat(newData);
      setSearchText(text);
    } else {
      setFilterDat(dat);
      setSearchText(text);
    }
  };
  useEffect(() => {
    if (tags !== []) {
      fetch('http://10.0.2.2:5000/', {
        method: 'POST',
        headers: {
          //   'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John',
          password: 'John123',
          data: dat,
          utags: tags,
          api: 'recommend',
        }),
      })
        .then(response => response.json())
        .then(json => {
          //console.log("returned data: " + json);
          setUpdated(json);
          setFilterDat(json);

          console.log(updated);
          setLoad(false);
        });
    }
  }, [load, tags]);
  useEffect(() => {
    console.log(userId);
    const art = firestore()
      .collection('Article')
      .get()
      .then(collectionSnapshot => {
        var bills = [];
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
        setFilterDat(bills);

        firestore()
          .collection('Users')
          .doc(userId)
          .onSnapshot(documentSnapshot => {
            setTags(documentSnapshot.data().tags);
            //console.log('User data: ',tags);
          });
        console.log('User data: ', tags);
      });
    return () => art;
  }, []);
  if (load) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.appButtonContainer2}>
        <Text
          onPress={() =>
            navigation.navigate('ArticleUp', {
              uname: namex,
              billkey: '0',
              frombill: '0',
              userId: userId,
            })
          }
          style={styles.appButtonText}>
          Upload New Article
        </Text>
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Search Articles"
          value={searchText}
          onChangeText={text => searchFilter(text)}
          style={styles.searchIt}
        />
      </View>
      <FlatList
        data={filterDat}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ArticleView', {item: item, userId: namex})
            }>
            <View style={styles.listitem}>
              <View>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.number}>By - {item.uname}</Text>
              </View>
              <View style={styles.ButtonDistribution}>
                <TouchableOpacity
                  onPress={() => liked(item)}
                  style={styles.appButtonContainer1}>
                  {/* <Text>hello</Text> */}
                  <Text style={styles.buttonText}>Likes {item.likes}</Text>
                  {/* <Text style={styles.buttonText}></Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => disliked(item)}
                  style={styles.appButtonContainer3}>
                  <Text style={styles.buttonText}>
                    Dislikes {item.dislikes}
                  </Text>
                  {/* <Text style={styles.buttonText}></Text> */}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.bottomTabNavigator}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('View', {name: namex, userId: userId})
          }
          style={styles.ButtonOP}>
          <Text style={styles.textButton}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ArcList', {userId: userId, name: namex})
          }
          style={styles.ButtonOP}>
          <Text style={styles.textButton}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {name: namex, userId: userId})
          }
          style={styles.ButtonOP}>
          <Text style={styles.textButton}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminLogin')}
          style={styles.ButtonOP}>
          <Text style={styles.textButton}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'white',
  },
  listitem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F19A3E',
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    height: 160,
  },
  searchIt: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#F19A3E',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    margin: 5,
    paddingLeft: 5,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    opacity: 1,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  number: {
    color: 'black',
    fontSize: 18,
    fontStyle: 'italic',
    marginLeft: 10,
  },
  endDate: {
    position: 'absolute',
    left: 275,
    fontSize: 18,
    top: 125,
    color: 'white',
  },
  bottomTabNavigator: {
    flexDirection: 'row',
    color: 'black',
    backgroundColor: '#18A999',
    position: 'absolute',
    top: 620,
    width: '100%',
    height: 60,
    borderRadius: 20,
  },
  ButtonOP: {
    paddingRight: 35,
    paddingLeft: 20,
    paddingTop: 17,
  },
  textButton: {
    color: '#FFFFF2',
    fontSize: 17,
    fontWeight: '600',
  },
  // title: {
  //   //flex:1,
  //   color: 'black',
  //   fontSize: 25,
  //   fontWeight: 'bold',
  // },
  // number: {
  //   paddingTop: 7,
  //   color: 'black',
  //   fontSize: 16,
  // },
  avatar: {
    paddingLeft: 50,
  },
  likeDislikeTemp: {
    color: 'white',
  },
  ButtonDistribution: {
    // flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
    left: 10,
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: '#81B581',
    borderRadius: 10,
    width: 90,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    // padding: 20,
    height: 36,
  },
  appButtonContainer2: {
    // elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 210,
    marginLeft: 170,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonContainer3: {
    // elevation: 8,
    backgroundColor: '#CF3C3C',
    borderRadius: 10,
    width: 90,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    // padding: 20,
    height: 36,
  },
});
export default ArcList;
