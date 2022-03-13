import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ArticleView = ({route}) => {
  const title = route.params.title;
  const data = route.params.data;
  const likes = route.params.likes;
  const uname = route.params.uname;
  const dislikes = route.params.dislikes;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.content}>{title}</Text>
      <Text style={styles.title}>Article</Text>
      <Text style={styles.content}>{data}</Text>

      <Text style={styles.title}>By</Text>
      <Text style={styles.content}>{uname}</Text>

      <Text style={styles.title}>Likes</Text>
      <Text style={styles.content}>{likes}</Text>

      <Text style={styles.title}>dislikes</Text>
      <Text style={styles.content}>{dislikes}</Text>

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

export default ArticleView;
