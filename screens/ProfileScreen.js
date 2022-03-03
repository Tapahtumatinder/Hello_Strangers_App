import { StyleSheet, View, Button, TextInput, Platform } from 'react-native'
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { React, useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker'

const ProfileScreen = () => {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription]= useState('');
    const [age, setAge]= useState('');
    
    //Pick the birthdate
    const [date, setDate]= useState(new Date());
    const [mode, setMode]= useState('date');
    const [open, setOpen] = useState(false);

    const countAge = (event, selectedDate) => {
      var birthDate= new Date(date);
      var currentDay= new Date();
      var age= currentDay.getFullYear()-birthDate.getFullYear();
      var month= currentDay.getMonth()-birthDate.getMonth();
      if(month<0||(month===0 && currentDay.getDate()<birthDate.getDate()))
      age --;
      setAge(age);
      console.log(age);
    };

    
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
        console.log('a true stranger');
      }
    }
    
    // Overrides anything within the collection: 'user' and id: 'logged in user id'...
    // ...with the stuff inside the '{}' (in this case 'userName: usertName').
    // If the collection does not exsist, then creates a 'user' collection to firestore.
    const setData = async () => {
      await setDoc(doc(db, 'user', auth.currentUser.uid), {
        userName: userName,
        userDescription: userDescription,
        

    })
  }
    return (
      <View style= {styles.container}>
        <View  style= {styles.inputContainer}>
        <TextInput
            placeholder='Set your first name'
            value={userName}
            onChangeText={text => setUserName(text)}
            style={styles.input}
        />
        <Button title='Set name' onPress={setData}/>
        <TextInput style= {styles.descriptionInput}
            placeholder='Describe yourself'
            value={userDescription}
            onChangeText={text => setUserDescription(text)}
            style= {styles.descriptionInput}
            multiline={true}
            maxLength={250}
            
            />
            <Button title ='Add description' onPress={setData}/>
            </View>
          
            <Button title ="Select birthday" onPress={() => setOpen(true)} />
          
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      
      </View>
    );
  
        }
  export default ProfileScreen;
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    
    },

    inputContainer: {
      alignItems: 'center'
    },

    descriptionInput:{
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: 250,
      
    },
    datePicker: {
      flex: 2,
      
    },

  
})