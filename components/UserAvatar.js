import { View, Text } from 'react-native'
import { React, useEffect, useState } from 'react'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore/lite";

const UserAvatar = (props) => {
    const { index, uid } = props;
    const [data, setData] = useState();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const docRef = doc(db, 'user', uid);
        const docSnap = await getDoc(docRef);
        setData((parseInt(index) + 1) + '. ' + docSnap.data().userName)
    }

    return (
        <View>
            <Text style={{ marginTop: 15 }}> {data} </Text>
        </View>
    )
}

export default UserAvatar