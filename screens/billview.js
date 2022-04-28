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

const ViewBill = ({route, navigation}) => {
  const title = route.params.data.title;
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

  return (
    <ScrollView style={styles.container}>
      <Text>{status}</Text>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.content}>{title}</Text>
      <Text style={styles.title}>preamble</Text>
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

      {status === 'active' && (
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

      <Text>{'\n'}</Text>

      <Button
        title="Check Articles"
        onPress={() => navigation.navigate('billArticles', {articleIDs: arts})}
      />
      <Text>{'\n \n'}</Text>
      <Button
        title="Write an article for this bill"
        onPress={() =>
          navigation.navigate('ArticleUp', {
            billkey: key,
            frombill: true,
            uname: username,
          })
        }
      />
      <Text>{'\n \n'}</Text>
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
});
export default ViewBill;
