import React, {useState} from 'react';
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
import {Formik} from 'formik';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';

const validationSchema = yup.object({
  number: yup.string().required(),
  title: yup.string().required().min(10),
  preamble: yup.string().required().min(10),
  enactingClause: yup.string().required().min(10),
  clause: yup.string().required().min(10),
  interpretationProvision: yup.string().required().min(10),
  comingIntoForceProvision: yup.string().required().min(10),
  summary: yup.string().required().min(10),
  cost: yup.string().required(),
});

export default function BillProposal({route, navigation}) {
  const Name = route.params.name;
  const userId = route.params.userId
  
  // let tomorrow = new Date(year, month, day  + 3) 
  // const currentDate = new Date().getDate();
  // const currentMonth = new tomorrow.getMonth() + 1;
  // const currentYear = new tomorrow.getFullYear();
  const dueDate =[31,5,2022]
  console.log(dueDate);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.Conatainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Bill Proposal</Text>
          </View>

          <Formik
            initialValues={{
              number: '',
              title: '',
              preamble: '',
              enactingClause: '',
              clause: '',
              interpretationProvision: '',
              comingIntoForceProvision: '',
              summary: '',
              cost: '',
            }}
            onSubmit={(values, actions) => {
              navigation.navigate("View", {"name":Name, "userId":userId})

              actions.resetForm();
              values['name'] = Name;
              values['total downvotes'] = 0;
              values['total upvotes'] = 0;
              values['dueDate']=dueDate;
              values['status']="active";
              values['arts']=[];
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
              firestore().collection('Bills').add(values);
              fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'key=AAAAbICcrgA:APA91bFua2I_QOMauNhm4yOrlApDcxRouzszKWai6Cj2WKiXGeKm13AwgByTBedIRUaGiiEgOZWJTWswIj5FGw1jHTiyG65lLJhb9xcx2jydM6hXJeRgGTGBsmJSdUm6yr6UL1hXU8qH'
                    },
                    body: JSON.stringify({
                      "notification":{
                        "body":values["preamble"],
                        "title":values["title"]
                      },
                      'to':'/topics/All'
                    }),
                  }).then((response)=>{
                    console.log(response);
                  }

                  )
            }}
            validationSchema={validationSchema}>
            {props => {
              return (
                <View style={styles.MainContainer}>
                  <View style={styles.form}>
                    <Text style={styles.HeaderText}>Write the Bill Number</Text>
                    <TextInput
                      onChangeText={props.handleChange('number')}
                      style={styles.textInput}
                      keyboardType="numeric"
                      value={props.values.number}
                      onBlur={props.handleBlur('number')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.number && props.errors.number}
                    </Text>
                    <Text style={styles.HeaderText}>Write the Bill Title</Text>
                    <TextInput
                      onChangeText={props.handleChange('title')}
                      style={styles.textInput}
                      value={props.values.title}
                      onBlur={props.handleBlur('title')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.title && props.errors.title}
                    </Text>
                    <Text style={styles.HeaderText}>
                      Write the Bill Preamble
                    </Text>
                    <TextInput
                      multiline
                      onChangeText={props.handleChange('preamble')}
                      style={styles.textInput}
                      value={props.values.preamble}
                      onBlur={props.handleBlur('preamble')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.preamble && props.errors.preamble}
                    </Text>
                    <Text style={styles.HeaderText}>
                      Write the Enacting Clause
                    </Text>
                    <TextInput
                      multiline
                      onChangeText={props.handleChange('enactingClause')}
                      style={styles.textInput}
                      value={props.values.enactingClause}
                      onBlur={props.handleBlur('enactingClause')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.enactingClause &&
                        props.errors.enactingClause}
                    </Text>
                    <Text style={styles.HeaderText}>Write the Clause here</Text>
                    <TextInput
                      multiline
                      onChangeText={props.handleChange('clause')}
                      style={styles.textInput}
                      value={props.values.clause}
                      onBlur={props.handleBlur('clause')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.clause && props.errors.clause}
                    </Text>
                    <Text style={styles.HeaderText}>
                      Write the Interpretation Provison
                    </Text>
                    <TextInput
                      onChangeText={props.handleChange(
                        'interpretationProvision',
                      )}
                      style={styles.textInput}
                      value={props.values.interpretationProvision}
                      onBlur={props.handleBlur('interpretationProvision')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.interpretationProvision &&
                        props.errors.interpretationProvision}
                    </Text>
                    <Text style={styles.HeaderText}>
                      Write the Coming-Into-Force Provision
                    </Text>
                    <TextInput
                      onChangeText={props.handleChange(
                        'comingIntoForceProvision',
                      )}
                      style={styles.textInput}
                      value={props.values.comingIntoForceProvision}
                      onBlur={props.handleBlur('comingIntoForceProvision')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.comingIntoForceProvision &&
                        props.errors.comingIntoForceProvision}
                    </Text>
                    <Text style={styles.HeaderText}>
                      Write the Summary of the Bill
                    </Text>
                    <TextInput
                      onChangeText={props.handleChange('summary')}
                      style={styles.textInput}
                      value={props.values.summary}
                      onBlur={props.handleBlur('summary')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.summary && props.errors.summary}
                    </Text>
                    <Text style={styles.HeaderText}>
                      Write the Cost required to complete the bill
                    </Text>
                    <TextInput
                      onChangeText={props.handleChange('cost')}
                      style={styles.textInput}
                      keyboardType="numeric"
                      value={props.values.cost}
                      onBlur={props.handleBlur('cost')}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.cost && props.errors.cost}
                    </Text>
                    <View style={styles.button}>
                      <Button
                        title="Submit"
                        onPress={props.handleSubmit}
                        color="#18A999"
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  HeaderText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Container: {
    flex: 1,
  },
  form: {
    flex: 1,
    marginTop: 20,
  },
  textInput: {
    margin: 10,
    padding: 20,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'yellow',
    marginTop: 20,
  },
  header: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#18A999',
    alignItems: 'center',
    width: '50%',
    marginLeft: 95,
    borderRadius: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginLeft: 10,
  },
});
