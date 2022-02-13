import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Pressable 
  } from 'react-native';
  import RNPoll, { IChoice } from "react-native-poll";
  import RNAnimated from "react-native-animated-component";
  import firestore from '@react-native-firebase/firestore';


  const billvoting = ({route}) => {
    var upvotes=route.params.upvotes;
    var downvotes=route.params.downvotes;
    const key = route.params.key;
    const title = route.params.title;
    const username = route.params.username;
    const bill_no = route.params.bill_no;
    const choices: Array<IChoice> = [
        { id: 1, choice: "For the Bill", votes: upvotes },
        { id: 2, choice: "Against the Bill", votes: downvotes },
      ];

      

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