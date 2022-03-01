import { StyleSheet, View, Button, TextInput } from 'react-native'
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { React, useState, useEffect } from 'react';

const ProfileScreen = () => {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription]= useState('');

    // Calls function getData every time the page reloads
    useEffect(() => {
      getData()
    }, [])
  
     // Gets all of the data stored in collection 'user' that has the same id with the logged in user.
    const getData = async () => {
      const docRef = doc(db, 'user', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setUserName(docSnap.data().userName);
        setUserDescription(docSnap.data().userDescription);

      } else {
        console.log('a true sranger');
      }
    }
    
    // Overrides anything within the collection: 'user' and id: 'logged in user id'...
    // ...with the stuff inside the '{}' (in this case 'userName: usertName').
    // If the collection does not exsist, then creates a 'user' collection to firestore.
    const setData = async () => {
      await setDoc(doc(db, 'user', auth.currentUser.uid), {
        userName: userName,
        userDescription: userDescription

    })
  }
  
  
    
  
    return (
      <View style={styles.container}>
        <TextInput
            placeholder='Set your first name'
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.input}
        />
        <Button title='Set name' onPress={setData}/>
        <TextInput
            placeholder='Describe yourself'
            value={userDescription}
            onChangeText={text => setUserDescription(text)}
            style= {styles.descriptionInput}
            multiline={true}
            maxLength={250}
            
            />
            <Button title ='Add description' onPress={setData}/>
          
      </View>
    )
  }
  
  export default ProfileScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    descriptionInput:{
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: 250,
      
    }

  
})

