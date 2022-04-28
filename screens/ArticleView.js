import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ArticleView = ({route}) => {
  const userId = route.params.userId;
  const title = route.params.item.title;
  const data = route.params.item.data;
  const likes = route.params.item.likes;
  const uname = route.params.item.uname;
  const dislikes = route.params.item.dislikes;
  const comments = route.params.item.comments ? route.params.item.comments : [];
  const articleKey = route.params.item.key;
  const [newComment, setNewComment] = useState('');
  const liked = () => {
    console.log(comments);
    firestore()
      .collection('Article')
      .doc(articleKey)
      .update({
        likes: likes + 1,
      });
  };
  const disliked = () => {
    console.log('b');
    firestore()
      .collection('Article')
      .doc(articleKey)
      .update({
        dislikes: dislikes + 1,
      });
  };
  const handleEnter = event => {
    comments.push({uname: userId ? userId : 'Anonymous', comment: newComment});
    firestore().collection('Article').doc(articleKey).update({
      comments: comments,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.topBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.name}> - {uname}</Text>
        </View>
        <View style={styles.topBox}>
          <Text style={styles.content}>{data}</Text>
        </View>
        <View style={styles.likeDisLikeButton}>
          <TouchableOpacity onPress={liked} style={styles.appButtonContainer1}>
            <Text style={styles.buttonText}>Like</Text>
            <Text style={styles.buttonText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={disliked}
            style={styles.appButtonContainer3}>
            <Text style={styles.buttonText}>Dislike</Text>
            <Text style={styles.buttonText}>{dislikes}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.likeDisLikeButton}>
          <TextInput
            style={styles.commentInput}
            onChangeText={val => {
              setNewComment(val);
            }}
            placeholder="Write a comment..."
          />
          <TouchableOpacity
            onPress={handleEnter}
            style={styles.appButtonContainer2}>
            <Text style={styles.enterText}>Enter</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={comments}
          renderItem={({item}) => (
            <View>
              <View style={styles.commentBox}>
                <Text style={styles.commentName}>{item.uname} </Text>
                <Text style={styles.commentContent}>{item.comment} </Text>
              </View>
            </View>
          )}
        />
        <Text>{'\n \n'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  topBox: {
    elevation: 10,
    shadowColor: 'grey',
    shadowOffset: 4,
    backgroundColor: '#F19A3E',
    padding: 5,
    alignSelf: 'flex-start',
    paddingRight: 20,
    borderRadius: 15,
    shadowRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    margin: 5,
    paddingLeft: 25,
  },
  enterText: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 9,
  },
  content: {
    color: 'white',
    fontSize: 18,
    margin: 5,
    marginTop: 10,
  },
  commentInput: {
    borderColor: '#F19A3E',
    borderRadius: 20,
    borderWidth: 4,
    marginTop: 20,
    width: 300,
  },
  likeDisLikeButton: {
    // flex: 1,
    flexDirection: 'row',
  },
  commentBox: {
    // borderColor: '#F19A3E',
    borderRadius: 20,
    backgroundColor: '#ECD3B9',
    marginTop: 10,
    padding: 10,
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: '#81B581',
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 12,
    width: 160,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  appButtonContainer3: {
    elevation: 8,
    backgroundColor: '#CF3C3C',
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 12,
    width: 160,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  appButtonContainer2: {
    elevation: 8,
    backgroundColor: '#F19A3E',
    borderRadius: 20,
    paddingVertical: 20,
    // paddingHorizontal: 12,
    width: 60,
    marginRight: 10,
    marginLeft: 5,
    flexDirection: 'row',
    marginTop: 20,
  },
  commentName: {
    color: '#444444',
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentContent: {
    color: '#444444',
    fontSize: 15,
  },
});

export default ArticleView;