import { Button, ThemeProvider,Avatar } from 'react-native-elements';
import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,FlatList,
    TouchableOpacity,Alert } from 'react-native';
import { Icon } from 'react-native-elements'
function Profile(){
    const [articles, setarticles] = useState([
        {content:"This my article let me figure out what to write",likes:10,dislikes:3,key:1},
        {content:"This my article let me figure out what to write",likes:10,dislikes:3,key:2},
        {content:"This my article let me figure out what to write",likes:10,dislikes:3,key:3},
        {content:"This my article let me figure out what to write",likes:10,dislikes:3,key:4},
        {content:"This my article let me figure out what to write",likes:10,dislikes:3,key:5}
    ])
  return (
    <View style={styles.container}>
        
        <View style={styles.userinfo}>
        <View style={styles.bell}>
            <Icon
            reverse
            name='bell'
            type='evilicon'
            color='black'
            />
        </View>
        <View style={styles.navicon}>
            <Icon
            reverse
            name='navicon'
            type='evilicon'
            color='black'
            />
        </View>
        <View style={styles.pic}>
            
            

            <Avatar
            size="xlarge"
            rounded
            source={{
            uri:
            'https://media.vanityfair.com/photos/5cae5ea3f038af13baee9656/1:1/w_1332,h_1332,c_limit/jane-the-virgin-season-5-michael-memories-twist-raphael.jpg',
            
            }}
            />
            <Text style={styles.name}>Jane Doe</Text>
        </View>
        </View>
        <View style={styles.options}>
            <View>
                <Avatar
                size="medium"
                overlayContainerStyle={{backgroundColor: 'lightblue'}}
                icon={{name: 'pencil', type: 'font-awesome'}}
                />
                
            </View>
            <View>
                <Avatar
                size="medium"
                overlayContainerStyle={{backgroundColor: 'lightblue'}}
                icon={{name: 'heartbeat', type: 'font-awesome'}}
                />
            </View>
            <View>
                <Avatar
                size="medium"
                overlayContainerStyle={{backgroundColor: 'lightblue'}}
                icon={{name: 'meetup', type: 'font-awesome'}}
                />
            </View>
            <View>
                <Avatar
                size="medium"
                overlayContainerStyle={{backgroundColor: 'lightblue'}}
                icon={{name: 'user', type: 'font-awesome'}}
                />
            </View>

        </View>
        <View style={styles.feed}>
        
            <FlatList
                data={articles}
                renderItem={({item})=>{
                    return(
                        <View style={styles.listItem}>
                        <View>
                        <Text>{item.content}</Text>
                        </View>
                        <View>
                        <Text>{item.likes}</Text>
                        </View>
                        <View>
                        <Icon
                        name='like'
                        type='evilicon'
                        color='black'
                        />
                        </View>
                        <View>
                        <Text>{item.dislikes}</Text>
                        </View>
                        <View>
                        <Icon
                        name='thumbs-down'
                        type='font-awesome'
                        
                        />
                        </View>
                        </View>
                    )
                    
                }}
            />
               
            
        
        </View>
    </View>
  );
};

const styles= StyleSheet.create(
    {
        container:{
            flex:1
        },
        userinfo:{
            flex:1,
            maxHeight:400,
            backgroundColor:"lightblue"
        },
        pic:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        options:{
            flex:1,
            flexDirection:"row",
            maxHeight:100,
            backgroundColor:"grey",
            justifyContent:"space-around",
            alignItems:"center"
        },
        bell:{
            position:"absolute",
            top:30,
            right:0
        },
        navicon:{
            position:"absolute",
            top:30,
            left:0
        },
        name:{
            fontSize:18,
            fontWeight:"bold"
        },
        feed:{
            flex:1,
            
        },
        listItem:{
            flex:1,
            padding:40,
            margin:10,
            flexDirection:'row',
            borderColor:"black",
            borderWidth:2,
            justifyContent:"space-between"
        }
        

    }
)

export default Profile;
