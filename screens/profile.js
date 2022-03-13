import {Button, ThemeProvider, Avatar} from 'react-native-elements';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
function Profile() {
  const [toggleState, setToggleState] = useState(1);
  const [articles, setarticles] = useState([
    {
      content: 'This my article let me figure out what to write',
      likes: 10,
      dislikes: 3,
      key: 1,
    },
    {
      content: 'This my article let me figure out what to write',
      likes: 10,
      dislikes: 3,
      key: 2,
    },
    {
      content: 'This my article let me figure out what to write',
      likes: 10,
      dislikes: 3,
      key: 3,
    },
    {
      content: 'This my article let me figure out what to write',
      likes: 10,
      dislikes: 3,
      key: 4,
    },
    {
      content: 'This my article let me figure out what to write',
      likes: 10,
      dislikes: 3,
      key: 5,
    },
  ]);
  const toggleTab = index => {
    setToggleState(index);
  };
  console.log(toggleState);
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
            onPress={() => setToggleState(1)}
            title="One"
          />
        </View>
        <View>
          <Button
            style={toggleState === 2 ? styles.visible : styles.notVisible}
            onPress={() => setToggleState(2)}
            title="Two"
          />
        </View>
        <View>
          <Button
            style={toggleState === 3 ? styles.visible : styles.notVisible}
            onPress={() => setToggleState(3)}
            title="Three"
          />
        </View>
        <View>
          <Button
            style={toggleState === 4 ? styles.visible : styles.notVisible}
            onPress={() => setToggleState(4)}
            title="Four"
          />
        </View>
      </View>
      <View style={styles.feed}>
        <FlatList
          data={articles}
          renderItem={({item}) => {
            return (
              <View style={styles.listItem}>
                <View
                  style={
                    toggleState === 1 ? styles.visible : styles.notVisible
                  }>
                  <Text>Hello 1</Text>
                </View>
                <View
                  style={
                    toggleState === 2 ? styles.visible : styles.notVisible
                  }>
                  <Text>There 2</Text>
                </View>
                <View
                  style={
                    toggleState === 3 ? styles.visible : styles.notVisible
                  }>
                  <Text>What's 3</Text>
                </View>
                <View
                  style={
                    toggleState === 4 ? styles.visible : styles.notVisible
                  }>
                  <Text>Up 4</Text>
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