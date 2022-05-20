import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

const AdminReport = ({route, navigation}) => {
  const accept = key => {
    //write what happens after accept

    navigation.navigate('remark', {key: key, stat: 'a'});
  };
  const reject = key => {
    //write what happens after reject
    navigation.navigate('remark', {key: key, stat: 'r'});
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

  const title = route.params.data.title ? route.params.data.title : '';
  const preamble = route.params.data.preamble;
  const enac = route.params.data.enactingClause;
  const clause = route.params.data.clause;
  const interpretationProvision = route.params.data.interpretationProvision;
  const comingIntoForceProvision = route.params.data.comingIntoForceProvision;
  const summary = route.params.data.summary;
  const cost = route.params.data.cost;
  const upvotes = route.params.data.upvotes;
  const downvotes = route.params.data.downvotes;
  const bill_no = route.params.data.number;
  const username = route.params.username;
  const userId = route.params.userId;
  const key = route.params.data.key;
  const status = route.params.data.status;
  const arts = route.params.data.arts;

  const [up_percent, setup] = useState(0);
  const [down_percent, setdown] = useState(0);

  const articleIDs = arts;
  const [dat, setDat] = useState([]);
  const pdfGenerate = async () => {
    const results = await RNHTMLtoPDF.convert({
      html:
        '<h1>' +
        title +
        '</h1><br><h1>Total Upvotes:' +
        upvotes +
        '</h1><br><h1>Total Downvotes:' +
        downvotes +
        '</h1><br><h1>Preamble</h1><br><p>' +
        preamble +
        '<p><br><h1>Enacting Clause</h1><br><p>' +
        enac +
        '<p><br><h1>Clause</h1><br><p>' +
        clause +
        '<p><br><h1>Interpretation Provision</h1><br><p>' +
        interpretationProvision +
        '<p><br><h1>Coming Into Provision<h1><br><p>' +
        comingIntoForceProvision +
        '<p><br><h1>Summary<h1><br><p>' +
        summary +
        '<p><br><h1> Cost <h1><br><p>' +
        cost +
        '<p><br>',
      fileName: 'test',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  };
  useEffect(() => {
    const tot = upvotes + downvotes;
    setup(((upvotes / tot) * 100).toFixed(2));

    var articles = [];

    if (arts) {
      console.log('arts', arts);
      articleIDs.forEach(pushFunction);
    }

    function pushFunction(value, index, array) {
      console.log('dcoum ids, ', value);

      firestore()
        .collection('Article')
        .doc(value)
        .onSnapshot(documentSnapshot => {
          console.log('document  ', documentSnapshot.data().title);
          articles.push({
            // 'title': documentSnapshot.data().title,
            // 'key': documentSnapshot.id,
            // "hashtags": documentSnapshot.data().hashtags,

            key: documentSnapshot.id,
            title: documentSnapshot.data().title,
            data: documentSnapshot.data().data,
            likes: documentSnapshot.data().likes,
            dislikes: documentSnapshot.data().dislikes,
            hashtags: documentSnapshot.data().hashtags,
            uname: documentSnapshot.data().uname,
          });
          setDat(articles);
        });
    }
    //setDat(articles)

    console.log('articles', dat);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Text> Admin page</Text>
      <Text>{status}</Text> */}
      <Text style={styles.title}>
        {title} {'\n'}
      </Text>
      {/* <Text style={styles.content}>{title}</Text> */}

      <Text style={styles.title}>Total Upvotes: {upvotes}</Text>
      <Text style={styles.title}>
        Total Downvotes: {downvotes} {'\n'}
      </Text>

      <Text style={styles.title}>{up_percent}% for the motion</Text>
      <Text style={styles.title}>
        {(100 - up_percent).toFixed(2)}% against the motion {'\n'}
      </Text>

      <Text style={styles.title}>Preamble</Text>
      <Text style={styles.content}>{preamble}</Text>

      <Text style={styles.title}>Enacting Clause</Text>
      <Text style={styles.content}>{enac}</Text>

      <Text style={styles.title}>Clause</Text>
      <Text style={styles.content}>{clause}</Text>

      <Text style={styles.title}>Interpretation Provision</Text>
      <Text style={styles.content}>{interpretationProvision}</Text>

      <Text style={styles.title}>Coming Into Force Provision</Text>
      <Text style={styles.content}>{comingIntoForceProvision}</Text>

      <Text style={styles.title}>summary</Text>
      <Text style={styles.content}>{summary}</Text>

      <Text style={styles.title}>Cost: </Text>
      <Text style={styles.content}>{cost}</Text>

      <Text style={styles.title}>View articles written on the bill </Text>
      <FlatList
        data={dat}
        renderItem={({item}) => (
          // return a component using that data
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ArticleView', {
                item: item,
                username: username,
                userId,
                userId,
              })
            }
            // onPress={() =>
            //   navigation.navigate('ViewBill', {
            //     data: item,
            //     username: username,
            //     userId: userId,
            //   })
          >
            <View style={styles.listitem}>
              <View style={styles.topPart}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.number} color="white">
                  Hashtags: {item.hashtags}{' '}
                </Text>
              </View>
              {/* <View style={styles.bottomCard}>
                <Text>Comments</Text>
              </View> */}
            </View>
          </TouchableOpacity>
        )}
      />
      {status === 'Active' && (
        <Button
          title="vote"
          color="black"
          onPress={() =>
            navigation.navigate('billvoting', {
              title: title,
              username: username,
              upvotes: upvotes,
              downvotes: downvotes,
              bill_no: bill_no,
              key: key,
              userId: userId,
            })
          }
        />
      )}

      <Text>
        {'\n'}
        {'\n'}
      </Text>
      <Button title="Accept" color="green" onPress={() => accept(key)} />
      <Button title="Reject" color="red" onPress={() => reject(key)} />

      <Button
        title="Edit"
        color="grey"
        onPress={() => edit(route.params.data)}
      />
      <Button title="Generate Report" color="blue" onPress={pdfGenerate} />

      <Text>
        {'\n'}
        {'\n'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 5,
    marginLeft: 18,
    marginTop: 18,
    marginRight: 18,
    marginBottom: 18,
    borderRadius: 13,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
    fontSize: 18,
  },

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  // },
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
  // title: {
  //   color: 'white',
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   padding: 10,
  // },
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
export default AdminReport;
