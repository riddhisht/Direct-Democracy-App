import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList,
  TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Avatar } from 'react-native-elements';
import { date } from 'yup/lib/locale';



  const DummyView = ({navigation})=> {
    
    const [dat, setDat] = useState([]);
    const [period,setperiod] = useState("23/12/2021"); 
    async function Dummy(){
       const response = await fetch('https://directdemo-c8f7a-default-rtdb.asia-southeast1.firebasedatabase.app/bills.json');
       
       const resdata = await response.json();
       //console.log(resdata);

       const arr = [];
       for(const key in resdata){
           arr.push({'key':key,'number':resdata[key].number, 
            'title':resdata[key].title,
            'preamble':resdata[key].preamble,
            'enactingClause':resdata[key].enactingClause,
            'clause': resdata[key].clause,
            'interpretationProvision': resdata[key].interpretationProvision,
            'comingIntoForceProvision': resdata[key].comingIntoForceProvision,
            'summary': resdata[key].summary,
            'cost': resdata[key].cost})
       }  
       //console.log(arr[0]);
       
       setDat(arr);
       //return arr;

    }
    useEffect(()=>{
        Dummy();
    },[])
    
    
      
    return(
        <View style={styles.container}>
        
        <FlatList
        data = {dat}
        renderItem={({ item }) => (
          // return a component using that data
          <TouchableOpacity
          onPress={() => navigation.navigate('ViewBill',item)}>
            <View style={styles.listitem}>
                    <View>
                    <Text style={styles.title}>
                    Title: {item.title}
                    </Text>

                    <Text style={styles.number}>
                    Bill Number: {item.number} {"\n"}
                    Voting ends on   {period}
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
  
        
        
      }
  });
  export default DummyView;