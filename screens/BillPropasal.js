import React, {useState} from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList,
  TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';

const validationSchema=yup.object({
    number:
     yup.string()
        .required(),
    title:
        yup.string().
        required().
        min(10),
    preamble:
        yup.string()
        .required()
        .min(10),
    enactingClause:
        yup.string()
        .required()
        .min(10),
    clause:
        yup.string()
        .required()
        .min(10),
    interpretationProvision:
        yup.string()
        .required()
        .min(10),
    comingIntoForceProvision:
        yup.string()
        .required()
        .min(10),
    summary:
        yup.string()
        .required()
        .min(10),
    cost:
        yup.string()
        .required(),
})

export default function BillProposal({route}){
    Name=route.params.name;
    return(
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       
       <ScrollView>
       <View style={styles.Conatainer}>
            <View style={styles.header}>
            <Text style={styles.headerText}>Bill Proposal</Text>
            </View>
       
       
            <Formik 
            initialValues={{number:"",title:"",preamble:"", 
            enactingClause:"",clause:"",interpretationProvision:"",
            comingIntoForceProvision:"",summary:"",cost:""}}
            onSubmit={(values,actions)=>{
                actions.resetForm();
                values["name"]=Name;
                values["total downvotes"]=0;
                values["total upvotes"]=0;
                console.log(values);

                // fetch('https://directdemo-c8f7a-default-rtdb.asia-southeast1.firebasedatabase.app/bills.json',
                // {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(
                //         values
                //     )
                // })
                firestore()
                        .collection('Bills')
                        .add(values)
            }


            }
            validationSchema={validationSchema}>
            {
                (props)=>{
                    return(
                    <View style={styles.form}>
                    <TextInput 
                    placeholder="write the bill no." 
                    onChangeText={props.handleChange("number")}
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={props.values.number}
                    onBlur={props.handleBlur("number")}
                    />
                    <Text style={styles.errorText}>{props.touched.number  && props.errors.number}</Text>
                    <TextInput 
                    placeholder="Bill Title" 
                    onChangeText={props.handleChange("title")}
                    style={styles.textInput}
                    value={props.values.title}
                    onBlur={props.handleBlur("title")}
                    />
                    <Text style={styles.errorText}>{props.touched.title  && props.errors.title}</Text>
                    <TextInput 
                    multiline
                    placeholder="write the preamble here." 
                    onChangeText={props.handleChange("preamble")}
                    style={styles.textInput}
                    value={props.values.preamble}
                    onBlur={props.handleBlur("preamble")}
                    />
                    <Text style={styles.errorText}>{props.touched.preamble  && props.errors.preamble}</Text>
                    <TextInput 
                    multiline
                    placeholder="write the Enacting Clause here." 
                    onChangeText={props.handleChange("enactingClause")}
                    style={styles.textInput}
                    value={props.values.enactingClause}
                    onBlur={props.handleBlur("enactingClause")}
                    />
                    <Text style={styles.errorText}>{props.touched.enactingClause  && props.errors.enactingClause}</Text>
                    <TextInput 
                    multiline
                    placeholder="write the Clause here." 
                    onChangeText={props.handleChange("clause")}
                    style={styles.textInput}
                    value={props.values.clause}
                    onBlur={props.handleBlur("clause")}
                    />
                    <Text style={styles.errorText}>{props.touched.clause  && props.errors.clause}</Text>
                    <TextInput 
                    placeholder="write the Interpretation Provison here." 
                    onChangeText={props.handleChange("interpretationProvision")}
                    style={styles.textInput}
                    value={props.values.interpretationProvision}
                    onBlur={props.handleBlur("interpretationProvision")}
                    />
                    <Text style={styles.errorText}>{props.touched.interpretationProvision  && props.errors.interpretationProvision}</Text>
                    <TextInput 
                    placeholder="write the Coming-Into-Force Provision here." 
                    onChangeText={props.handleChange("comingIntoForceProvision")}
                    style={styles.textInput}
                    value={props.values.comingIntoForceProvision}
                    onBlur={props.handleBlur("comingIntoForceProvision")}
                    />
                    <Text style={styles.errorText}>{props.touched.comingIntoForceProvision  && props.errors.comingIntoForceProvision}</Text>
                    <TextInput 
                    placeholder="summary" 
                    onChangeText={props.handleChange("summary")}
                    style={styles.textInput}
                    value={props.values.summary}
                    onBlur={props.handleBlur("summary")}
                    />
                    <Text style={styles.errorText}>{props.touched.summary  && props.errors.summary}</Text>
                    <TextInput 
                    placeholder="write the cost required to complete the bill" 
                    onChangeText={props.handleChange("cost")}
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={props.values.cost}
                    onBlur={props.handleBlur("cost")}
                    />
                    <Text style={styles.errorText}>{props.touched.cost  && props.errors.cost}</Text>
                    <View style={styles.button}>
                    <Button title="Submit" onPress={props.handleSubmit}/>
                    </View>
                    </View>
                    );
                    
                }
            }
            </Formik>
            
            
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create(
    {
        Container:{
            flex:1,
        },
        form:{
            flex: 1,
            marginTop:20
        },
        textInput:{
            margin:10,
            padding:20,
            borderWidth:1,
            borderColor:"black"
            
            
        },
        button:{
            margin:10
        },
        header:{
            
            marginTop:30,
            padding:20,
            backgroundColor:"lightblue",
            alignItems:"center",
            
        },
        headerText:{
            fontWeight:"bold",
            fontSize:20
            
        },
        errorText:{
            fontSize:10,
            color:"red",
            marginLeft:10
        }
        
        
    }
);