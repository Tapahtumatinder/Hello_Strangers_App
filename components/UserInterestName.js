import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import {doc, getDoc} from "firebase/firestore/lite";
import {View, Text} from 'react-native';
import { Chip } from "react-native-elements";

const UserInterestName = (props) => {
const {index, item}= props;
const [data, setData]= useState();

useEffect(()=>{
    getData()
},[]);

const getData= async() => {
    const docRef= doc(db,'interest', item);
    const docSnap= await getDoc(docRef);
    setData(docSnap.data().interestName)
}

    return(
        <View>
            <Chip title={data} 
                titleStyle={{ color: 'black' }}
            type='outline'
            buttonStyle={{
            backgroundColor: '#D6D6D6', 
            borderColor: 'white' }}

containerStyle={{ marginVertical: 6 }} />
        </View>

    )
}
    export default UserInterestName;