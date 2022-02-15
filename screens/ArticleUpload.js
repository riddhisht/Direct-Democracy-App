import React, {useState} from 'react';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList,
  TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Entry = ({navigation, route}) =>{

    const [title, settitle] = useState("");
    const [data, setdata] = useState("");
    const [hashtags, sethashtags] = useState("");
    const [likes, setlikes] = useState(0);
    const [dislikes, setdislikes] = useState(0);
    const uname = route.params.name;

    const article = {
        'title': title,
        "data": data,
        'hashtags':hashtags,
        'likes':likes,
        'dislikes': dislikes,
        'uname': uname
    }

    clickhandler = ()=>{

        firestore()
        .collection('Article')
        .add(article);
    }




    

    return(

        
        <KeyboardAwareScrollView
        >
        <Text>
            {uname}
        </Text>

          {/* style = { styles.bottom} */}
        <Text style = {styles.header}>
        ARTICLE
        </Text>
        <Text style = {styles.titles}>Title: </Text>
        <TextInput
        placeholder="Enter the title of your article"
        onChangeText = {(val)=> {settitle(val)}}
        style={styles.inputs}/>


        <Text style = {styles.titles}>Hashtags:</Text>
        <TextInput
        placeholder="Add some hashtags for your article"
        //onChangeText = {(val)=> {setsalonname(val.charAt(0).toUpperCase()+ val.slice(1).toLowerCase())}}
        onChangeText = {(val)=> {sethashtags(val)}}
        style={styles.inputs}/>


        
        <Text style = {styles.titles}>Article</Text>
        <TextInput
        placeholder="Paste or write your article"
        style={styles.mininputs}
        multiline={true}
        numberOfLines={5}
        onChangeText = {(val)=> {setdata(val)}}/>
        <Button
        style = {styles.button}
        title="Submit"
        onPress={clickhandler}

        />


</KeyboardAwareScrollView>

        
    );
};


const styles = StyleSheet.create({
    titles: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginTop:15
    },

    inputs: {
        borderWidth: 3,
        borderColor: 'grey',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        textAlignVertical: 'top',
        
        

    },
    mininputs: {
        borderWidth: 3,
        borderColor: 'grey',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        textAlignVertical: 'top',
        height:120
        
        

    },
    header: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        color: 'black'
    },
    button: {
        marginTop: 30
    },
    cont: {
        padding: 50
    },
    // bottom: {
    //     paddingBottom:100
    // }
})

export default Entry;