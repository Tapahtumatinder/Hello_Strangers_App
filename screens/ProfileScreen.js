import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { React, useState, useEffect } from 'react';
import { View, TextInput, Text, Platform, ScrollView } from 'react-native'
import { auth, db } from '../firebase';




const ProfileScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userInterest, setUserInterest]= useState([]);

    useEffect(() => {
        getData()
      }, [])


const getData = async () => {
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().userName);
      setUserDescription(docSnap.data().userDescription);
      setUserAge(docSnap.data().userAge);
      setUserInterest(docSnap.data().interest);
    } else {
      console.log('a true stranger');
    }
}
const getInterestData = async () =>{
    const docRef= doc(db,'interest');
    const docSnap =await getDoc(docRef);

    
}
  return  (
        
          
            <View>

            <Text>Moi</Text>
            </View>
             
    
    );
}
  export default ProfileScreen;