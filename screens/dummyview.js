import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList,
  TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';

  const DummyView = ({navigation,route})=> {
    const username=route.params.name;
    const userId=route.params.userId;
    const [period,setPeriod]=useState("21/2/21");
    const [dat, setDat] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
      const subscriber = firestore()
       .collection('Bills')
       .get()
       .then(collectionSnapshot => {
              const bills=[]
               collectionSnapshot
               .forEach(documentSnapshot => {
                   
                   //console.log('User ID: ', documentSnapshot.id,documentSnapshot.data().number,documentSnapshot.data().title);
                          
                              bills.push({'key':documentSnapshot.id,'number':documentSnapshot.data().number, 
                              'title':documentSnapshot.data().title,
                              'preamble':documentSnapshot.data().preamble,
                              'enactingClause':documentSnapshot.data().enactingClause,
                              'clause': documentSnapshot.data().clause,
                              'interpretationProvision': documentSnapshot.data().interpretationProvision,
                              'comingIntoForceProvision': documentSnapshot.data().comingIntoForceProvision,
                              'summary': documentSnapshot.data().summary,
                              'cost': documentSnapshot.data().cost,
                            'downvotes':documentSnapshot.data()["total downvotes"],
                            'status': documentSnapshot.data()['status'],
                            'upvotes':documentSnapshot.data()["total upvotes"]});
               });
               setDat(bills);
               setloading(false);
       });
       return ()=>subscriber;
    })
    
       
      
       
     
      //  console.log("hey",dat);
       
       
  
    
    if(loading){
      return <ActivityIndicator />;
    }
      
    return(
        <View style={styles.container}>
        <Button title="PrevBills"  style = {styles.butt} onPress={()=>navigation.navigate("PreviousBills")}/>
        <FlatList
        data = {dat}
        renderItem={({ item }) => (
          // return a component using that data
          <TouchableOpacity
          onPress={() => navigation.navigate('ViewBill',{data:item,username:username,userId:userId})}>
            <View style={styles.listitem}>
                    <View>
                    <Text style={styles.title}>
                    Title: {item.title}
                    </Text>

                    <Text style={styles.number}>
                    Bill Number: {item.number} {"\n"}
                    Voting ends on   {period} {"\n"}
                <Text>upvotes:{item.upvotes}</Text> {"\n"}
                <Text>downvotes:{item.downvotes}</Text>
                <Text>key:{item.key}</Text>

                </Text>
                </View>
                <View style={styles.avatar}>
                <Avatar
                size="large"
                rounded
                source={{
                uri:
                'https://media.vanityfair.com/photos/5cae5ea3f038af13baee9656/1:1/w_1332,h_1332,c_limit/jane-the-virgin-season-5-michael-memories-twist-raphael.jpg',
                
                }}/>
                <Text>Jane Doe</Text>
                
                </View>
            </View>
            </TouchableOpacity>
        )}
        />


        </View>
    );
  }

  const styles = StyleSheet.create({
      container:{
          flex:1,
          justifyContent: 'center',
          color: 'black',
          backgroundColor: 'black',
         

        
      },
      listitem: {
          flex: 1,
          flexDirection:"row",
          backgroundColor: 'white',
          borderWidth: 3,
          borderColor: 'brown',
          padding: 10,
          marginTop: 10,
          borderRadius: 0,
          height:160,
          //marginLeft:20

 
      },
      text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        opacity:1,
        
      },
      title: {
        //flex:1,
        color:"black",
        fontSize: 25,
        fontWeight: "bold",
        
      },
      number: {
        paddingTop:7,
        color:"black",
        fontSize:16
      },
      avatar: {
        paddingLeft:50,
  
        
        
      },
      butt: {
        
        position: 'absolute',
        right: 5,
        top: 5,
      }
  });
  export default DummyView;