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
import {Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

const DummyView = ({navigation, route}) => {
  const username = route.params.name;
  const userId = route.params.userId;
  const [period, setPeriod] = useState('21/2/21');
  const [dat, setDat] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Bills')
      .get()
      .then(collectionSnapshot => {
        var bills = [];
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
            status: documentSnapshot.data().status,
            upvotes: documentSnapshot.data()['total upvotes'],
          });
        });
        setDat(bills);
        setloading(false);
      });
    return () => subscriber;
  }, []);

  //  console.log("hey",dat);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.appButtonContainer1}>
          <Text
            onPress={() => navigation.navigate('PreviousBills')}
            style={styles.appButtonText}>
            Previous Bills
          </Text>
        </View>
        <View style={styles.appButtonContainer2}>
          <Text
            onPress={() => navigation.navigate('Bill Proposal')}
            style={styles.appButtonText}>
            Propose New Bill
          </Text>
        </View>
      </View>
      <FlatList
        data={dat}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ViewBill', {
                data: item,
                username: username,
                userId: userId,
              })
            }>
            <View style={styles.listitem}>
              <View style={styles.topPart}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.number} color="white">
                  Bill Number: {item.number}{' '}
                </Text>
                <Text> {item.preamble}</Text>

                <Text>Due {period}</Text>
              </View>
              <View style={styles.bottomCard}>
                <Button title="Comments" color="green" />
                <Button title="Bookmark" color="white" />
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
    backgroundColor: 'black',
  },
  listitem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 22,
    marginTop: 25,
    height: 200,
    width: '100%',
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
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  appButtonContainer2: {
    elevation: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 170,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  topPart: {
    backgroundColor: '#537A5A',
    height: 160,
    width: '100%',
    // borderBottomLeftRadius: number,
    // borderBottomRightRadius: number,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    color: 'white',
  },
  bottomCard: {
    flexDirection: 'row',
    top: 150,
    left: 200,
  },
});
export default DummyView;
