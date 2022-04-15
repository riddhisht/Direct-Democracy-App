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
  const [expiredBillsData, setExpiredBillsData] = useState([]);
  const [loading, setloading] = useState(true);
  const [filterDat, setFilterDat] = useState([]);
  const [searchText, setSearchText] = useState('');

  const searchFilter = text => {
    if (text) {
      const newData = dat.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const itemData2 = item.preamble
          ? item.preamble.toUpperCase()
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
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const subscriber = firestore()
      .collection('Bills')
      .get()
      .then(collectionSnapshot => {
        var bills = [];
        var expiredBills = [];
        collectionSnapshot.forEach(documentSnapshot => {
          //console.log('User ID: ', documentSnapshot.id,documentSnapshot.data().number,documentSnapshot.data().title);
          var sfd = documentSnapshot.data().dueDate;
          if (
            currentMonth <= sfd[1] &&
            currentDate <= sfd[0] &&
            currentYear <= sfd[2]
          ) {
            console.log('true');
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
              dueDate: documentSnapshot.data().dueDate,
              arts: documentSnapshot.data().arts,
            });
            setFilterDat(bills);
            setDat(bills);
          } else {
            console.log('false');

            if (
              documentSnapshot.data()['total upvotes'] /
                documentSnapshot.data()['total downvotes'] >=
              0.6
            ) {
              firestore().collection('Bills').doc(documentSnapshot.id).update({
                status: 'decision',
              });
            } else {
              firestore().collection('Bills').doc(documentSnapshot.id).update({
                status: 'rejected',
              });
            }
            expiredBills.push({
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
              dueDate: documentSnapshot.data().dueDate,
              arts: documentSnapshot.data().arts,
            });
            setExpiredBillsData(expiredBills);
          }
        });
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
            onPress={() =>
              navigation.navigate('PreviousBills', {
                data: expiredBillsData,
              })
            }
            style={styles.appButtonText}>
            Previous Bills
          </Text>
        </View>
        <View style={styles.appButtonContainer2}>
          <Text
            onPress={() => navigation.navigate('Bill Proposal',{name:username})}
            style={styles.appButtonText}>
            Propose New Bill
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="search bills"
        value={searchText}
        onChangeText={text => searchFilter(text)}
      />
      <FlatList
        data={filterDat}
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
                <Text style={styles.endDate}>Due {period}</Text>
              </View>
              {/* <View style={styles.bottomCard}>
                <Text>Comments</Text>
              </View> */}
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
    backgroundColor: 'white',
  },
  listitem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 22,
    marginTop: 25,
    height: 160,
    width: '100%',
    color: 'white',
    //marginLeft:20
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    opacity: 1,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  number: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    marginLeft: 10,
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
  endDate: {
    position: 'absolute',
    left: 275,
    fontSize: 18,
    top: 125,
    color: 'white',
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
    borderRadius: 20,
    color: 'white',
  },
  bottomCard: {
    flexDirection: 'row',
    top: 350,
    left: 200,
  },
});
export default DummyView;
