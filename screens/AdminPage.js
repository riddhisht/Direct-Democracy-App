import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
const AdminPage = ({navigation}) => {
  const username = 'admin';
  const userId = 'admin';
  const [dat, setDat] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Bills')
      .where('status', '==', 'decision')
      .get()
      .then(collectionSnapshot => {
        const bills = [];
        collectionSnapshot.forEach(documentSnapshot => {
          //console.log('User ID: ', documentSnapshot.id,documentSnapshot.data().number,documentSnapshot.data().title);

          bills.push({
            key: documentSnapshot.id,
            number: documentSnapshot.data().number,
            title: documentSnapshot.data().title,
            preamble: documentSnapshot.data().preamble,
            enactingClause: documentSnapshot.data().enactingClause,
            clause: documentSnapshot.data().clause,
            interpretationProvision:
              documentSnapshot.data().interpretationProvision,
            comingIntoForceProvision:
              documentSnapshot.data().comingIntoForceProvision,
            summary: documentSnapshot.data().summary,
            cost: documentSnapshot.data().cost,
            downvotes: documentSnapshot.data()['total downvotes'],
            status: documentSnapshot.data()['status'],
            upvotes: documentSnapshot.data()['total upvotes'],
            arts: documentSnapshot.data().arts,
          });
        });
        setDat(bills);
        setloading(false);
      });
    return () => subscriber;
  });
  const accept = key => {
    //write what happens after accept
    firestore()
      .collection('Bills')
      .doc(key)
      .update({
        status: 'accepted',
      })
      .then(() => {
        console.log('bill accepted');
      });
  };
  const reject = key => {
    //write what happens after reject
    firestore()
      .collection('Bills')
      .doc(key)
      .update({
        status: 'rejected',
      })
      .then(() => {
        console.log('bill rejected');
      });
  };
  const edit = item => {
    //write what happens after edit
    firestore()
      .collection('Bills')
      .doc(item.key)
      .update({
        status: 'rejected',
      })
      .then(() => {
        console.log('bill rejected');
      });
    navigation.navigate('billEdit', {data: item});
  };
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Signout"
        color="blue"
        onPress={() => navigation.replace('AdminLogin')}
      />
      <FlatList
        data={dat}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('adminReport', {
                data: item,
                username: username,
                userId: userId,
              })
            }>
            <View style={styles.listitem}>
              <View>
                <Text style={styles.title}>Title: {item.title}</Text>

                <Text style={styles.number}>
                  Bill Number: {item.number} {'\n'}
                  <Text>upvotes:{item.upvotes}</Text> {'\n'}
                  <Text>downvotes:{item.downvotes}</Text>
                  {'\n'}
                </Text>
                {/* <Button
                  title="Accept"
                  color="green"
                  onPress={() => accept(item.key)}
                />
                <Button
                  title="Reject"
                  color="red"
                  onPress={() => reject(item.key)}
                />
                <Button title="Edit" color="grey" onPress={() => edit(item)} /> */}
                <Button
                  title="View Report"
                  color="yellow"
                  onPress={() =>
                    navigation.navigate('adminReport', {
                      data: item,
                      username: username,
                      userId: userId,
                    })
                  }
                />
              </View>
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
    height: 320,
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
  butt: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default AdminPage;
