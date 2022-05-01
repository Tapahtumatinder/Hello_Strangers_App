import { View, Text } from 'react-native'
import { React, useEffect, useState } from 'react'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore/lite";
import { Avatar, ListItem } from 'react-native-elements';
import styles from '../AppStyle';


const UserAvatar = ({ index, uid, max, navigation}) => {
    const [data, setData] = useState({
        pictureUrl : 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
        userName : 'no name',
    });

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const docRef = doc(db, 'user', uid);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data())
        //setData((parseInt(index) + 1) + '. ' + docSnap.data().userName)
    }

    return (
        <View>
            <ListItem
                bottomDivider
                onPress={() => navigation.navigate('Profile details', { uid: uid })}
                containerStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 12, paddingBottom: 12, backgroundColor: 'transparent'}}
            >
                <Avatar
                    size={48}
                    rounded
                    source={{ uri: data.pictureUrl}}
                />
                <ListItem.Content>
                    <ListItem.Title style={index < max ? styles.boldFontWeight : styles.colorGrey}>
                        {`${data.userName}`}
                    </ListItem.Title>
                    <ListItem.Subtitle style={index < max ? styles.colorBlue : styles.colorGrey}>
                        {index < max ? `Attending` : `${parseInt(index) + 1}. (in queue)`}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

export default UserAvatar

//<Text style={{ marginTop: 15 }}> {data} </Text>