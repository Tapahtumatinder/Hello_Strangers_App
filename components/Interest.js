import { React, useState, useEffect } from 'react';
import { Button, ButtonGroup, withTheme } from 'react-native-elements';
import { doc, setDoc, getDoc, Timestamp, Firestore } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { View, TextInput, Text, Platform, FlatList } from 'react-native';


const Interest = () => {
  const [interest, setInterest] = useState([]);

  // Gets all of the data stored in collection 'user' that has the same id with the logged in user.
  const getData = async () => {

    const docRef = doc(db, 'interest');
    const docSnap = await getDoc(docRef);
    setInterest(docSnap.data.interest);
    console.log('moi');
  };

  // Calls function getData every time the page reloads
  useEffect(() => {
    getData()
  }, []);
  return (

    <Text>Moi</Text>
  )
}

export default Interest;



























