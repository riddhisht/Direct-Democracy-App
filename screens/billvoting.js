import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Pressable 
  } from 'react-native';
  import RNPoll, { IChoice } from "react-native-poll";
  import RNAnimated from "react-native-animated-component";
  import firestore from '@react-native-firebase/firestore';


  const billvoting = ({route}) => {
    const [voted,setVoted]=useState(false);
    const [loading,setloading]=useState(true);
    useEffect(() => {
      const subscriber = firestore()
                        .collection('Users')
                        .doc(userId)
                        .collection('Bills_voted')
                        .doc(key)
                        .get()
                        .then((docSnapshot)=>{
                          console.log(key);
                          if(docSnapshot.exists){
                          console.log("hello")
                          setloading(false);
                          setVoted(true);
                          console.log(voted);
                          }
                          else{
                            console.log("hey")
                            setloading(false);
                            setVoted(false);
                            console.log(voted);
                          }
                          
                        }
                        )
  

    

    }, [])
    
    var upvotes=route.params.upvotes;
    var downvotes=route.params.downvotes;
    const key = route.params.key;
    const title = route.params.title;
    const username = route.params.username;
    const bill_no = route.params.bill_no;
    const userId = route.params.userId;
    console.log("userId:",userId);
    
    const choices: Array<IChoice> = [
        { id: 1, choice: "For the Bill", votes: upvotes },
        { id: 2, choice: "Against the Bill", votes: downvotes },
      ];

      
      if (loading){
        return <ActivityIndicator/>;
      }
      else if (voted){return(
        <View>
        <View style={styles.container}>
              <Text style = {styles.text}>
                  Bill Number: {bill_no} {"\n"}{"\n"}
                  Title: {title}  {"   \n"}{"\n"}
                  Voting ends on: December 23, 2021. {"\n"}{"\n"}
              </Text>

               
              </View>

              <Text>You have already voted for this bill</Text>
              </View>);
      }
      else{
        return(
          <View >
              <View style={styles.container}>
              <Text style = {styles.text}>
                  Bill Number: {bill_no} {"\n"}{"\n"}
                  Title: {title}  {"   \n"}{"\n"}
                  Voting ends on: December 23, 2021. {"\n"}{"\n"}
              </Text>

               
              </View>

<RNPoll

appearFrom="left"
  animationDuration={1750}
  totalVotes={upvotes+downvotes}
  choices={choices}
  PollContainer={RNAnimated}
  PollItemContainer={RNAnimated}
  choiceTextStyle ={styles.text2}
  borderColor= 'black'
  //pollContainerStyle = {styles.cont}
  onChoicePress={(selectedChoice: IChoice) =>{
    console.log("SelectedChoice: ", selectedChoice)
    if(selectedChoice.id==1){
      upvotes+=1;
    firestore()
    .collection('Users')
    .doc(userId)
    .collection('Bills_voted')
    .doc(key)
    .set(
      {
        vote:"upvote"
      }
    )
    firestore()
    .collection('Bills')
    .doc(key)
    .update({
     "total upvotes": upvotes,
    })
  .then(() => {
    console.log('User updated!');
  });

    }
    else{
    downvotes+=1;
    firestore()
    .collection('Users')
    .doc(userId)
    .collection('Bills_voted')
    .doc(key)
    .set(
      {
        vote:"downvote"
      }
    )
    firestore()
    .collection('Bills')
    .doc(key)
    .update({
     "total downvotes": downvotes,
    })
  .then(() => {
    console.log('User updated!');
  });
    }
  }
    

  }
/>
<View>

<Pressable style={styles.button}>
      <Text style={styles.text3}>Vote</Text>
    </Pressable>
</View>
    
          </View>
      );
      }
      
  };

  const styles = StyleSheet.create({
    text : {
        // flex: 1,
        // justifyContent: 'center',
        paddingTop: 60,
        alignItems: 'center',
        color:'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
        
    },
    text2 : {
        // flex: 1,
        // justifyContent: 'center',
        //paddingTop: 60,
        alignItems: 'center',
        color:'black',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginLeft: 150,
        // marginRight: 100,
        borderRadius: 20,
        width:100
      },
      text3: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
        
      },
    container: {
        borderColor: 'black',
        borderEndWidth: 5,
        borderLeftColor: "red",
        backgroundColor: 'black',
        width:330,
        marginLeft: 30,
        borderRadius: 20,
        
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        // color: 'white'
    },
    // cont: {
    //   padding:80,
    //   paddingTop: 10,
      
    // }
});
  export default billvoting;