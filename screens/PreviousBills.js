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

const PreviousBills = ({navigation, route}) => {
  const data = route.params.data;
  const username = route.params.name;
  const userId = route.params.userId;
  console.log(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          // return a component using that data
          // <TouchableOpacity
          //   onPress={() =>
          //     navigation.navigate('ViewBill', {
          //       data: item,
          //       username: username,
          //       userId: userId,
          //     })
          //   }>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewBill', {data: item})}>
            <View style={styles.listitem}>
              <View style={styles.topPart}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.number} color="white">
                  Bill Number: {item.number}{' '}
                </Text>
                <Text style={styles.endDate}>Status: {item.status} </Text>
              </View>
              {/* <View style={styles.bottomCard}>
            <Text>Comments</Text>
          </View> */}
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.bottomTabNavigator}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('View', {name: username, userId: userId})
          }
          style={styles.ButtonOP}>
          <Text style={styles.textBottom}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ArcList', {userId: userId, name: username})
          }
          style={styles.ButtonOP}>
          <Text style={styles.textBottom}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {name: username, userId: userId})
          }
          style={styles.ButtonOP}>
          <Text style={styles.textBottom}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminLogin')}
          style={styles.ButtonOP}>
          <Text style={styles.textBottom}>Admin</Text>
        </TouchableOpacity>
      </View>
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
    left: 255,
    fontSize: 18,
    top: 125,
    color: 'white',
    fontWeight: '700',
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
  textBottom: {
    color: '#FFFFF2',
    fontSize: 17,
    fontWeight: '600',
  },
});
export default PreviousBills;
