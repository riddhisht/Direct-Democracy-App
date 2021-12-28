import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList,
  TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';


  const ViewBill = ({route,navigation}) =>{
    const title = route.params.title;
    const preamble  = route.params.preamble;
    const enac = route.params.enactingClause;
    const  clause = route.params.clause;
    const interpretationProvision = route.params.interpretationProvision;
    const comingIntoForceProvision = route.params.comingIntoForceProvision;
    const summary = route.params.summary;
    const cost = route.params.cost;
   
   
    return(
      <ScrollView style = {styles.container}>
      <Text style = {styles.title}>Title</Text>
      <Text style = {styles.content}>{title}</Text>
      <Text  style = {styles.title}>preamble</Text>
      <Text style = {styles.content}>{preamble}</Text>

      <Text style = {styles.title}>Enacting Clause</Text>
      <Text style = {styles.content}>{enac}</Text>

      <Text style = {styles.title}>Clause</Text>
      <Text style = {styles.content}>{clause}</Text>


      <Text style = {styles.title}>Interpretation Provision</Text>
      <Text style = {styles.content}>{interpretationProvision}</Text>

      <Text style = {styles.title}>Coming Into Force Provision</Text>
      <Text style = {styles.content}>{comingIntoForceProvision}</Text>

      <Text style = {styles.title}>summary</Text>
      <Text style = {styles.content}>{summary}</Text>

      <Text style = {styles.title}>Cost: </Text>
      <Text style = {styles.content}>{cost}</Text>

        <Button title="vote" color="black" onPress={()=>navigation.navigate("billvoting", {'title':title})}/>
      <Text>{"\n \n"}</Text>
      </ScrollView>
        
    );

  }


const styles = StyleSheet.create({
container:{
flex:  1,
padding: 20,
backgroundColor: "white",
borderColor: "black",
borderWidth: 5,
marginLeft: 18,
marginTop: 18,
marginRight: 18,
marginBottom: 18,
borderRadius: 13,



},
  title: {
    color:"black",
    fontSize: 30,
    fontWeight: "bold",
  },
  content: {
    color:"black",
    fontSize: 18
  }
})
  export default ViewBill;